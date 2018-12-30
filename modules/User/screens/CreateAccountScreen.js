import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import AppStyle from '../../../commons/AppStyle';
import { screensList } from '../../../navigation/screensList';
import InputWithValidation from "../components/InputWithValidation";
import { Header } from 'react-navigation';
import GenesisButton from "../../../components/GenesisButton";

const mock = {
  username: 'alex',
  email: 'alexcloud@gmail.com'
}

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
  };

  get isAllValidated(){
    return true
  }

  render() {
    return <View style={styles.container}>
      <View style={styles.titleContainer}>
      <Text style={styles.title}>{t.CREATE_ACCOUNT_TITLE}</Text>
      </View>
      <View style={styles.inputContainer}>
        <InputWithValidation onChangeText={()=>{}} value={mock.username} placeholder={t.USERNAME_PLACEHOLDER}/>
      </View>
      <View style={styles.inputContainer}>
        <InputWithValidation onChangeText={()=>{}} value={mock.email} placeholder={t.PASSWORD_PLACEHOLDER}/>
      </View>
      <Text style={styles.hint}>{t.HINT_TEXT}</Text>
      <View style={styles.button}>
        <GenesisButton action={()=>{}} text={t.BUTTON_TEXT} disabled={!this.isAllValidated}/>
      </View>
    </View>;
  }
}

const mapStateToProps = state => ({
  walletAddress: state.walletAddress,
});

const mapDispatchToProps = _.curry(bindActionCreators)({});

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
  }
});

const t = {
  CREATE_ACCOUNT_TITLE: 'Create your account',
  USERNAME_PLACEHOLDER: 'Name',
  PASSWORD_PLACEHOLDER: 'Email',
  HINT_TEXT: 'By signing up, you agree to the Terms of Service and Privacy Policy, including Cookie Use. Others will be able to find you by email when provided. ',
  BUTTON_TEXT: 'Sign Up'
}
