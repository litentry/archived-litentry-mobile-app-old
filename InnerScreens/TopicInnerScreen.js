import React from 'react';
import { StyleSheet, Text, View, Alert, ScrollView, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { Entypo, AntDesign } from '@expo/vector-icons';
import { NavigationActions, StackActions, withNavigation } from 'react-navigation';
import AppStyle from '../commons/AppStyle';
import { screensList } from '../navigation/screensList';
import SingleLineDisplay from '../components/SingleLineDisplay';
import SingleSectionDisplay from '../components/SingleSectionDisplay';
import GenesisButton, { VariantList as variantList } from '../components/GenesisButton';
import { voteAction } from '../modules/Vote/voteAction';
import TinodeAPI from '../modules/Chat/TinodeAPI';
import { MemberListContainer, IntroContainer } from './components';
import { popupAction } from '../actions/popupAction';
import { renderImageSource } from '../utils/imageUtils';
import RulesList from './components/RulesList';
import SingleLineSingleValueDisplay from '../components/SingleLineSingleValueDisplay';
import { lockScreen } from '../modules/Unlock/lockScreenUtils';
import { aboutInfo } from '../config';
import DappsList from './components/DappList';

class TopicInnerScreen extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    initVote: PropTypes.func.isRequired,
    resetVote: PropTypes.func.isRequired,
    edited: PropTypes.bool.isRequired,
    voteCached: PropTypes.object.isRequired,
    voteOrigin: PropTypes.object.isRequired,
    userId: PropTypes.string.isRequired,
    showPopup: PropTypes.func.isRequired,

    topic: PropTypes.object.isRequired,
    description: PropTypes.string.isRequired,
    iconName: PropTypes.string.isRequired,
    allowEdit: PropTypes.bool.isRequired,
    isJoined: PropTypes.bool.isRequired,
    walletAddress: PropTypes.string,
  };

  componentDidMount() {
    const { initVote, topic, voteOrigin } = this.props;
    const voteData = _.merge({}, voteOrigin, {
      countryName: _.get(topic, 'public.fn', voteOrigin.countryName),
      description: _.get(topic, 'private.comment', 'No permission'),
      profile: _.get(topic, 'public.photo', voteOrigin.profile),
    });
    initVote(voteData);
  }

  onPayment() {
    const { voteCached, navigation, showPopup, walletAddress } = this.props;
    Alert.alert(
      'Payment',
      `${voteCached.voteCost} NES`,
      [
        {
          text: 'Pay now',
          onPress: () => {
            if (_.isEmpty(walletAddress)) {
              showPopup(t.NO_WALLET);
            } else {
              lockScreen(navigation).then(() => {
                showPopup(aboutInfo.todo);
              });
            }
          },
        },
      ],
      { cancelable: false }
    );
  }

  onJoin() {
    const { voteCached, navigation, topic } = this.props;
    Alert.alert(
      'Payment',
      `${voteCached.voteCost} NES`,
      [
        {
          text: 'Pay now (test version no fee)',
          onPress: () => {
            const resetAction = StackActions.reset({
              index: 1,
              actions: [
                NavigationActions.navigate({ routeName: screensList.ChatList.label }),
                NavigationActions.navigate({
                  routeName: screensList.Topic.label,
                  params: {
                    topicId: topic.topic || topic.name,
                    title: voteCached.countryName,
                  },
                }),
              ],
            });
            navigation.dispatch(resetAction);
          },
        },
      ],
      { cancelable: false }
    );
  }

  onLeave() {
    const { navigation, topic } = this.props;
    if (_.isEmpty(_.get(topic, 'topic', null))) return;
    return TinodeAPI.leaveTopic(topic.topic).then(ctrl => {
      console.log('leave ctrl is', ctrl);
      navigation.navigate(screensList.ChatList.label);
    });
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
    const { isJoined, allowEdit } = this.props;
    return !isJoined && allowEdit;
  }

  get isBlockedUser() {
    const { isJoined, allowEdit } = this.props;
    return !isJoined && !allowEdit;
  }

  renderButton() {
    const { isJoined, edited, resetVote } = this.props;
    if (this.isCreatingNewTopic)
      return (
        <GenesisButton
          action={() => this.createNewTopic()}
          text={t.BUTTON_CREATE}
          variant={variantList.CONFIRM}
        />
      );
    if (edited)
      return (
        <React.Fragment>
          <GenesisButton
            action={() => resetVote()}
            text={t.BUTTON_RESET_EDIT}
            variant={variantList.PRIMARY}
          />
          <GenesisButton
            action={() => this.onPayment()}
            text={t.BUTTON_CONFIRM_EDIT}
            variant={variantList.CONFIRM}
          />
        </React.Fragment>
      );
    if (isJoined)
      return (
        <GenesisButton
          action={() => this.onLeave()}
          text={t.BUTTON_LEAVE}
          variant={variantList.CANCEL}
        />
      );
    if (this.isBlockedUser)
      return (
        <GenesisButton
          action={() => this.onJoin()}
          text={t.BUTTON_JOIN}
          variant={variantList.CONFIRM}
        />
      );
  }

  validateTopicParams() {
    const { voteCached } = this.props;
    if (_.isEmpty(voteCached.countryName)) return { error: t.CREATE_NAME_ERROR };
    if (_.isEmpty(voteCached.description)) return { error: t.CREATE_DESCRIPTION_ERROR };
    if (_.isEmpty(voteCached.profile)) return { error: t.CREATE_PHOTO_ERROR };
    return { error: null };
  }

  createNewTopic() {
    const { voteCached, userId, showPopup, navigation } = this.props;
    const paramError = _.get(this.validateTopicParams(), 'error', null);
    if (paramError) return showPopup(paramError);
    TinodeAPI.createAndSubscribeNewTopic(voteCached, userId).then(ctrl => {
      const resetAction = StackActions.reset({
        index: 1,
        actions: [
          NavigationActions.navigate({ routeName: screensList.ChatList.label }),
          NavigationActions.navigate({
            routeName: screensList.Topic.label,
            params: {
              topicId: ctrl.topic,
              title: voteCached.countryName,
            },
          }),
        ],
      });
      navigation.dispatch(resetAction);
    });
  }

  renderIntroOrMemberList() {
    const { isJoined, iconName, topic, navigation } = this.props;
    if (isJoined) return <MemberListContainer topic={topic} navigation={navigation} />;
    if (this.isCreatingNewTopic)
      return <IntroContainer iconName={iconName} description={t.CREATE_COUNTRY_INTRO} />;
    return null;
  }

  render() {
    const { navigation, allowEdit, isJoined, voteCached, edited, voteOrigin } = this.props;
    //TODO remove defensive check
    if (_.isEmpty(voteCached)) return null;

    const topicTitle = voteCached.countryName;
    const topicDescription = voteCached.description;

    return (
      <ScrollView style={styles.container}>
        {this.renderIntroOrMemberList()}
        <Text style={styles.rulesTitle}>{t.META_INFO_TITLE}</Text>

        <View style={styles.infoContainer}>
          <SingleLineDisplay
            title={t.GROUP_TOPIC_TITLE}
            value={topicTitle}
            onClick={() =>
              allowEdit
                ? navigation.navigate(screensList.AmendCountryName.label)
                : this.showVoteNeededAlert()
            }
          />
          <SingleSectionDisplay
            title={t.TOPIC_DESCRIPTION_TITLE}
            value={topicDescription}
            onClick={() =>
              allowEdit
                ? navigation.navigate(screensList.AmendDescription.label)
                : this.showVoteNeededAlert()
            }
          />
          {isJoined && (
            <SingleLineDisplay
              title={t.TOPIC_META_TITLE}
              value={_.get(voteCached, 'treasury', '0')}
              onClick={() => navigation.navigate(screensList.Transactions.label)}
            />
          )}
          <SingleLineSingleValueDisplay
            title={t.CREATE_UPLOAD_PROFILE}
            Icon={() => (
              <View style={styles.imageContainer}>
                <Image style={styles.image} source={renderImageSource(voteCached.profile)} />
              </View>
            )}
            onClick={() => navigation.navigate(screensList.UploadCountryProfile.label)}
          />
        </View>

        <Text style={styles.rulesTitle}>{t.VOTE_RULES_TITLE}</Text>
        <RulesList
          voteOrigin={voteOrigin}
          voteCached={voteCached}
          hasVoting={false}
          isEdited={edited}
          allowEdit={allowEdit}
        />
        <Text style={styles.rulesTitle}>{t.MINI_DAPPS}</Text>
        <DappsList />
        {this.renderButton()}
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  edited: !_.isEqual(state.vote.origin, state.vote.cached),
  voteCached: state.vote.cached,
  voteOrigin: state.vote.origin,
  userId: state.appState.userId,
  walletAddress: state.appState.walletAddress,
});

