export const chatActionType = {
  LOGIN: 'CHAT_LOGIN',
  CONNECTED: 'CHAT_CONNECTED',
  DISCONNECTED: 'CHAT_DISCONNECTED',
  UPDATE_CHAT_LIST: 'CHAT_UPDATE_CHAT_LIST',
};

export const chatAction = {
  connected: () => ({ type: chatActionType.CONNECTED }),
  disconnected: () => ({ type: chatActionType.DISCONNECTED }),
  updateChatList: (chatList) => ({type: chatActionType.UPDATE_CHAT_LIST, chatList}),
  login: (username, password) => ({ type: chatActionType.LOGIN, username, password }),
};
