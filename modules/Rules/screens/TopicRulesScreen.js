import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { Entypo } from '@expo/vector-icons';
import AppStyle from '../../../commons/AppStyle';
import { screensList } from '../../../navigation/screensList';
import NavigationHeader from '../../../components/NavigationHeader';
import { voteInfo } from '../../../config';
import SingleLineDisplay from '../../../components/SingleLineDisplay';

const mock = {
  groupRuleName: 'democracy',
  economicRule: 'Standard plan',
  requiredApproved: 0.5,
  requiredDay: 7,
  groupWebsitePrefix: 'Https://www.bacaoke.com/',
  cost: 1000,
};

class TopicRulesScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: <NavigationHeader title={screensList.TopicRules.title} />,
    headerBackTitle: ' ',
    headerStyle: {
      backgroundColor: AppStyle.backgroundColor,
    },
  });

  static propTypes = {
    navigation: PropTypes.object,
  };

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.introContainer}>
          <Entypo
            name="users"
            size={AppStyle.fontBig}
            color={AppStyle.blueIcon}
            style={styles.introIcon}
          />
          <Text style={styles.introText}>{t.RULES_INTRO}</Text>
        </View>
        <Text style={styles.rulesTitle}>{t.PEOPLE_RULES_TITLE}</Text>
        <SingleLineDisplay
          title={voteInfo.rulesDescription}
          value={''}
          onClick={() => {
            navigation.navigate(screensList.MemberRules.label);
          }}
        />
        <Text style={styles.rulesTitle}>{t.VOTING_RULES_TITLE}</Text>
        <SingleLineDisplay
          title={t.SUPPORT_TITLE}
          value={Math.floor(mock.requiredApproved * 100) + '%'}
          onClick={() => {}}
        />
        <SingleLineDisplay
          title={t.DURATION_TITLE}
          value={`${mock.requiredDay * 24} Hours`}
          onClick={() => {}}
        />
        <SingleLineDisplay title={t.COST_TITLE} value={`- ${mock.cost} NES`} onClick={() => {}} />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  walletAddress: state.walletAddress,
});

const mapDispatchToProps = _.curry(bindActionCreators)({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopicRulesScreen);

const t = {
  RULES_INTRO:
    'Rules set governance of a virtual country. All rules changes must go through voting. ',
  PEOPLE_RULES_TITLE: 'People rules',
  VOTING_RULES_TITLE: 'Voting rules',
  SUPPORT_TITLE: 'Support',
  DURATION_TITLE: 'Duration',
  COST_TITLE: 'Cost',
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
});
