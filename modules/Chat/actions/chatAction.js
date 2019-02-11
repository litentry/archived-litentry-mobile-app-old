export const chatActionType = {
  LOGIN: 'CHAT_LOGIN',
  CONNECTED: 'CHAT_CONNECTED',
  DISCONNECTED: 'CHAT_DISCONNECTED',
  UPDATE_CHAT_MAP: 'CHAT_UPDATE_CHAT_MAP',
  SET_ID: 'CHAT_SET_ID',
  SET_AVATAR: 'CHAT_SET_AVATAR',
  SET_USER_INFO: 'CHAT_SET_USER_INFO',
  SUBSCRIBE_CHAT: 'CHAT_SUBSCRIBE_CHAT',
  UNSUBSCRIBE_CHAT: 'CHAT_UNSUBSCRIBE_CHAT',
};

export const chatAction = {
  connected: () => ({ type: chatActionType.CONNECTED }),
  disconnected: () => ({ type: chatActionType.DISCONNECTED }),
  updateChatMap: data => ({ type: chatActionType.UPDATE_CHAT_MAP, data }),
  login: (username, password) => ({ type: chatActionType.LOGIN, username, password }),
  setId: userId => ({ type: chatActionType.SET_ID, userId }),
  setUserInfo: (userInfo, rawPublicData) => ({
    type: chatActionType.SET_USER_INFO,
    userInfo,
    rawPublicData,
  }),
  subscribeChat: chatId => ({ type: chatActionType.SUBSCRIBE_CHAT, chatId }),
  unsubscribeChat: chatId => ({ type: chatActionType.UNSUBSCRIBE_CHAT, chatId }),
};
