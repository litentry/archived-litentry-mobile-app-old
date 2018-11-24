import set from 'lodash/fp/set';
import _ from 'lodash';
import { popupActionType } from '../actions/popupAction';

const INIT_STATE = {
  errorMsg: null,
  visible: false,
  content: null,
  buttons: [
    {
      text: 'OK',
    },
  ],
  type: 'normal',
  title: 'Alert',
  isAddress: false,
  image: null,
};

export const popupReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case popupActionType.SHOW_POPUP:
      return {
        ...state,
        visible: true,
        title: action.title,
        buttons: action.buttons,
        content: action.content,
        type: action.popupType,
        isAddress: action.isAddress,
        image: action.image,
      };
    case popupActionType.HIDE_POPUP:
      return {
        ...state,
        visible: false,
        errorMsg: '',
      };
    default:
      return state;
  }
};
