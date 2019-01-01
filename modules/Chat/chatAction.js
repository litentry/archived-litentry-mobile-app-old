export const chatActionType = {
  LOGIN: 'CHAT_LOGIN',
  CONNECTED: 'CHAT_CONNECTED',
  DISCONNECTED: 'CHAT_DISCONNECTED',
};

export const chatAction = {
  connected: () => ({ type: chatActionType.CONNECTED }),
  disconnected: () => ({ type: chatActionType.DISCONNECTED }),
  login: (username, password) => ({ type: chatActionType.LOGIN, username, password }),
};