const mapDispatchToProps = _.curry(bindActionCreators)({
  initVote: voteAction.initVote,
  resetVote: voteAction.resetVote,
  showPopup: popupAction.showPopup,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNavigation(TopicInnerScreen));

const t = {
  VOTE_INTRO:
    'To star a vote, simply provide new values. All changes must go through voting to take effect.' +
    ' These changes affect everyone in the country. Amend with caution! ',
  META_INFO_TITLE: 'Information',
  VOTE_RULES_TITLE: 'Rules',
  MINI_DAPPS: 'Dapps',
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

  CREATE_COUNTRY_INTRO:
    'To create a virtual country, start add your rules and description here, ' +
    'all the information will be stored in the smart contract',
  CREATE_NAME_ERROR: 'Please fill a valid country name',
  CREATE_DESCRIPTION_ERROR: 'Please fill a description for your country',
  CREATE_PHOTO_ERROR: 'Please upload a profile photo for the country',
  CREATE_UPLOAD_PROFILE: 'Update country profile',

  NO_WALLET: 'please set wallet first',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppStyle.chatBackGroundColor,
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

  imageContainer: {
    height: 50,
    width: 50,
    marginRight: 10,
  },
  image: {
    height: 50,
    width: 50,
    resizeMode: 'contain',
  },
});
