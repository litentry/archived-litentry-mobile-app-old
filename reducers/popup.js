import { popupActionType } from '../actions/popupAction';

const INIT_STATE = {
  visible: false,
  content: '',
  title: 'Alert',
};

export const popupReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case popupActionType.SHOW_POPUP:
      return {
        ...state,
        visible: true,
        content: action.content,
      };
    case popupActionType.HIDE_POPUP:
      return {
        ...state,
        visible: false,
      };
    default:
      return state;
  }
};
