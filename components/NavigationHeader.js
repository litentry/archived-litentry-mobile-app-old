import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Header } from 'react-navigation';
import AppStyle from '../commons/AppStyle';

// Archived component, Not used in our first version

export default class NavigationHeader extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    action: PropTypes.func,
  };

  static defaultProps = {
    action: () => {},
    backgroundColor: AppStyle.backgroundColor,
  };

  render() {
    const { title, action } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.centerTitle}>{title}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',

    fontFamily: AppStyle.mainFont,
  },
  backButton: {},
  centerTitle: {
    alignSelf: 'center',
    fontSize: AppStyle.fontMiddle,
  },
  actionButton: {},
});
