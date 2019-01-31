import React from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import AppStyle from '../../../commons/AppStyle';
import TopicInnerScreen from '../../../InnerScreens/TopicInnerScreen';

class TopicInfoScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: navigation.getParam('title', null),
    headerBackTitle: ' ',
    headerStyle: {
      backgroundColor: AppStyle.backgroundColor,
    },
  });

  static propTypes = {
    navigation: PropTypes.object,
    topicsMap: PropTypes.object.isRequired,
    subscribedChatId: PropTypes.string,
  };

  render() {
    const { topicsMap, subscribedChatId, navigation } = this.props;
    const topic = navigation.getParam('topic') || _.get(topicsMap, subscribedChatId);
    if (!topic) return null;

    const allowEdit = navigation.getParam('allowEdit', false)
    const isJoined = navigation.getParam('isJoined', false)

    return (
      <TopicInnerScreen
        description={t.TOPIC_DESCRIPTION_TITLE}
        topic={topic}
        isJoined={isJoined}
        allowEdit={allowEdit}
        iconName="addfile"
      />
    );
  }
}

const mapStateToProps = state => ({
  walletAddress: state.appState.walletAddress,
  topicsMap: state.topics.topicsMap,
  subscribedChatId: state.chat.subscribedChatId,
});

const mapDispatchToProps = _.curry(bindActionCreators)({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopicInfoScreen);

const t = {
  TOPIC_DESCRIPTION_TITLE: 'Topic Description',
};
