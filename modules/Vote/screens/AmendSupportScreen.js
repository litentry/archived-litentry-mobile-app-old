import React from 'react';
import connect from 'react-redux/es/connect/connect';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { screensList } from '../../../navigation/screensList';
import AmendInput from '../components/AmendInput';
import { groupMetaRules } from '../../../config';
import { generateNavigationOptions } from '../components/navigationOptions';
import Container from "../../../components/Container";

class AmendSupportScreen extends React.Component {
  static navigationOptions = generateNavigationOptions(screensList.AmendSupport.title);

  render() {
    return (
      <Container>
        <AmendInput
          propertyPath={groupMetaRules.REQUIRED_APPROVED}
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
  UNIT_TEXT: '%',
  INTRO_TEXT: 'How many votes needed to pass?',
  DESCRIPTION_TEXT: '',
};

const mapStateToProps = state => ({});

const mapDispatchToProps = _.curry(bindActionCreators)({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AmendSupportScreen);
