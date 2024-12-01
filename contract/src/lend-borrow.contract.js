import { InvitationShape } from '@agoric/zoe/src/typeGuards.js';
import { E } from '@endo/far';
import { M } from '@endo/patterns';
// eslint-disable-next-line import/no-extraneous-dependencies
import { withOrchestration } from '@agoric/orchestration';
import { prepareChainHubAdmin } from '../utils/chain-hub-admin.js';
import { AnyNatAmountShape } from '../utils/typeGuards.js';
import { registerChainsAndAssets } from '../utils/chain-hub-helper.js';
import * as flows from './lend-borrow.flow.js';
import * as sharedFlows from './shared.flow.js';

export const SingleNatAmountRecord = M.and(
  M.recordOf(M.string(), AnyNatAmountShape, {
    numPropertiesLimit: 1,
  }),
  M.not(harden({})),
);
harden(SingleNatAmountRecord);

export const contract = async (
  zcf,
  privateArgs,
  zone,
  { chainHub, orchestrateAll, vowTools, zoeTools },
) => {
  const creatorFacet = prepareChainHubAdmin(zone, chainHub);

  const logNode = E(privateArgs.storageNode).makeChildNode('log');
  const log = msg => vowTools.watch(E(logNode).setValue(msg));

  const { makeLocalAccount } = orchestrateAll(sharedFlows, {});
  const sharedLocalAccountP = zone.makeOnce('localAccount', () =>
    makeLocalAccount(),
  );

  const orchFns = orchestrateAll(flows, {
    log,
    sharedLocalAccountP,
    zoeTools,
  });

  const publicFacet = zone.exo(
    'LendBorrow PF',
    M.interface('LendBorrow PF', {
      makeLendInvitation: M.callWhen().returns(InvitationShape),
      makeBorrowInvitation: M.callWhen().returns(InvitationShape),
    }),
    {
      makeLendInvitation() {
        return zcf.makeInvitation(
          orchFns.lend,
          'lend',
          undefined,
          M.splitRecord({ give: SingleNatAmountRecord }),
        );
      },
      makeBorrowInvitation() {
        return zcf.makeInvitation(
          orchFns.borrow,
          'borrow',
          undefined,
          M.splitRecord({ want: SingleNatAmountRecord }),
        );
      },
    },
  );

  registerChainsAndAssets(
    chainHub,
    zcf.getTerms().brands,
    privateArgs.chainInfo,
    privateArgs.assetInfo,
  );

  return { publicFacet, creatorFacet };
};
harden(contract);

export const start = withOrchestration(contract);
harden(start);
