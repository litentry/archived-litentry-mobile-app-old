import React from 'react';
import connect from 'react-redux/es/connect/connect';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import { screensList } from '../../../navigation/screensList';
import AmendInput from '../components/AmendInput';
import { groupMetaRules } from '../../../config';
import { generateNavigationOptions } from '../components/navigationOptions';
import Container from '../../../components/Container';

class AmendDurationScreen extends React.Component {
  static navigationOptions = generateNavigationOptions(screensList.AmendDuration.title);

  render() {
    return (
      <Container>
        <AmendInput
          propertyPath={groupMetaRules.REQUIRED_HOUR}
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
  UNIT_TEXT: 'Hours',
  INTRO_TEXT: 'How long is the voting period ?',
  DESCRIPTION_TEXT:
    'A voting motion must receive enough votes during this period of time in order to pass.',
};

const mapStateToProps = state => ({});

const mapDispatchToProps = _.curry(bindActionCreators)({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AmendDurationScreen);
