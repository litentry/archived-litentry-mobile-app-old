export const screenActionType = {
  LOCK_SCREEN: 'LOCK_SCREEN',
};

export const screenAction = {
  lockScreen: () => ({ type: screenActionType.LOCK_SCREEN }),
};
