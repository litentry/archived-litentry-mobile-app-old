import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text } from 'react-native';
import AppStyle from '../../../commons/AppStyle';

export default class MultiLineDisplay extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    list: PropTypes.array.isRequired,
    style: PropTypes.object,
  };

  static defaultProps = {
    style: {},
  };

  render() {
    const { title, list, style } = this.props;

    const listItems = list.map((item, index) => (
      <Text style={styles.listItem} key={title + index}>
        {item}
      </Text>
    ));

    return (
      <View style={[styles.container, style]}>
        <View>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={styles.list}>{listItems}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  title: {
    fontWeight: 'bold',
    color: AppStyle.lightGrey,
    fontSize: AppStyle.fontMiddleSmall,
  },
  list: {},
  listItem: {
    marginTop: 10,
    color: AppStyle.lightGrey,
    fontSize: AppStyle.fontMiddleSmall,
  },
});
