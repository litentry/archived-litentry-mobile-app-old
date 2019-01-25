export const walletActionType = {
  TEST_ADD_ETH: 'WALLET_TEST_ADD_ETH',
  UPDATE_ETH: 'WALLET_UPDATE_ETH',
};

export const walletAction = {
  testAddEth: () => ({ type: walletActionType.TEST_ADD_ETH }),
  updateEth: (eth) => ({ type: walletActionType.UPDATE_ETH, eth}),
};
