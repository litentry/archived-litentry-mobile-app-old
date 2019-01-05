import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import AppStyle from '../../../commons/AppStyle';
import { screensList } from '../../../navigation/screensList';
import NavigationHeader from '../../../components/NavigationHeader';
import TinodeAPI from '../TinodeAPI';

class TopicScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: <NavigationHeader title={screensList.Wallet.title} />,
    headerRight: (
      <Button
        onPress={() => navigation.navigate(screensList.Transactions.label)}
        title={screensList.Transactions.title}
        color="black"
      />
    ),
    headerBackTitle: '',
    headerStyle: {
      backgroundColor: AppStyle.backgroundColor,
    },
  });

  static propTypes = {
    navigation: PropTypes.object,
    topicsMap: PropTypes.object.isRequired,
    userId: PropTypes.string.isRequired,
    subscribedChatId: PropTypes.string,
    connected: PropTypes.bool.isRequired,
  };

  componentDidMount() {
    const { navigation, userId, subscribedChatId, connected } = this.props;
    const topicId = navigation.getParam('topicId', null);
    if (connected && subscribedChatId !== topicId) {
      if (subscribedChatId !== null) TinodeAPI.unsubscribe(subscribedChatId);
      TinodeAPI.subscribe(topicId, userId);
    }
  }

  render() {
    const { topicsMap, navigation } = this.props;
    const topicId = navigation.getParam('topicId', null);
    const messages = _.get(topicsMap, topicId);
    console.log('messages are', messages);
    return <View style={styles.container} />;
  }
}

const mapStateToProps = state => ({
  topicsMap: state.topics.topicsMap,
  userId: state.chat.userId,
  subscribedChatId: state.chat.subscribedChatId,
  connected: state.chat.connected,
});

const mapDispatchToProps = _.curry(bindActionCreators)({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopicScreen);

const styles = StyleSheet.create({
  container: {},
});
