export const popupActionType = {
  SHOW_POPUP: 'SHOW_POPUP',
  HIDE_POPUP: 'HIDE_POPUP',
};

export const popupAction = {
  showPopup: (content) => ({ type: popupActionType.SHOW_POPUP, content}),
  hidePopup: () => ({ type: popupActionType.HIDE_POPUP }),
};
