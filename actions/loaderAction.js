export const loaderActionType = {
  READ_APP_DATA: 'LOADER_READ_APP_DATA',
  SAVE_APP_DATA: 'LOADER_SAVE_APP_DATA',
}

export const loaderAction = {
  readAppData: () => ({type: loaderActionType.READ_APP_DATA}),
  saveAppData: data => ({type: loaderActionType.SAVE_APP_DATA, data}),
}