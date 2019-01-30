export const topicsActionType = {
  UPDATE_TOPIC: 'TOPICS_UPDATE_TOPIC',
  UPDATE_TOPIC_MESSAGES: 'TOPICS_UPDATE_TOPIC_MESSAGES',
  UPDATE_TOPIC_META: 'TOPICS_UPDATE_TOPIC_META',
  UPDATE_TOPIC_SUBS: 'TOPICS_UPDATE_TOPIC_SUBS',
  UPDATE_TOPIC_USER_INPUT: 'UPDATE_TOPIC_USER_INPUT',
};

export const topicsAction = {
  updateTopicMessages: (topicName, topicMessages) => ({
    type: topicsActionType.UPDATE_TOPIC_MESSAGES,
    topicName,
    topicMessages,
  }),
  updateTopicMeta: (topicName, topicData) => ({
    type: topicsActionType.UPDATE_TOPIC_META,
    topicName,
    topicData,
  }),
  updateTopicSubs: (topicName, topicSubs) => ({
    type: topicsActionType.UPDATE_TOPIC_SUBS,
    topicName,
    topicSubs,
  }),
  updateUserInput: (topicName, userInput) => ({
    type: topicsActionType.UPDATE_TOPIC_USER_INPUT,
    topicName,
    userInput,
  }),
};
