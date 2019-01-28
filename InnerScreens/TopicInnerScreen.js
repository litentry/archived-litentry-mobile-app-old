import React from 'react';
import {StyleSheet, Text, View, Alert, ScrollView} from 'react-native';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { Entypo, AntDesign } from '@expo/vector-icons';
import AppStyle from '../commons/AppStyle';
import { screensList } from '../navigation/screensList';
import SingleLineDisplay from '../components/SingleLineDisplay';
import SingleSectionDisplay from '../components/SingleSectionDisplay';
import GenesisButton, {VariantList as variantList} from '../components/GenesisButton';
import {voteAction} from "../modules/Vote/voteAction";
import {makeImageUrl} from "../modules/Chat/lib/blob-helpers";
import { withNavigation } from 'react-navigation';
import MemberList from '../components/MemberList';
import LightButton from "../components/LightButton";

const mock = {
  meta: {
    countryName: '',
    description: '',
    economicRule: 'Standard plan',
    value: '1000',
    requiredApproved: 50,
    requiredHour: 168,
    groupWebsitePrefix: 'Https://www.bacaoke.com/',
    voteCost: 1000,
    memberRules: {
      default: [150, 150, 10, 1, 1],
    },
  },
  topic: {
    public: {
      fn: 'new topic',
      photo: null,
    },
    private: {
      comment: 'new country description'
    }
  }
};

const IntroContainer = (props) =>
  <View style={styles.introContainer}>
    <AntDesign
      name={props.iconName}
      size={AppStyle.fontBig}
      color={AppStyle.blueIcon}
      style={styles.introIcon}
    />
    <Text style={styles.introText}>{props.description}</Text>
  </View>

const MemberListContainer = (props) =>
  <View style={styles.memberContainer}>
    <MemberList list={props.topic.subs} limit={25}/>
    <LightButton
      onPress={() =>
        navigation.navigate(screensList.Members.label, {
          list: props.topic.subs,
        })
      }
      text={t.VIEW_MORE_MEMBERS}
    />
  </View>

class TopicInnerScreen extends React.Component {

  static propTypes = {
    navigation: PropTypes.object,
    initVote: PropTypes.func.isRequired,
    resetVote: PropTypes.func.isRequired,
    edited: PropTypes.bool.isRequired,

    topic: PropTypes.object.isRequired,
    description: PropTypes.string.isRequired,
    iconName: PropTypes.string.isRequired,
    allowEdit: PropTypes.bool.isRequired,
    isJoined: PropTypes.bool.isRequired,
  };

  componentDidMount() {
    const { initVote, topic } = this.props;
    const metaData = _.merge(mock.meta, {
      countryName: _.get(topic, 'public.fn', ''),
      description: _.get(topic, 'private.comment', ''),
    });
    initVote(metaData);
  }

  onPayment() {
    Alert.alert(
      'Payment',
      `${mock.meta.voteCost} NES`,
      [{ text: 'Pay now', onPress: () => console.log('OK Pressed') }],
      { cancelable: false }
    );
  }

