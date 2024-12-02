import { makeError, q } from '@endo/errors';
import { M, mustMatch } from '@endo/patterns';
import { calculateBorrowAPR } from './calculateAPY.js';

const { entries } = Object;

const state = {
  totalDeposited: new Map(),
  totalBorrowed: new Map(),
};

const getOrInitState = brand => {
  if (!state.totalDeposited.has(brand)) {
    state.totalDeposited.set(brand, 0n);
  }
  if (!state.totalBorrowed.has(brand)) {
    state.totalBorrowed.set(brand, 0n);
  }
  return {
    totalDeposited: state.totalDeposited.get(brand),
    totalBorrowed: state.totalBorrowed.get(brand),
  };
};

const updateAPY = async (chain, brand, newTotalDeposited, newTotalBorrowed) => {
  const utilizationRate = Number(newTotalBorrowed) / Number(newTotalDeposited);
  const reserveData = await chain.getReserveData(brand);

  const borrowAPR = calculateBorrowAPR({
    ...reserveData,
    utilizationRate,
  });

  const lendAPR = borrowAPR * utilizationRate;

  await chain.updateAPY(brand, lendAPR, borrowAPR);
};

export const lend = async (
  orch,
  { sharedLocalAccountP, log, zoeTools: { withdrawToSeat } },
  seat,
  offerArgs,
) => {
  mustMatch(offerArgs, harden({ chainName: M.scalar(), destAddr: M.string() }));
  const { chainName, destAddr } = offerArgs;
  const { give } = seat.getProposal();
  const [[_kw, amt]] = entries(give);

  log(`Lending {${amt.value}} on ${chainName} to ${destAddr}`);
  const chain = await orch.getChain(chainName);
  const { denom } = await chain.getAssetInfoForBrand(amt.brand);

  const sharedLocalAccount = await sharedLocalAccountP;

  try {
    const { totalDeposited, totalBorrowed } = getOrInitState(amt.brand);
    const newTotalDeposited = totalDeposited + BigInt(amt.value);

    await updateAPY(chain, amt.brand, newTotalDeposited, totalBorrowed);

    await sharedLocalAccount.deposit(seat.deplete());
    log(`Funds deposited to local account`);

    await sharedLocalAccount.transfer(
      {
        value: destAddr,
        encoding: 'bech32',
        chainId: chain.chainId,
      },
      { denom, value: amt.value },
    );

    // Update state
    state.totalDeposited.set(amt.brand, newTotalDeposited);

    log(`Lending completed to ${destAddr}`);
    seat.exit();
  } catch (e) {
    await withdrawToSeat(sharedLocalAccount, seat, give);
    const errorMsg = `Lending failed: ${q(e)}`;
    log(`ERROR: ${errorMsg}`);
    seat.exit(errorMsg);
    throw makeError(errorMsg);
  }
};

export const borrow = async (
  orch,
  { sharedLocalAccountP, log },
  seat,
  offerArgs,
) => {
  mustMatch(offerArgs, harden({ chainName: M.scalar(), destAddr: M.string() }));
  const { chainName, destAddr } = offerArgs;
  const { want } = seat.getProposal();
  const [[_kw, amt]] = entries(want);

  log(`Borrowing {${amt.value}} from ${chainName} to ${destAddr}`);
  const chain = await orch.getChain(chainName);
  const { denom } = await chain.getAssetInfoForBrand(amt.brand);

  const sharedLocalAccount = await sharedLocalAccountP;

  try {
    const { totalDeposited, totalBorrowed } = getOrInitState(amt.brand);
    const newTotalBorrowed = totalBorrowed + BigInt(amt.value);

    await updateAPY(chain, amt.brand, totalDeposited, newTotalBorrowed);

    await sharedLocalAccount.send(destAddr, { denom, value: amt.value });
    log(`Funds sent to user's address: ${destAddr}`);

    state.totalBorrowed.set(amt.brand, newTotalBorrowed);

    log(`Borrowing completed`);
    seat.exit();
  } catch (e) {
    const errorMsg = `Borrowing failed: ${q(e)}`;
    log(`ERROR: ${errorMsg}`);
    seat.exit(errorMsg);
    throw makeError(errorMsg);
  }
};

export const withdraw = async (
  orch,
  { sharedLocalAccountP, log },
  seat,
  offerArgs,
) => {
  // @ts-expect-error JS and TS are not in sync
  mustMatch(offerArgs, harden({ chainName: M.scalar(), amount: M.amount() }));
  const { chainName, amount } = offerArgs;

  log(`Withdrawing {${amount.value}} from ${chainName}`);
  const chain = await orch.getChain(chainName);
  const { denom } = await chain.getAssetInfoForBrand(amount.brand);

  const sharedLocalAccount = await sharedLocalAccountP;

  try {
    const { totalDeposited, totalBorrowed } = getOrInitState(amount.brand);
    const newTotalDeposited = totalDeposited - BigInt(amount.value);

    await updateAPY(chain, amount.brand, newTotalDeposited, totalBorrowed);

    await sharedLocalAccount.withdraw(seat.getProposal().give.Asset, {
      denom,
      value: amount.value,
    });

    state.totalDeposited.set(amount.brand, newTotalDeposited);

    log(`Withdrawal completed`);
    seat.exit();
  } catch (e) {
    const errorMsg = `Withdrawal failed: ${q(e)}`;
    log(`ERROR: ${errorMsg}`);
    seat.exit(errorMsg);
    throw makeError(errorMsg);
  }
};

export const repay = async (
  orch,
  { sharedLocalAccountP, log },
  seat,
  offerArgs,
) => {
  // @ts-expect-error JS and TS are not in sync
  mustMatch(offerArgs, harden({ chainName: M.scalar(), amount: M.amount() }));
  const { chainName, amount } = offerArgs;

  log(`Repaying {${amount.value}} to ${chainName}`);
  const chain = await orch.getChain(chainName);
  const { denom } = await chain.getAssetInfoForBrand(amount.brand);

  const sharedLocalAccount = await sharedLocalAccountP;

  try {
    const { totalDeposited, totalBorrowed } = getOrInitState(amount.brand);
    const newTotalBorrowed = totalBorrowed - BigInt(amount.value);

    await updateAPY(chain, amount.brand, totalDeposited, newTotalBorrowed);

    await sharedLocalAccount.repay(seat.getProposal().give.Asset, {
      denom,
      value: amount.value,
    });

    state.totalBorrowed.set(amount.brand, newTotalBorrowed);

    log(`Repayment completed`);
    seat.exit();
  } catch (e) {
    const errorMsg = `Repayment failed: ${q(e)}`;
    log(`ERROR: ${errorMsg}`);
    seat.exit(errorMsg);
    throw makeError(errorMsg);
  }
};

export const getTotalDeposited = brand => {
  return state.totalDeposited.get(brand) || 0n;
};

export const getTotalBorrowed = brand => {
  return state.totalBorrowed.get(brand) || 0n;
};

harden(lend);
harden(borrow);
harden(withdraw);
harden(repay);
harden(getTotalDeposited);
harden(getTotalBorrowed);
