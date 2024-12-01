// eslint-disable-next-line import/no-extraneous-dependencies
import { makeError, q } from '@endo/errors';
import { M, mustMatch } from '@endo/patterns';

const { entries } = Object;

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
    await sharedLocalAccount.send(destAddr, { denom, value: amt.value });
    log(`Funds sent to user's address: ${destAddr}`);

    await sharedLocalAccount.transfer(
      {
        value: destAddr,
        encoding: 'bech32',
        chainId: chain.chainId,
      },
      { denom, value: amt.value },
    );

    log(`Borrowing completed`);
    seat.exit();
  } catch (e) {
    const errorMsg = `Borrowing failed: ${q(e)}`;
    log(`ERROR: ${errorMsg}`);
    seat.exit(errorMsg);
    throw makeError(errorMsg);
  }
};

harden(lend);
harden(borrow);
