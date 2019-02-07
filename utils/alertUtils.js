import { store } from '../reducers/store';
import { popupAction } from '../actions/popupAction';

export const alertNormal = (content, onPress) =>
  store.dispatch(popupAction.showPopup(content, onPress));
