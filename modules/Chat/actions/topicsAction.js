export const topicsActionType = {
  UPDATE_TOPIC: 'TOPICS_UPDATE_TOPIC',
  UPDATE_TOPIC_MESSAGES: 'TOPICS_UPDATE_TOPIC_MESSAGES',
  UPDATE_TOPIC_TITLE: 'TOPICS_UPDATE_TOPIC_TITLE',
  UPDATE_TOPIC_SUBS: 'TOPICS_UPDATE_TOPIC_SUBS',
};

export const topicsAction = {
  updateTopicMessages: (topicName, topicMessages) => ({
    type: topicsActionType.UPDATE_TOPIC_MESSAGES,
    topicName,
    topicMessages,
  }),
  updateTopicTitle: (topicName, topicTitle, topicAvatar) => ({
    type: topicsActionType.UPDATE_TOPIC_TITLE,
    topicName,
    topicTitle,
    topicAvatar,
  }),
  updateTopicSubs: (topicName, topicSubs) => ({
    type: topicsActionType.UPDATE_TOPIC_TITLE,
    topicName,
    topicSubs,
  }),
};
