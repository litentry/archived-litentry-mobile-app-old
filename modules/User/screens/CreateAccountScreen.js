import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { Header } from 'react-navigation';
import AppStyle from '../../../commons/AppStyle';
import { screensList } from '../../../navigation/screensList';
import InputWithValidation from '../components/InputWithValidation';
import GenesisButton from '../../../components/GenesisButton';
import { userRegisterAction } from '../actions/userRegiseterActions';

const usernameRegex = /^[a-zA-Z0-9]+$/;
const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

class CreateAccountScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    // headerTitle: <NavigationHeader title={''} />,
    headerTransparent: true,
    headerTintColor: AppStyle.userCancelGreen,
    headerStyle: {
      backgroundColor: AppStyle.userHeaderBackgroundColor,
    },
  });

  static propTypes = {
    navigation: PropTypes.object,
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    updateUserRegisterInfo: PropTypes.func.isRequired,
  };

  render() {
    const { username, email, updateUserRegisterInfo, navigation } = this.props;
    const usernameValidator = value => usernameRegex.test(value);
    const emailValidator = email => emailRegex.test(email);
    const isNextValid = () => usernameValidator(username) && emailValidator(email);

    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{t.CREATE_ACCOUNT_TITLE}</Text>
        </View>
        <View style={styles.inputContainer}>
          <InputWithValidation
            onChangeText={username => updateUserRegisterInfo({ username })}
            value={username}
            validator={usernameValidator}
            errorMessage={t.USERNAME_ERROR}
            placeholder={t.USERNAME_PLACEHOLDER}
          />
        </View>
        <View style={styles.inputContainer}>
          <InputWithValidation
            onChangeText={email => updateUserRegisterInfo({ email: email.toLowerCase() })}
            value={email}
            validator={emailValidator}
            errorMessage={t.EMAIL_ERROR}
            placeholder={t.EMAIL_PLACEHOLDER}
          />
        </View>
        <Text style={styles.hint}>{t.HINT_TEXT}</Text>
        <View style={styles.button}>
          <GenesisButton
            disabled={!isNextValid()}
            action={() => {
              navigation.navigate(screensList.VerifyCredential.label);
            }}
            text={t.BUTTON_TEXT}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  username: state.userRegister.username,
  email: state.userRegister.email,
});

const mapDispatchToProps = _.curry(bindActionCreators)({
  updateUserRegisterInfo: userRegisterAction.update,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateAccountScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Header.HEIGHT + 50,
    backgroundColor: 'white',
  },
  titleContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    padding: 30,
    fontSize: AppStyle.fontMiddleBig,
    color: AppStyle.lightGrey,
  },
  inputContainer: {
    flex: 2,
  },
  hint: {
    flex: 2,
    padding: 30,
    fontSize: AppStyle.fontMiddle,
    color: AppStyle.lightGrey,
    fontFamily: AppStyle.coverFont,
  },
  button: {
    flex: 2,
  },
});

const t = {
  CREATE_ACCOUNT_TITLE: 'Create your account',
  USERNAME_PLACEHOLDER: 'Name',
  EMAIL_PLACEHOLDER: 'Email',
  HINT_TEXT:
    'By signing up, you agree to the Terms of Service and Privacy Policy, including Cookie Use. Others will be able to find you by email when provided. ',
  BUTTON_TEXT: 'Sign Up',
  USERNAME_ERROR: 'should only contain digits and letters',
  EMAIL_ERROR: 'Not a valid email address',
};
