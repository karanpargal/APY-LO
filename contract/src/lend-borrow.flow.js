// eslint-disable-next-line import/no-extraneous-dependencies
import { NonNullish } from '@agoric/internal';
// eslint-disable-next-line import/no-extraneous-dependencies
import { makeError, q } from '@endo/errors';
import { M, mustMatch } from '@endo/patterns';

const { entries } = Object;

export const sendIt = async (
  orch,
  { sharedLocalAccountP, log, zoeTools: { localTransfer, withdrawToSeat } },
  seat,
  offerArgs,
) => {
  mustMatch(offerArgs, harden({ chainName: M.scalar(), destAddr: M.string() }));
  const { chainName, destAddr } = offerArgs;
  // NOTE the proposal shape ensures that the `give` is a single asset
  const { give } = seat.getProposal();
  const [[_kw, amt]] = entries(give);
  log(`sending {${amt.value}} from ${chainName} to ${destAddr}`);
  const agoric = await orch.getChain('agoric');
  const assets = await agoric.getVBankAssetInfo();
  log(`got info for denoms: ${assets.map(a => a.denom).join(', ')}`);
  const { denom } = NonNullish(
    assets.find(a => a.brand === amt.brand),
    `${amt.brand} not registered in vbank`,
  );

  const chain = await orch.getChain(chainName);
  const info = await chain.getChainInfo();
  const { chainId } = info;
  assert(typeof chainId === 'string', 'bad chainId');
  log(`got info for chain: ${chainName} ${chainId}`);

  /**
   * @type {any} XXX methods returning vows
   *   https://github.com/Agoric/agoric-sdk/issues/9822
   */
  const sharedLocalAccount = await sharedLocalAccountP;
  await localTransfer(seat, sharedLocalAccount, give);

  log(`completed transfer to localAccount`);

  try {
    await sharedLocalAccount.transfer(
      {
        value: destAddr,
        encoding: 'bech32',
        chainId,
      },
      { denom, value: amt.value },
    );
    log(`completed transfer to ${destAddr}`);
  } catch (e) {
    await withdrawToSeat(sharedLocalAccount, seat, give);
    const errorMsg = `IBC Transfer failed ${q(e)}`;
    log(`ERROR: ${errorMsg}`);
    seat.exit(errorMsg);
    throw makeError(errorMsg);
  }

  seat.exit();
  log(`transfer complete, seat exited`);
};
harden(sendIt);
