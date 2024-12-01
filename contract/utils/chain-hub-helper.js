export const registerChainsAndAssets = (
  chainHub,
  brands,
  chainInfo,
  assetInfo,
) => {
  console.log('chainHub: registering chains', Object.keys(chainInfo || {}));
  if (!chainInfo) {
    return;
  }

  const conns = {};
  for (const [chainName, allInfo] of Object.entries(chainInfo)) {
    const { connections, ...info } = allInfo;
    chainHub.registerChain(chainName, info);
    if (connections) conns[info.chainId] = connections;
  }
  const registeredPairs = new Set();
  for (const [pChainId, connInfos] of Object.entries(conns)) {
    for (const [cChainId, connInfo] of Object.entries(connInfos)) {
      const pair = [pChainId, cChainId].sort().join('<->');
      if (!registeredPairs.has(pair)) {
        chainHub.registerConnection(pChainId, cChainId, connInfo);
        registeredPairs.add(pair);
      }
    }
  }
  console.log('chainHub: registered connections', [...registeredPairs].sort());

  console.log('chainHub: registering assets', Object.keys(assetInfo || {}));
  if (!assetInfo) {
    return;
  }
  for (const [denom, info] of Object.entries(assetInfo)) {
    const { brandKey, ...rest } = info;
    const infoWithBrand = brandKey
      ? { ...rest, brand: brands[brandKey] }
      : rest;
    chainHub.registerAsset(denom, infoWithBrand);
  }
};
