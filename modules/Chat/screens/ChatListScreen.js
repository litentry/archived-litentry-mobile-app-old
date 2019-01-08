import React from 'react';
import { StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import AppStyle from '../../../commons/AppStyle';
import { screensList } from '../../../navigation/screensList';
import TinodeAPI from '../TinodeAPI';
import ChatListNode from '../components/ChatListNode';

class ChatListScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: screensList.ChatList.title,
    headerTransparent: false,
    headerTintColor: AppStyle.userCancelGreen,
    headerBackTitle: ' ',
    headerTruncatedBackTitle: '',
    headerStyle: {
      backgroundColor: 'white',
    },
  });

  static propTypes = {
    navigation: PropTypes.object,
    chatList: PropTypes.array.isRequired,
  };

  componentDidMount() {
    TinodeAPI.fetchTopics();
    TinodeAPI.fetchUserId();
  }

  render() {
    const { chatList, navigation } = this.props;
    console.log('chatList is', chatList);
    return (
      <FlatList
        style={styles.container}
        data={chatList}
        keyExtractor={item => item.topic}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(screensList.Topic.label, {
                topicId: item.topic,
                title: item.public.fn,
              })
            }>
            <ChatListNode chatNode={item} />
          </TouchableOpacity>
        )}
      />
    );
  }
}

const mapStateToProps = state => ({
  walletAddress: state.walletAddress,
  chatList: state.chat.chatList,
});

const mapDispatchToProps = _.curry(bindActionCreators)({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatListScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addIcon: {
    padding: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
