import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AppStyle from '../commons/AppStyle';

export default class HeaderButton extends React.Component {
  static propTypes = {
    onPress: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    color: PropTypes.string,
  };

  static defaultProps = {
    color: 'black',
  };

  render() {
    const { title, onPress, color } = this.props;
    return (
      <TouchableOpacity style={styles.headerButton} onPress={() => onPress()}>
        <Text style={[styles.headerButtonText, { color }]}>{title}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  headerButton: {
    backgroundColor: 'transparent',
  },
  headerButtonText: {
    fontSize: AppStyle.fontMiddleSmall,
    padding: 5,
    fontFamily: AppStyle.mainFont,
    color: 'black',
  },
});
