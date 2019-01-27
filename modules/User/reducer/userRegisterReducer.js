import _ from 'lodash';
import { userRegisterActionType } from '../actions/userRegiseterActions';

const INITIAL_STATE = {
  photo: {},
  username: 'alex',
  email: 'alexcloud@gmail.com',
  password: '',
  emailCredential: '',
};

export const userRegisterReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case userRegisterActionType.UPDATE:
      console.log('update is', _.assign({}, state, action.data));
      return _.assign({}, state, action.data);
    case userRegisterActionType.RESET:
      return INITIAL_STATE;
    default:
      return state;
  }
};
