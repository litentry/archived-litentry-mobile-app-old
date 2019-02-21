export const chatActionType = {
  UPDATE_LOCKS_MAP: 'LOCKS_UPDATE_LOCKS_MAP',
  UNSUBSCRIBE_CHAT: 'LOCKS_UNSUBSCRIBE_CHAT',
};

export const chatAction = {
  updateChatMap: data => ({ type: chatActionType.UPDATE_LOCKS_MAP, data }),
  unsubscribeChat: chatId => ({ type: chatActionType.UNSUBSCRIBE_CHAT, chatId }),
};
