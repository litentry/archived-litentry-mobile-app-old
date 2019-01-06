import React from 'react';
import { Button, StyleSheet, View, TouchableOpacity, Text, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import AppStyle from '../../../commons/AppStyle';
import { screensList } from '../../../navigation/screensList';
import NavigationHeader from '../../../components/NavigationHeader';
import TinodeAPI from '../TinodeAPI';
import {makeImageUrl} from "../lib/blob-helpers";
import MessageNode from "../components/MessageNode";

class TopicScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: <NavigationHeader title={''} />,
    headerRight: (
      <TouchableOpacity
        onPress={() => navigation.navigate(screensList.Transactions.label)}
        color="black"
      >
        <Text>...</Text>
      </TouchableOpacity>
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
    avatar: PropTypes.string.isRequired,
  };

  componentDidMount() {
    const { navigation, userId, subscribedChatId, connected } = this.props;
    const topicId = navigation.getParam('topicId', null);
    if (connected && subscribedChatId !== topicId) {
      if (subscribedChatId !== null) TinodeAPI.unsubscribe(subscribedChatId);
      TinodeAPI.subscribe(topicId, userId);
    }
  }

  renderMessageNode (message, topic) {
    const {userId, avatar} = this.props
    let messageOwnerAvatar;
    if(message.from === userId) {
      messageOwnerAvatar = avatar
    } else {
      const messageOwner = _.find(topic.subs, {user: message.from})
      messageOwnerAvatar = makeImageUrl(messageOwner.public.photo)
    }
    return <MessageNode message={message} avatar={messageOwnerAvatar}/>
  }

  render() {
    const { topicsMap, navigation } = this.props;
    const topicId = navigation.getParam('topicId', null);
    const topic = _.get(topicsMap, topicId);
    if(!topic)
      return null;
    const { messages } = topic;
    if(!messages)
      return null;
    console.log('messages are', messages);
    return <View style={styles.container}>
      <FlatList
        style={styles.container}
        data={messages}
        keyExtractor={message => message.seq}
        renderItem={({item}) => this.renderMessageNode(item, topic)}/>
    </View>;
  }
}

const mapStateToProps = state => ({
  topicsMap: state.topics.topicsMap,
  userId: state.chat.userId,
  subscribedChatId: state.chat.subscribedChatId,
  connected: state.chat.connected,
  avatar: state.chat.avatar,
});

const mapDispatchToProps = _.curry(bindActionCreators)({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopicScreen);

const styles = StyleSheet.create({
  container: {
    flex:1
  },
});
