import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, TextInput, View, Platform, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AppStyle from '../../../commons/AppStyle';

export default class InputWithValidation extends React.Component {
  static propTypes = {
    onChangeText: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    validator: PropTypes.func,
    isPassword: PropTypes.bool,
    errorMessage: PropTypes.string,
  };

  static defaultProps = {
    validator: () => true,
    placeholder: 'please input',
    isPassword: false,
    errorMessage: 'Input Error'
  };

  renderIcon(isValidated){
    const { errorMessage, value} = this.props
    // if (value !== '')
    //   return null;
    if(isValidated){
      return <View style={styles.iconContainer}>
        <Ionicons name="ios-checkmark-circle-outline" size={32} color={AppStyle.userCorrect} />
      </View>
    } else {
      return <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{errorMessage}</Text>
      </View>
    }
  }

  render() {
    const { onChangeText, value, placeholder, validator, isPassword, errorMessage } = this.props;
    const isValidated = validator();
    const fontColor = isValidated ? AppStyle.userCorrect : AppStyle.lightGrey;

    return (
      <View style={styles.container}>
        <TextInput
          style={[styles.input, { color: fontColor }]}
          secureTextEntry={isPassword}
          onChangeText={onChangeText}
          placeholderTextColor={AppStyle.inputPlaceholder}
          onBlur={validator}
          value={value}
          placeholder={placeholder}
        />
        {this.renderIcon(isValidated)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 50,
    paddingVertical: 10,
    ...Platform.select({
      ios: {
        borderBottomWidth: 1,
        borderBottomColor: AppStyle.lightGrey,
      },
    }),
  },
  input: {
    flex: 5,
    fontSize: AppStyle.fontMiddle,
  },
  iconContainer: {
    flex: 1,
  },
  errorContainer: {
    position: 'absolute',
    alignSelf: 'flex-end',
    left: 0,
    right: 0,
    height: 30,
    bottom: -30,
    justifyContent: 'center',
    alignItems: 'flex-end',
    // backgroundColor: 'yellow',
  },
  errorText: {
    fontSize: AppStyle.fontMiddleSmall,
    color: AppStyle.userIncorrect,
  }
});
