import { chatActionType } from '../chatAction';

const INITIAL_STATE = {
  connected: false,
};

export const chatReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case chatActionType.LOGIN: {
      return state;
    }
    case chatActionType.CONNECTED:
      return {
        ...state,
        connected: true,
      };
    default:
      return state;
  }
};
