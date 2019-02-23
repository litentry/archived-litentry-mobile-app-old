export const lockActionType = {
  UPDATE_LOCKS_MAP: 'LOCKS_UPDATE_LOCKS_MAP',
  UNSUBSCRIBE_CHAT: 'LOCKS_UNSUBSCRIBE_CHAT',
  ADD_LOCK: 'LOCKS_ADD_LOCK',
};

export const lockAction = {
  updateLockMap: data => ({ type: lockActionType.UPDATE_LOCKS_MAP, data }),
  unsubscribeChat: chatId => ({ type: lockActionType.UNSUBSCRIBE_CHAT, chatId }),
};
