import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import AppStyle from '../../../commons/AppStyle';
import { screensList } from '../../../navigation/screensList';
import AmendInput from '../components/AmendInput';
import { groupMetaRules } from '../../../config';

class AmendMemberRulesScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: screensList.AmendMemberRules.title,
    headerRight: <Button onPress={() => navigation.goBack()} title="Done" color="white" />,
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: AppStyle.voteHeaderBackgroundColor,
    },
  });

  static propTypes = {
    navigation: PropTypes.object,
  };

  render() {
    const { navigation } = this.props;
    const userId = navigation.getParam('userId', 'default');

    return (
      <View style={styles.container}>
        <AmendInput
          propertyPath={`${groupMetaRules.MEMBER_RULES}.${userId}`}
          unit={''}
          isNumber={false}
          intro={t.INTRO_TEXT}
          description={t.DESCRIPTION_TEXT}
        />
      </View>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