  showVoteNeededAlert() {
    Alert.alert(
      'Vote needed',
      'To make changes please start a vote from chat window',
      [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
      { cancelable: false }
    );
  }

  get isCreatingNewTopic() {
    const {isJoined, allowEdit} = this.props
    return !isJoined && allowEdit
  }

  get isBlockedUser() {
    const {isJoined, allowEdit} = this.props
    return !isJoined && !allowEdit
  }

  renderButton() {
    const {isJoined, edited, resetVote} = this.props
    if(edited)
      return <React.Fragment>
        <GenesisButton action={()=>resetVote()} text={t.BUTTON_RESET_EDIT} variant={variantList.PRIMARY}/>
        <GenesisButton action={this.onPayment} text={t.BUTTON_CONFIRM_EDIT} variant={variantList.CONFIRM}/>
      </React.Fragment>
    if(isJoined)
      return <GenesisButton action={this.onPayment} text={t.BUTTON_LEAVE} variant={variantList.CANCEL}/>
    if(this.isBlockedUser)
      return <GenesisButton action={this.onPayment} text={t.BUTTON_JOIN} variant={variantList.CONFIRM}/>
    if(this.isCreatingNewTopic)
      return <GenesisButton action={this.onPayment} text={t.BUTTON_CREATE} variant={variantList.CONFIRM}/>
  }

  renderIntroOrMemberList () {
    const {isJoined, description, iconName, edited, topic} = this.props
    if(edited)
      return <IntroContainer iconName={iconName} description={t.VOTE_INTRO}/>
    if(isJoined)
      return <MemberListContainer topic={topic}/>
    if(this.isCreatingNewTopic)
      return <IntroContainer iconName={iconName} description={description}/>
    return <MemberListContainer topic={topic}/>
  }

  render() {
    const { topic, navigation, edited, allowEdit, isJoined } = this.props;

    const topicTitle = topic.public.fn;
    const topicAvatart = makeImageUrl(topic.public.photo);
    const topicDescription = topic.private.comment;

    return (
      <View style={styles.container}>
        {this.renderIntroOrMemberList()}
        <Text style={styles.rulesTitle}>{t.VOTE_RULES_TITLE}</Text>

        <View style={styles.infoContainer}>
          <SingleLineDisplay
            title={t.GROUP_TOPIC_TITLE}
            value={topicTitle}
            onClick={() => allowEdit ? navigation.navigate(screensList.AmendCountryName.label) : this.showVoteNeededAlert()}
          />
          <SingleSectionDisplay
            title={t.TOPIC_DESCRIPTION_TITLE}
            value={topicDescription}
            onClick={() => allowEdit ? navigation.navigate(screensList.AmendDescription.label) : this.showVoteNeededAlert()}
          />
          {isJoined &&
          <SingleLineDisplay
            title={t.TOPIC_META_TITLE}
            value={mock.meta.value}
            onClick={() => navigation.navigate(screensList.Transactions.label)}
          />
          }
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
                voteEnabled: true,
              })
            }
            style={styles.rules}
          />
        </View>
        {this.renderButton()}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  edited: !_.isEqual(state.vote.origin, state.vote.cached),
});

const mapDispatchToProps = _.curry(bindActionCreators)({
  initVote: voteAction.initVote,
  resetVote: voteAction.resetVote,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNavigation(TopicInnerScreen));

const t = {
  VOTE_INTRO:
    'To star a vote, simply provide new values. All changes must go through voting to take effect.' +
    ' These changes affect everyone in the country. Amend with caution! ',
  VOTE_RULES_TITLE: 'Information',
  GROUP_TOPIC_TITLE: 'Country Name',
  TOPIC_DESCRIPTION_TITLE: 'Description',
  TOPIC_RULES: 'Rules',
  TOPIC_META_TITLE: 'National Treasure',
  VIEW_MORE_MEMBERS: 'View more members',

  BUTTON_CONFIRM_EDIT: 'Confirm and starting Voting',
  BUTTON_RESET_EDIT: 'Reset the rules',
  BUTTON_LEAVE: 'Delete and leave',
  BUTTON_JOIN: 'Join',
  BUTTON_CREATE: 'Confirm and create',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppStyle.chatBackGroundColor,
  },
  memberContainer: {
    backgroundColor: 'white',
  },
  introContainer: {
    padding: 20,
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  introText: {
    flex: 3,
    color: AppStyle.lightGrey,
    fontFamily: AppStyle.mainFont,
    fontSize: AppStyle.fontMiddleSmall,
  },
  introIcon: {
    padding: 20,
  },
  rulesTitle: {
    paddingTop: 30,
    paddingBottom: 10,
    paddingHorizontal: 20,
    color: AppStyle.lightGrey,
    fontFamily: AppStyle.mainFont,
    fontSize: AppStyle.fontMiddleSmall,
  },
  infoContainer: {
    marginTop: 20,
    backgroundColor: 'white',
  },
  rulesContainer: {
    marginTop: 20,
    backgroundColor: 'white',
  },
});
