import React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { Entypo, AntDesign } from '@expo/vector-icons';
import AppStyle from '../commons/AppStyle';
import { screensList } from '../navigation/screensList';
import SingleLineDisplay from '../components/SingleLineDisplay';
import SingleSectionDisplay from '../components/SingleSectionDisplay';
import GenesisButton from '../components/GenesisButton';
import {voteAction} from "../modules/Vote/voteAction";
import {makeImageUrl} from "../modules/Chat/lib/blob-helpers";
import { withNavigation } from 'react-navigation';

const mock = {
  meta: {
    countryName: '',
    description: '',
    economicRule: 'Standard plan',
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

class TopicInnerScreen extends React.Component {

  static propTypes = {
    navigation: PropTypes.object,
    topicsMap: PropTypes.object.isRequired,
    chatId: PropTypes.string,
    initVote: PropTypes.func.isRequired,
    edited: PropTypes.bool.isRequired,
  };

  componentDidMount() {
    const { topicsMap, initVote, chatId } = this.props;
    const topic = _.get(topicsMap, chatId);
    if (!topic) return null;
    const metaData = _.merge(mock.data, {
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

  render() {
    const { topicsMap, navigation, chatId, edited } = this.props;
    let topic = mock.topic;
    if (!_.isEmpty(chatId)) {
      topic = _.get(topicsMap, chatId);
      if (!topic) return null;
    }
    const topicTitle = topic.public.fn;
    const topicAvatart = makeImageUrl(topic.public.photo);
    const topicDescription = topic.private.comment;

    return (
      <View style={styles.container}>
        <View style={styles.introContainer}>
          <AntDesign
            name="addfile"
            size={AppStyle.fontBig}
            color={AppStyle.blueIcon}
            style={styles.introIcon}
          />
          <Text style={styles.introText}>{t.VOTE_INTRO}</Text>
        </View>
        <Text style={styles.rulesTitle}>{t.VOTE_RULES_TITLE}</Text>

        <View style={styles.infoContainer}>
          <SingleLineDisplay
            title={t.GROUP_TOPIC_TITLE}
            value={topicTitle}
            onClick={() => navigation.navigate(screensList.AmendCountryName.label)}
          />
          <SingleSectionDisplay
            title={t.TOPIC_DESCRIPTION_TITLE}
            value={topicDescription}
            onClick={() => navigation.navigate(screensList.AmendDescription.label)}
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
                voteEnabled: true,
              })
            }
            style={styles.rules}
          />
        </View>
        {edited && <GenesisButton action={this.onPayment} text={t.BUTTON_TEXT} />}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  topicsMap: state.topics.topicsMap,
  edited: !_.isEqual(state.vote.origin, state.vote.cached),
});

const mapDispatchToProps = _.curry(bindActionCreators)({
  initVote: voteAction.initVote,
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
  BUTTON_TEXT: 'Confirm and starting Voting',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppStyle.chatBackGroundColor,
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
