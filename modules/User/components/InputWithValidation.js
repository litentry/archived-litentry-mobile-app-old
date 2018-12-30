import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, TextInput, View, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AppStyle from '../../../commons/AppStyle';

export default class InputWithValidation extends React.Component {
  static propTypes = {
    onChangeText: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    validator: PropTypes.func,
    isPassword: PropTypes.bool,
  };

  static defaultProps = {
    validator: () => true,
    placeholder: 'please input',
    isPassword: false,
  };

  render() {
    const { onChangeText, value, placeholder, validator, isPassword } = this.props;
    const isValidated = validator();
    const fontColor = isValidated ? AppStyle.userCorrect : AppStyle.userIncorrect;

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
        {isValidated && value !== '' && (
          <View style={styles.iconContainer}>
            <Ionicons name="ios-checkmark-circle-outline" size={32} color={AppStyle.userCorrect} />
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
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
});
