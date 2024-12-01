import { makeTracer } from '@agoric/internal';
import { E } from '@endo/far';
// eslint-disable-next-line import/no-extraneous-dependencies
import { harden } from '@agoric/vat-data';

const trace = makeTracer('LendBorrowCE');
const { entries, fromEntries } = Object;

trace('start proposal module evaluating');

const contractName = 'lendingBorrowing';

export const defaultChainDetails = harden({
  agoric: {
    chainId: 'agoriclocal',
    stakingTokens: [{ denom: 'ubld' }, { denom: 'uist' }],
  },
});

export const allValues = async obj => {
  const es = await Promise.all(
    entries(obj).map(([k, vp]) => E.when(vp, v => [k, v])),
  );
  return fromEntries(es);
};

export const startLendingBorrowingContract = async (permittedPowers, config) => {
  trace('startLendingBorrowingContract()...', config);
  console.log(permittedPowers);
  console.log(config);
  const {
    consume: {
      agoricNames,
      board,
      chainTimerService,
      localchain,
      chainStorage,
      zoe,
    },
    installation: {
      consume: { lendingBorrowing: lendingBorrowingInstallation },
    },
    instance: {
      produce: { lendingBorrowing: produceInstance },
    },
  } = permittedPowers;

  const installation = await lendingBorrowingInstallation;

  const storageNode = await E(chainStorage).makeChildNode('lendingBorrowing');
  const marshaller = await E(board).getPublishingMarshaller();

  const { chainDetails: nameToInfo = defaultChainDetails, supportedTokens } =
    config.options[contractName];

  const startOpts = {
    label: 'lendingBorrowing',
    installation,
    terms: { chainDetails: nameToInfo, supportedTokens },
    privateArgs: {
      localchain: await localchain,
      storageNode,
      timerService: await chainTimerService,
      agoricNames: await agoricNames,
      marshaller,
      zoe: await zoe,
    },
  };

  trace('startOpts', startOpts);
  const { instance } = await E(zoe).startInstance(installation, undefined, startOpts.terms, startOpts.privateArgs);

  trace(contractName, '(re)started WITH RESET');
  produceInstance.reset();
  produceInstance.resolve(instance);
};

const lendingBorrowingManifest = {
  [startLendingBorrowingContract.name]: {
    consume: {
      agoricNames: true,
      board: true,
      chainStorage: true,
      zoe: true,
      localchain: true,
      chainTimerService: true,
    },
    installation: {
      produce: { lendingBorrowing: true },
      consume: { lendingBorrowing: true },
    },
    instance: {
      produce: { lendingBorrowing: true },
    },
  },
};
harden(lendingBorrowingManifest);


export const getManifestForLendingBorrowing = (
  { restoreRef },
  { installKeys, chainDetails, supportedTokens },
) => {
  trace('getManifestForLendingBorrowing', installKeys);
  return harden({
    manifest: lendingBorrowingManifest,
    installations: {
      [contractName]: restoreRef(installKeys[contractName]),
    },
    options: {
      [contractName]: { chainDetails, supportedTokens },
    },
  });
};

export const permit = harden({
  consume: {
    agoricNames: true,
    board: true,
    chainStorage: true,
    zoe: true,
    localchain: true,
    chainTimerService: true,
  },
  installation: {
    consume: { lendingBorrowing: true },
    produce: { lendingBorrowing: true },
  },
  instance: { produce: { lendingBorrowing: true } },
  brand: { consume: { BLD: true, IST: true }, produce: {} },
  issuer: { consume: { BLD: true, IST: true }, produce: {} },
});

export const main = startLendingBorrowingContract;