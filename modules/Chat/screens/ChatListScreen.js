import React from 'react';
import {
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  Button,
} from 'react-native';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { AntDesign } from '@expo/vector-icons';
import { Header } from 'react-navigation';
import AppStyle from '../../../commons/AppStyle';
import { screensList } from '../../../navigation/screensList';
import TinodeAPI from '../TinodeAPI';
import ChatListNode from '../components/ChatListNode';
import { loaderAction } from '../../../actions/loaderAction';

class ChatListScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: screensList.ChatList.title,
    headerTransparent: false,
    headerTintColor: AppStyle.userCancelGreen,
    headerBackTitle: ' ',
    headerRight: (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(screensList.CreateTopic.label);
        }}
        style={styles.createTopicIconContainer}>
        <AntDesign
          style={styles.createTopicIcon}
          size={AppStyle.fontMiddle}
          name="plus"
          color={AppStyle.userCancelGreen}
        />
      </TouchableOpacity>
    ),
    headerTruncatedBackTitle: '',
    headerStyle: {
      backgroundColor: 'white',
    },
  });

  static propTypes = {
    navigation: PropTypes.object,
    chatMap: PropTypes.object.isRequired,
    userId: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
    };
  }

  componentDidMount() {
    TinodeAPI.fetchTopics();
  }

  onRefresh = () => {
    this.setState({ refreshing: true });
    TinodeAPI.fetchTopics().then(() => {
      this.setState({ refreshing: false });
    });
  };

  render() {
    const { chatMap, navigation } = this.props;
    const sortedList = _.values(chatMap).sort((a, b) => {
      //TODO add timestamp sorting
      const conditionA = a.isSubscribed < b.isSubscribed;
      const dateA = a.updated || new Date(0);
      const dateB = b.updated || new Date(0);
      const conditionB = dateA.getTime() < dateB.getTime();
      return conditionA;
    });

    return (
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} />
        }>
        <FlatList
          style={styles.listContainer}
          data={sortedList}
          extraData={sortedList}
          keyExtractor={item => item.topic}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.chatNode,
                { backgroundColor: item.isSubscribed ? 'white' : AppStyle.chatBackGroundColor },
              ]}
              onPress={() =>
                item.isSubscribed
                  ? navigation.navigate(screensList.Topic.label, {
                      topicId: item.topic,
                      title: item.public.fn,
                    })
                  : navigation.navigate(screensList.TopicInfo.label, {
                      title: item.public.fn,
                      topic: item,
                      allowEdit: false,
                      isJoined: false,
                    })
              }>
              <ChatListNode chatNode={item} />
            </TouchableOpacity>
          )}
        />
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  walletAddress: state.appState.walletAddress,
  chatMap: state.chat.chatMap,
  userId: state.appState.userId,
});

const mapDispatchToProps = _.curry(bindActionCreators)({
  clearAppData: loaderAction.clearAppData,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatListScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  createTopicIconContainer: {
    height: Header.HEIGHT,
    paddingRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  createTopicIcon: {},
  listContainer: {
    flex: 1,
  },
  addIcon: {
    padding: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatNode: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: AppStyle.chatBorder,
  },
});
