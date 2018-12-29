import React from 'react';
import { Text, View, StyleSheet, TextInput } from 'react-native';
import PropTypes from 'prop-types';
import AppStyle from '../../../commons/AppStyle';

export default class SingleInput extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    onChangeText: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    isPassword: PropTypes.bool,
  };

  static defaultProps = {
    placeholder: 'a default placeholder',
    isPassword: false,
  };

  render() {
    const { title, onChangeText, value, placeholder, isPassword } = this.props;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <TextInput
          secureTextEntry={isPassword}
          style={styles.input}
          onChangeText={onChangeText}
          value={value}
          placeholder={placeholder}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
  },
  title: {
    flex: 2,
    fontSize: AppStyle.fontMiddleSmall,
    color: 'black',
  },
  input: {
    flex: 3,
    fontSize: AppStyle.fontMiddleSmall,
  },
});
