import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { Header } from 'react-navigation';
import AppStyle from '../../../commons/AppStyle';
import InputWithValidation from '../components/InputWithValidation';
import GenesisButton from '../../../components/GenesisButton';

const mock = {
  isSet: false,
};

class SetPasswordScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerBackTitle: '',
    headerTransparent: true,
    headerTintColor: AppStyle.userCancelGreen,
    headerStyle: {
      backgroundColor: AppStyle.userHeaderBackgroundColor,
    },
  });

  static propTypes = {
    navigation: PropTypes.object,
  };

  render() {
    const validator = () => true;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>{mock.isSet ? t.REPEAT_TITLE : t.TITLE}</Text>
        <Text style={styles.subtitle}>{t.SUBTITLE}</Text>
        <View style={styles.inputContainer}>
          <InputWithValidation
            onChangeText={() => {}}
            value={mock.email}
            validator={validator}
            placeholder={t.PLACEHOLDER}
            errorMessage={t.ERROR_MESSAGE}
          />
        </View>
        <View style={styles.button}>
          <GenesisButton action={() => {}} text={t.BUTTON_TEXT} />
        </View>
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
)(SetPasswordScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Header.HEIGHT + 50,
    backgroundColor: AppStyle.userBackgroundColor,
  },
  title: {
    flex: 1,
    paddingHorizontal: 50,
    fontSize: AppStyle.fontMiddle,
    color: AppStyle.lightGrey,
    fontFamily: AppStyle.coverFont,
  },
  subtitle: {
    flex: 1,
    paddingHorizontal: 50,
    fontSize: AppStyle.fontMiddleSmall,
    color: AppStyle.lightGrey,
    fontFamily: AppStyle.coverFont,
  },
  inputContainer: {
    flex: 2,
  },
  button: {
    flex: 2,
  },
});

const t = {
  TITLE: 'Set a password',
  REPEAT_TITLE: 'Repeat the password',
  SUBTITLE: 'Make sure it’s 6 characters or more.',
  BUTTON_TEXT: 'Next',
  PLACEHOLDER: 'Password',
  ERROR_MESSAGE: 'Sorry, this password is too weak',
};
