import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import connect from 'react-redux/es/connect/connect';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import AppStyle from '../../../commons/AppStyle';
import { screensList } from '../../../navigation/screensList';
import AmendInput from '../components/AmendInput';
import { groupMetaRules } from '../../../config';
import HeaderButton from './AmendSupportScreen';
import { generateNavigationOptions } from '../components/navigationOptions';

class AmendCostScreen extends React.Component {
  static navigationOptions = generateNavigationOptions(screensList.AmendCost.title);

  render() {
    return (
      <View style={styles.container}>
        <AmendInput
          propertyPath={groupMetaRules.VOTE_COST}
          unit={t.UNIT_TEXT}
          intro={t.INTRO_TEXT}
          description={t.DESCRIPTION_TEXT}
          isNumber
        />
      </View>
    );
  }
}

const t = {
  UNIT_TEXT: 'NES',
  INTRO_TEXT: 'How much does it cost to start a vote? ',
  DESCRIPTION_TEXT:
    'All the nes paid by whoever start a vote will be distributed averagely to voters. ',
};

const mapStateToProps = state => ({});

const mapDispatchToProps = _.curry(bindActionCreators)({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AmendCostScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
