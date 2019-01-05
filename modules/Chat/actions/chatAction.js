export const chatActionType = {
  LOGIN: 'CHAT_LOGIN',
  CONNECTED: 'CHAT_CONNECTED',
  DISCONNECTED: 'CHAT_DISCONNECTED',
  UPDATE_CHAT_LIST: 'CHAT_UPDATE_CHAT_LIST',
  SET_ID: 'CHAT_SET_ID',
  SUBSCRIBE_CHAT: 'CHAT_SUBSCRIBE_CHAT',
};

export const chatAction = {
  connected: () => ({ type: chatActionType.CONNECTED }),
  disconnected: () => ({ type: chatActionType.DISCONNECTED }),
  updateChatList: chatList => ({ type: chatActionType.UPDATE_CHAT_LIST, chatList }),
  login: (username, password) => ({ type: chatActionType.LOGIN, username, password }),
  setId: userId => ({ type: chatActionType.SET_ID, userId }),
  subscribeChat: chatId => ({ type: chatActionType.SUBSCRIBE_CHAT, chatId }),
};
