export const loaderActionType = {
  READ_APP_DATA: 'LOADER_READ_APP_DATA',
  SAVE_APP_DATA: 'LOADER_SAVE_APP_DATA',
  ADD_ERROR_COUNT: 'LOADER_ADD_ERROR_COUNT',
  CLEAR_APP_DATA: 'LOADER_CLEAR_APP_DATA',
};

export const loaderAction = {
  readAppData: resultList => ({ type: loaderActionType.READ_APP_DATA, resultList }),
  saveAppData: data => ({ type: loaderActionType.SAVE_APP_DATA, data }),
  addErrorCount: () => ({ type: loaderActionType.ADD_ERROR_COUNT }),
  clearAppData: data => ({ type: loaderActionType.CLEAR_APP_DATA, data }),
};
