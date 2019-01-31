import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text, Alert} from 'react-native';
import { withNavigation } from 'react-navigation';
import { Entypo } from '@expo/vector-icons';
import _ from 'lodash';
import AppStyle from '../../commons/AppStyle';
import { screensList } from '../../navigation/screensList';
import SingleLineSingleValueDisplay from '../../components/SingleLineSingleValueDisplay';
import { mockHistoryRules } from './mockRulesData';

class RulesList extends React.Component {
  static propTypes = {
    isEdited: PropTypes.bool.isRequired,
    voteOrigin: PropTypes.object.isRequired,
    voteCached: PropTypes.object.isRequired,
    hasVoting: PropTypes.bool.isRequired,
    navigation: PropTypes.object.isRequired,
    allowEdit: PropTypes.bool.isRequired,
  };

  static defaultProps = {};

  renderSingleRule(editEnabled, rulesData, description, isVoting) {
    const { navigation, allowEdit } = this.props;
    const hasSeqData = !editEnabled;
    const title = hasSeqData
      ? `${_.padStart(rulesData.seq.toString(), 6, '0')}(${description})`
      : description;
    return (
      <View style={styles.rulesContainer} key={hasSeqData ? rulesData.seq.toString() : 'current'}>
        <SingleLineSingleValueDisplay
          title={title}
          fontSize={AppStyle.fontMiddleSmall}
          Icon={() => <Entypo name="users" size={AppStyle.fontMiddle} color={AppStyle.blueIcon} />}
          onClick={() => this.onClick(editEnabled, rulesData, isVoting)}
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

  onClick(editEnabled, rulesData, isVoting){
    const {allowEdit, navigation} = this.props;
    if(isVoting && !allowEdit) {
      navigation.navigate(screensList.VoteInfo.label)
    } else {
      navigation.navigate(screensList.TopicRules.label, {
        editEnabled: allowEdit && editEnabled,
        rulesData,
      })
    }
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
