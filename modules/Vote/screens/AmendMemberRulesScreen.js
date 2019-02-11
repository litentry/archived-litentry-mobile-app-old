import React from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { screensList } from '../../../navigation/screensList';
import AmendInput from '../components/AmendInput';
import { groupMetaRules } from '../../../config';
import { INIT_VALUE } from '../reducer/voteReducer';
import { generateNavigationOptions } from '../components/navigationOptions';
import Container from "../../../components/Container";

class AmendMemberRulesScreen extends React.Component {
  static navigationOptions = generateNavigationOptions(screensList.AmendMemberRules.title);

  static propTypes = {
    navigation: PropTypes.object,
  };

  render() {
    const { navigation } = this.props;
    const userId = navigation.getParam('userId', 'default');

    return (
      <Container>
        <AmendInput
          propertyPath={`${groupMetaRules.MEMBER_RULES}.${userId}`}
          reader={v => {
            if (_.isEmpty(v)) v = INIT_VALUE.origin.memberRules.default;
            return v.join('/');
          }}
          writer={v => {
            return v.split('/').map(i => (isNaN(parseInt(i)) ? 0 : parseInt(i)));
          }}
          unit={''}
          isNumber={false}
          intro={t.INTRO_TEXT}
          description={t.DESCRIPTION_TEXT}
        />
      </Container>
    );
  }
}

const t = {
  INTRO_TEXT: 'What is the rules applied to this user?',
  DESCRIPTION_TEXT:
    'Each value will present for a center rule, please check the rule info before amend it.',
};

const mapStateToProps = state => ({
  walletAddress: state.appState.walletAddress,
});

const mapDispatchToProps = _.curry(bindActionCreators)({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AmendMemberRulesScreen);
