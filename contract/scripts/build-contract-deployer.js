/**
 * @file Permission Contract Deployment builder
 *
 * Creates files for starting an instance of the contract:
 * * contract source and instantiation proposal bundles to be published via
 *   `agd tx swingset install-bundle`
 * * start-offer-up-permit.json and start-offer-up.js to submit the
 *   instantiation proposal via `agd tx gov submit-proposal swingset-core-eval`
 *
 * Usage:
 *   agoric run build-contract-deployer.js
 */

import { makeHelpers } from '@agoric/deploy-script-support';
import { getManifestForLendBorrow } from '../src/lend-borrow.proposal.js';

/** @type {import('@agoric/deploy-script-support/src/externalTypes.js').ProposalBuilder} */
export const lendBorrowProposalBuidler = async ({ publishRef, install }) => {
  return harden({
    sourceSpec: '../src/lend-borrow.proposal.js',
    getManifestCall: [
      getManifestForLendBorrow.name,
      {
        offerUpRef: publishRef(
          install(
            '../src/lend-borrow.contract.js',
            '../bundles/bundle-lend-borrow.js',
            {
              persist: true,
            },
          ),
        ),
      },
    ],
  });
};

/** @type {DeployScriptFunction} */
export default async (homeP, endowments) => {
  const { writeCoreProposal } = await makeHelpers(homeP, endowments);
  await writeCoreProposal('lend-borrow', lendBorrowProposalBuidler);
};
