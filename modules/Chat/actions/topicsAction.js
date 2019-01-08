export const topicsActionType = {
  UPDATE_TOPIC: 'TOPICS_UPDATE_TOPIC',
  UPDATE_TOPIC_MESSAGES: 'TOPICS_UPDATE_TOPIC_MESSAGES',
  UPDATE_TOPIC_META: 'TOPICS_UPDATE_TOPIC_META',
  UPDATE_TOPIC_SUBS: 'TOPICS_UPDATE_TOPIC_SUBS',
};

export const topicsAction = {
  updateTopicMessages: (topicName, topicMessages) => ({
    type: topicsActionType.UPDATE_TOPIC_MESSAGES,
    topicName,
    topicMessages,
  }),
  updateTopicMeta: (topicName, topicTitle, topicAvatar, topicDescription) => ({
    type: topicsActionType.UPDATE_TOPIC_META,
    topicName,
    topicTitle,
    topicAvatar,
    topicDescription,
  }),
  updateTopicSubs: (topicName, topicSubs) => ({
    type: topicsActionType.UPDATE_TOPIC_SUBS,
    topicName,
    topicSubs,
  }),
};
