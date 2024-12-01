export const getManifestForLendingBorrowing = ({
  installKeys,
  chainDetails,
  supportedTokens,
}) => {
  return harden({
    manifest: {
      lendingBorrowing: {
        installation: installKeys.lendingBorrowing,
        config: {
          chainDetails,
          supportedTokens,
        },
      },
    },
  });
};
