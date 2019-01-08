import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import AppStyle from '../commons/AppStyle';

export default class SingleSectionDisplay extends React.Component {
  static propTypes = {
    onClick: PropTypes.func,
    title: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    style: PropTypes.object,
  };

  static defaultProps = {
    onClick: null,
    object: {},
  };

  render() {
    const { title, value, onClick, style } = this.props;

    if (!onClick) {
      return (
        <View style={[styles.container, style]}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.valueContainer}>
            <Text style={styles.valueText}>{value}</Text>
          </View>
        </View>
      );
    }

    return (
      <TouchableOpacity onPress={onClick} style={[styles.container, style]}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.valueContainer}>
          <Text style={styles.valueText}>{value}</Text>
          <AntDesign
            name="right"
            style={styles.valueIcon}
            size={AppStyle.fontMiddle}
            color={AppStyle.lightGrey}
          />
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
  },
  title: {
    alignSelf: 'flex-start',
    fontSize: AppStyle.fontMiddle,
    color: 'black',
  },
  valueContainer: {
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  valueText: {
    flexGrow: 1,
    textAlign: 'left',
    fontSize: AppStyle.fontMiddle,
    color: AppStyle.lightGrey,
  },
  valueIcon: {
    paddingLeft: 10,
  },
});
