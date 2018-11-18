export const walletActionType = {
  TEST_ADD_ETH: 'WALLET_testAddEth',
};

export const walletAction = {
  testAddEth: () => ({ type: walletActionType.TEST_ADD_ETH }),
};
