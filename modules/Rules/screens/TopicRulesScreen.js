import React from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
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
import SingleLineSingleValueDisplay from '../../../components/SingleLineSingleValueDisplay';
import { alertNormal } from '../../../utils/alertUtils';
import Container from '../../../components/Container';

class TopicRulesScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: <NavigationHeader title={screensList.TopicRules.title} />,
    headerBackTitle: ' ',
  });

  static propTypes = {
    navigation: PropTypes.object,
    voteCached: PropTypes.object.isRequired,
  };

  conditionalOpen(screenLabel) {
    const { navigation } = this.props;
    const editEnabled = navigation.getParam('editEnabled', false);
    if (editEnabled) {
      navigation.navigate(screenLabel);
    } else {
      alertNormal('Cannot Edit');
    }
  }

  render() {
    const { navigation, voteCached } = this.props;
    const editEnabled = navigation.getParam('editEnabled', false);
    const rules = editEnabled ? voteCached : navigation.getParam('rulesData');
    return (
      <Container style={styles.container}>
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
        <SingleLineSingleValueDisplay
          title={voteInfo.rulesDescription}
          onClick={() => {
            navigation.navigate(screensList.MemberRules.label, {
              editEnabled,
              rulesData: rules,
            });
          }}
        />
        <Text style={styles.rulesTitle}>{t.VOTING_RULES_TITLE}</Text>
        <SingleLineDisplay
          title={t.SUPPORT_TITLE}
          value={rules.requiredApproved.toFixed(1) + '%'}
          onClick={() => this.conditionalOpen(screensList.AmendSupport.label)}
        />
        <SingleLineDisplay
          title={t.DURATION_TITLE}
          value={`${rules.requiredHour} Hours`}
          onClick={() => {
            this.conditionalOpen(screensList.AmendDuration.label);
          }}
        />
        <SingleLineDisplay
          title={t.COST_TITLE}
          value={`- ${rules.voteCost} NES`}
          onClick={() => this.conditionalOpen(screensList.AmendCost.label)}
        />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  voteCached: state.vote.cached,
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
  NO_EDIT: 'Please edit the proposing or current rules.',
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppStyle.mainBackgroundColor,
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
