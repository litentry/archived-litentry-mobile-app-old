import React from 'react';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity, Alert } from 'react-native';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { Entypo, AntDesign } from '@expo/vector-icons';
import AppStyle from '../../../commons/AppStyle';
import { screensList } from '../../../navigation/screensList';
import { makeImageUrl } from '../lib/blob-helpers';
import GenesisButton, { VariantList as variantList } from '../../../components/GenesisButton';
import SingleLineDisplay from '../../../components/SingleLineDisplay';
import SingleSectionDisplay from '../../../components/SingleSectionDisplay';
import MemberList from '../../../components/MemberList';
import LightButton from "../../../components/LightButton";

const mock = {
  isJoined: true,
  meta: '2000',
};

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

  showVoteNeededAlert() {
    Alert.alert(
      'Vote needed',
      'To make changes please start a vote from chat window',
      [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
      { cancelable: false }
    );
  }

  render() {
    const { topicsMap, navigation, subscribedChatId } = this.props;
    const topic = _.get(topicsMap, subscribedChatId);
    if (!topic) return null;

    console.log('topic is', topic);

    const topicTitle = topic.public.fn;
    const topicAvatart = makeImageUrl(topic.public.photo);
    const topicDescription = topic.private.comment;
    return (
      <ScrollView style={styles.container}>
        <View style={styles.memberContainer}>
          <MemberList list={topic.subs} limit={25} />
          <LightButton
            onPress={() =>
              navigation.navigate(screensList.Members.label, {
                list: topic.subs,
              })
            }
            text={t.VIEW_MORE_MEMBERS}
          />
        </View>

        <View style={styles.infoContainer}>
          <SingleLineDisplay
            title={t.GROUP_TOPIC_TITLE}
            value={topicTitle}
            onClick={this.showVoteNeededAlert}
          />
          <SingleSectionDisplay
            title={t.TOPIC_DESCRIPTION_TITLE}
            value={topicDescription}
            onClick={this.showVoteNeededAlert}
          />
          <SingleLineDisplay
            title={t.TOPIC_META_TITLE}
            value={mock.meta}
            onClick={() => navigation.navigate(screensList.Transactions.label)}
          />
        </View>
        <View style={styles.rulesContainer}>
          <SingleLineDisplay
            title={t.TOPIC_RULES}
            value={''}
            Icon={props => (
              <Entypo
                name="users"
                size={AppStyle.fontMiddle}
                color={AppStyle.blueIcon}
                style={props.style}
              />
            )}
            onClick={() =>
              navigation.navigate(screensList.TopicRules.label, {
                topic,
                voteEnabled: false,
              })
            }
            style={styles.rules}
          />
        </View>
        {mock.isJoined ? (
          <GenesisButton
            style={styles.button}
            action={() => {}}
            text={t.LEAVE_BUTTON}
            variant={variantList.CANCEL}
          />
        ) : (
          <GenesisButton
            style={styles.button}
            action={() => {}}
            text={t.JOIN_BUTTON}
            variant={variantList.CONFIRM}
          />
        )}
      </ScrollView>
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppStyle.chatBackGroundColor,
  },
  memberContainer: {
    backgroundColor: 'white',
  },
  infoContainer: {
    marginTop: 20,
    backgroundColor: 'white',
  },
  rulesContainer: {
    marginTop: 20,
    backgroundColor: 'white',
  },
  rules: {},
  button: {},
});

const t = {
  LEAVE_BUTTON: 'Leave',
  JOIN_BUTTON: 'join',
  VIEW_MORE_MEMBERS: 'View more members',
  GROUP_TOPIC_TITLE: 'Country Name',
  TOPIC_DESCRIPTION_TITLE: 'Description',
  TOPIC_META_TITLE: 'National Treasure',
  TOPIC_RULES: 'Rules',
};
