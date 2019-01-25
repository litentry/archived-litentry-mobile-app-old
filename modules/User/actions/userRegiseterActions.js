export const userRegisterActionType = {
  UPDATE: 'USER_REGISTER_UPDATE',
  CLEAR: 'USER_REGISTER_CLEAR',
};

export const userRegisterAction = {
  update: data => ({ type: userRegisterActionType.UPDATE, data }),
  clear: () => ({ type: userRegisterActionType.CLEAR }),
};
