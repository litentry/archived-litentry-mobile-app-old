export const popupActionType = {
  SHOW_POPUP: 'SHOW_POPUP',
  HIDE_POPUP: 'HIDE_POPUP',
};

const defaultButtons = [
  {
    text: 'OK',
  },
];

export const popupAction = {
  showPopup: (
    title = 'Alert',
    buttons = defaultButtons,
    content = '',
    popupType = 'normal',
    isAddress = false,
    image = null
  ) => ({ type: popupActionType.SHOW_POPUP, title, buttons, content, popupType, isAddress, image }),
  hidePopup: () => ({ type: popupActionType.HIDE_POPUP }),
};
