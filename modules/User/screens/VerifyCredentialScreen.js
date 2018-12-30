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

const mock = {
  email: '754611',
};

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
  };

  render() {
    const validator = () => true;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>{t.TITLE}</Text>
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
        <Text style={styles.resend}>{t.RESEND}</Text>
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
  SUBTITLE: 'We have sent your verification code to davidfan@gmail.com',
  PLACEHOLDER: 'Verification Code',
  BUTTON_TEXT: 'Next',
  RESEND: 'Didn’t receive email?',
  ERROR_MESSAGE: 'Invalid Verification Code',
};
