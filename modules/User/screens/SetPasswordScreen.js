import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { Header } from 'react-navigation';
import AppStyle from '../../../commons/AppStyle';
import InputWithValidation from '../components/InputWithValidation';
import GenesisButton from '../../../components/GenesisButton';
import {passwordRegex} from "../../../utils/regexUtils";
import {userRegisterAction} from "../actions/userRegiseterActions";
import {screensList} from "../../../navigation/screensList";

class SetPasswordScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerBackTitle: '',
    headerTransparent: true,
    headerTintColor: AppStyle.userCancelGreen,
    headerStyle: {
      backgroundColor: AppStyle.userHeaderBackgroundColor,
    },
  });

  constructor(props){
    super(props)
    this.state = {
      isSet: false,
      repeatPassword: '',
    }
  }

  static propTypes = {
    navigation: PropTypes.object,
    password: PropTypes.string.isRequired,
    updateUserRegisterInfo: PropTypes.func.isRequired,
  };

  render() {
    const { password, updateUserRegisterInfo, navigation} = this.props;
    const { isSet, repeatPassword } = this.state;
    const validator = () => isSet ? repeatPassword === password : passwordRegex.test(password)
    const onPress = () => isSet ? navigation.navigate(screensList.UploadProfile.label) : this.setState({isSet: true})

    return (
      <View style={styles.container}>
        <Text style={styles.title}>{isSet ? t.REPEAT_TITLE : t.TITLE}</Text>
        <Text style={styles.subtitle}>{t.SUBTITLE}</Text>
        <View style={styles.inputContainer}>
          <InputWithValidation
            onChangeText={(input) => {
              isSet ? this.setState({repeatPassword: input}) : updateUserRegisterInfo({password: input})
            }}
            isPassword={true}
            value={isSet ? repeatPassword : password}
            validator={validator}
            placeholder={t.PLACEHOLDER}
            errorMessage={isSet ? t.REPEAT_ERROR : t.ERROR_MESSAGE }
          />
        </View>
        {isSet && <TouchableOpacity onPress={()=>this.setState({isSet:false})} style={styles.reset}>
          <Text style={styles.resetText}>{t.RESET}</Text>
        </TouchableOpacity>}
        <View style={styles.button}>
          <GenesisButton disabled={!validator()} action={onPress} text={t.BUTTON_TEXT} />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  password: state.userRegister.password,
});

const mapDispatchToProps = _.curry(bindActionCreators)({
  updateUserRegisterInfo: userRegisterAction.update,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SetPasswordScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Header.HEIGHT + 50,
    backgroundColor: AppStyle.userBackgroundColor,
    alignItems: 'stretch'
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
  reset: {
    paddingVertical: 30,
  },
  resetText: {
    textAlign: 'center',
    fontFamily: AppStyle.coverFont,
    color: AppStyle.userCancelGreen,
  }
});

const t = {
  TITLE: 'Set a password',
  REPEAT_TITLE: 'Repeat the password',
  SUBTITLE: 'Make sure it’s 6 characters or more.',
  BUTTON_TEXT: 'Next',
  PLACEHOLDER: 'Password',
  ERROR_MESSAGE: 'Sorry, this password is too weak',
  REPEAT_ERROR: 'this password is not the same as before',
  RESET: 'reset the password',
};
