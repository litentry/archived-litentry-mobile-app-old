import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Header } from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

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
        <KeyboardAwareScrollView
          style={styles.scroll}
          contentContainerStyle={{ flexGrow: 1 }}
          nestedScrollEnabled>
          <View style={[styles.container, style]}>{children}</View>
        </KeyboardAwareScrollView>
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
