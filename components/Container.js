import React from 'react';
import PropTypes from 'prop-types';
import {ScrollView, StyleSheet, View} from 'react-native';

export default class Container extends React.Component {
  static propTypes = {
    style: PropTypes.object,
  };
  
  static defaultProps = {
    style: {},
  };
  
  render() {
    const { children, style } = this.props;
    return  <View style={styles.rootContainer} nestedScrollEnabled={true}>
      <ScrollView style={styles.scroll} contentContainerStyle={{flexGrow: 1}} nestedScrollEnabled={true}>
        <View style={[styles.container, style]}>
          { children }
        </View>
      </ScrollView>
    </View>;
  }
}

const styles = StyleSheet.create({
  rootContainer: {
    flex:1,
    paddingTop: 50,
  },
  scroll: {
    flex:1,
  },
  container: {
    backgroundColor: 'white',
    height: '100%',
    flex: 1,
  },
});
