import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { Header } from 'react-navigation';
import AppStyle from '../../../commons/AppStyle';
import InputWithValidation from '../components/InputWithValidation';
import GenesisButton from '../../../components/GenesisButton';

import TinodeAPI from '../../Chat/TinodeAPI';
import { screensList } from '../../../navigation/screensList';
import ContinueLoginInnerScreen from './StartScreen';
import Container from '../../../components/Container';

class LoginScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTransparent: true,
    headerTintColor: AppStyle.userCancelGreen,
    headerStyle: {
      backgroundColor: AppStyle.userHeaderBackgroundColor,
    },
    headerLeft: null,
  });

  static propTypes = {
    navigation: PropTypes.object,
    oldUserId: PropTypes.string.isRequired,

    isLoaded: PropTypes.bool.isRequired,
    loginToken: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      username: 'bob',
      password: 'bob123',
    };
  }

  render() {
    const { username, password } = this.state;
    const { navigation, oldUserId } = this.props;

    // TODO this part is the same as start screen
    const { isLoaded, loginToken } = this.props;

    if (isLoaded && !_.isEmpty(loginToken)) {
      return <ContinueLoginInnerScreen />;
    }

    return (
      <Container hasPadding style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{t.LOGIN_TITLE}</Text>
        </View>
        <View style={styles.inputContainer}>
          <InputWithValidation
            onChangeText={username => this.setState({ username })}
            value={username}
            placeholder={t.USERNAME_PLACEHOLDER}
          />
        </View>
        <View style={styles.inputContainer}>
          <InputWithValidation
            onChangeText={password => this.setState({ password })}
            value={password}
            isPassword
            placeholder={t.PASSWORD_PLACEHOLDER}
          />
          <TouchableOpacity onPress={() => {}} style={styles.forgetTextContainer}>
            <Text style={styles.forgetText}>{t.FORGET_TEXT}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.button}>
          <GenesisButton
            action={() => {
              TinodeAPI.login(username, password, oldUserId, null, null, navigation);
            }}
            text={t.BUTTON_TEXT}
          />
          <GenesisButton
            action={() => {
              navigation.navigate(screensList.CreateAccount.label);
            }}
            text={t.REGISTER}
          />
        </View>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  walletAddress: state.appState.walletAddress,
  oldUserId: state.appState.userId,

  loginToken: state.appState.loginToken,
  isLoaded: state.appState.isLoaded,
});

const mapDispatchToProps = _.curry(bindActionCreators)({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
  },
  titleContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    padding: 30,
    fontSize: AppStyle.fontMiddleBig,
    color: AppStyle.lightGrey,
  },
  inputContainer: {
    flex: 2,
  },
  forgetTextContainer: {},
  forgetText: {
    padding: 30,
    textAlign: 'right',
    fontFamily: AppStyle.coverFont,
    color: AppStyle.userCancelGreen,
  },
  button: {
    flex: 2,
  },
});

const t = {
  LOGIN_TITLE: 'Login',
  USERNAME_PLACEHOLDER: 'Name',
  PASSWORD_PLACEHOLDER: 'Password',
  FORGET_TEXT: 'Forget password?',
  BUTTON_TEXT: 'Log in',
  REGISTER: 'New account',
};
