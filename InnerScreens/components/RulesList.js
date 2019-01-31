import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text } from 'react-native';
import { withNavigation } from 'react-navigation';
import { Entypo } from '@expo/vector-icons';
import AppStyle from '../../commons/AppStyle';
import _ from 'lodash';
import { screensList } from '../../navigation/screensList';
import SingleLineSingleValueDisplay from '../../components/SingleLineSingleValueDisplay';
import {mockHistoryRules} from './mockRulesData';


class RulesList extends React.Component {
  static propTypes = {
    isEdited: PropTypes.bool.isRequired,
    voteOrigin: PropTypes.object.isRequired,
    voteCached: PropTypes.object.isRequired,
    hasVoting: PropTypes.bool.isRequired,
    navigation: PropTypes.object.isRequired,
  };

  static defaultProps = {};

  renderSingleRule(editEnabled, rulesData, description, isVoting) {
    const {navigation} = this.props;
    const hasSeqData = !editEnabled;
    const title =  hasSeqData ? `${_.padStart(rulesData.seq.toString(), 6 ,'0')}(${description})` : description
    return (
      <View style={styles.rulesContainer} key={hasSeqData ? rulesData.seq.toString() : 'current'}>
        <SingleLineSingleValueDisplay
          title={title}
          Icon={() => <Entypo name="users" size={AppStyle.fontMiddle} color={AppStyle.blueIcon}/>}
          onClick={() =>
            isVoting ?
              navigation.navigate(screensList.VoteInfo.label) :
              navigation.navigate(screensList.TopicRules.label, {
                  editEnabled,
                  rulesData,
                })
          }
        />
      </View>
    );
  }

  renderCurrentAndProposing() {
    const { voteOrigin, voteCached, isEdited } = this.props;
    if (isEdited) {
      return (
        <React.Fragment>
          {this.renderSingleRule(true, voteCached, 'Proposing')}
          {this.renderSingleRule(false, voteOrigin, 'Current')}
        </React.Fragment>
      );
    }
    return this.renderSingleRule(true, voteCached, 'Current');
  }

  render() {
    const { voteOrigin, hasVoting } = this.props;
    return (
      <View style={styles.container}>
        {hasVoting && this.renderSingleRule(false, voteOrigin, 'Voting', true)}
        {this.renderCurrentAndProposing()}
        {mockHistoryRules.map(item =>
          this.renderSingleRule(false, item, `${item.startAt}-${item.endAt}`)
        )}
      </View>
    );
  }
}

export default withNavigation(RulesList);

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
  },
  rulesContainer: {
    backgroundColor: 'white',
  },
});
