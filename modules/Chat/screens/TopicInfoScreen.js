import React from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import AppStyle from '../../../commons/AppStyle';
import TopicInnerScreen from "../../../InnerScreens/TopicInnerScreen";

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
    const { topicsMap, subscribedChatId } = this.props;
    const topic = _.get(topicsMap, subscribedChatId);
    if (!topic) return null;

    return <TopicInnerScreen description={t.TOPIC_DESCRIPTION_TITLE} topic={topic} isJoined={true} allowEdit={false} iconName={'addfile'}/>
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
}
