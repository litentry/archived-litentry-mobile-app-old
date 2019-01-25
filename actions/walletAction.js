export const walletActionType = {
  TEST_ADD_ETH: 'WALLET_TEST_ADD_ETH',
  UPDATE_ETH: 'WALLET_UPDATE_ETH',
  UPDATE_NES: 'WALLET_UPDATE_NES',
  UPDATE_BALANCES: 'WALLET_UPDATE_BALANCES',
};

export const walletAction = {
  testAddEth: () => ({ type: walletActionType.TEST_ADD_ETH }),
  updateEth: eth => ({ type: walletActionType.UPDATE_ETH, eth }),
  updateNes: nes => ({ type: walletActionType.UPDATE_NES, nes }),
  updateBalances: balances => ({ type: walletActionType.UPDATE_ETH, balances }),
};
