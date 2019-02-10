import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Header } from 'react-navigation';

export default class Container extends React.Component {
  static propTypes = {
    style: PropTypes.object,
    hasPadding: PropTypes.bool,
    children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  };

  static defaultProps = {
    style: {},
    hasPadding: false,
  };

  render() {
    const { children, style, hasPadding } = this.props;
    return (
      <View
        style={[styles.rootContainer, { paddingTop: hasPadding ? Header.HEIGHT : 0 }]}
        nestedScrollEnabled>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={{ flexGrow: 1 }}
          nestedScrollEnabled>
          <View style={[styles.container, style]}>{children}</View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  container: {
    backgroundColor: 'white',
    height: '100%',
    flex: 1,
  },
});
