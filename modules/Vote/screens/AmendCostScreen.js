import React from 'react';
import connect from 'react-redux/es/connect/connect';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { screensList } from '../../../navigation/screensList';
import AmendInput from '../components/AmendInput';
import { groupMetaRules } from '../../../config';
import { generateNavigationOptions } from '../components/navigationOptions';
import Container from '../../../components/Container';

class AmendCostScreen extends React.Component {
  static navigationOptions = generateNavigationOptions(screensList.AmendCost.title);

  render() {
    return (
      <Container>
        <AmendInput
          propertyPath={groupMetaRules.VOTE_COST}
          unit={t.UNIT_TEXT}
          intro={t.INTRO_TEXT}
          description={t.DESCRIPTION_TEXT}
          isNumber
        />
      </Container>
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
