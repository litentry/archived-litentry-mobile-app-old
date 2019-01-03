import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { Header } from 'react-navigation';
import AppStyle from '../../../commons/AppStyle';
import InputWithValidation from '../components/InputWithValidation';
import GenesisButton from '../../../components/GenesisButton';
import Connector from '../../Chat/components/Connector';
import TinodeAPI from '../../Chat/TinodeAPI';
import {screensList} from "../../../navigation/screensList";

class LoginScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTransparent: true,
    headerTintColor: AppStyle.userCancelGreen,
    headerStyle: {
      backgroundColor: AppStyle.userHeaderBackgroundColor,
    },
  });

  static propTypes = {
    navigation: PropTypes.object,
    token: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      username: 'bob',
      password: 'bob123',
    };
  }

  componentDidMount() {
    console.log('token is', this.props.token);
  }

  render() {
    const { username, password } = this.state;
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <Connector />
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
              TinodeAPI.login(username, password, null, navigation);
            }}
            text={t.BUTTON_TEXT}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  walletAddress: state.walletAddress,
  loginToken: state.appState.loginToken,
});

const mapDispatchToProps = _.curry(bindActionCreators)({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Header.HEIGHT + 50,
    backgroundColor: 'white',
    justifyContent: 'center',
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
};
