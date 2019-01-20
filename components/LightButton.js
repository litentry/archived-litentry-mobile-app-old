import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import AppStyle from '../commons/AppStyle';

export default class LightButton extends React.Component {
  static propTypes = {
    onPress: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
  };

  static defaultProps = {};

  render() {
    const { onPress, text } = this.props;
    return (
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <Text style={styles.buttonText}>{text}</Text>
        <AntDesign
          name="right"
          size={AppStyle.fontMiddle}
          style={styles.rightArrowIcon}
          color={AppStyle.lightGrey}
        />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: AppStyle.mainFont,
    color: AppStyle.lightGrey,
    fontSize: AppStyle.fontMiddleSmall,
  },
  rightArrowIcon: {
    paddingLeft: 10,
  },
});
