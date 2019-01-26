import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { Header } from 'react-navigation';
import AppStyle from '../../../commons/AppStyle';
import InputWithValidation from '../components/InputWithValidation';
import GenesisButton from '../../../components/GenesisButton';
import { userRegisterAction } from '../actions/userRegiseterActions';
import { screensList } from '../../../navigation/screensList';

class VerifyCredentialScreen extends React.Component {
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
    updateUserRegisterInfo: PropTypes.func.isRequired,
    email: PropTypes.string.isRequired,
    emailCredential: PropTypes.string.isRequired,
  };

  render() {
    const { email, updateUserRegisterInfo, emailCredential, navigation } = this.props;
    const validator = () => true;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>{t.TITLE}</Text>
        <Text style={styles.subtitle}>{t.SUBTITLE + email}</Text>
        <View style={styles.inputContainer}>
          <InputWithValidation
            onChangeText={emailCredential => {
              updateUserRegisterInfo({ emailCredential });
            }}
            value={emailCredential}
            validator={validator}
            placeholder={t.PLACEHOLDER}
            errorMessage={t.ERROR_MESSAGE}
          />
        </View>
        <View style={styles.button}>
          <GenesisButton
            disabled={!validator(emailCredential)}
            action={() => {
              navigation.navigate(screensList.SetPassword.label);
            }}
            text={t.BUTTON_TEXT}
          />
        </View>
        <Text style={styles.resend}>{t.RESEND}</Text>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  walletAddress: state.appState.walletAddress,
  email: state.userRegister.email,
  emailCredential: state.userRegister.emailCredential,
});

const mapDispatchToProps = _.curry(bindActionCreators)({
  updateUserRegisterInfo: userRegisterAction.update,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VerifyCredentialScreen);

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
  resend: {
    paddingVertical: 30,
    textAlign: 'center',
    marginTop: 'auto',
    fontFamily: AppStyle.coverFont,
    color: AppStyle.userCancelGreen,
  },
});

const t = {
  TITLE: 'Verify Email',
  SUBTITLE: 'We have sent your verification code to ',
  PLACEHOLDER: 'Verification Code',
  BUTTON_TEXT: 'Next',
  RESEND: 'Didn’t receive email?',
  ERROR_MESSAGE: 'Invalid Verification Code',
};
