import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import AppStyle from '../../../commons/AppStyle';

export default class SingleLineDisplay extends React.Component {
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

  renderTouchable = (value, onClick) => (
    <TouchableOpacity onPress={onClick} style={styles.touchable}>
      <Text style={styles.touchableText}>{value}</Text>
      <AntDesign
        name="right"
        size={AppStyle.fontMiddle}
        style={styles.touchableIcon}
        color={AppStyle.lightGrey}
      />
    </TouchableOpacity>
  );

  render() {
    const { title, value, onClick, style } = this.props;

    return (
      <View style={[styles.container, style]}>
        <Text style={styles.title}>{title}</Text>
        {onClick ? this.renderTouchable(value, onClick) : <Text style={styles.value}>{value}</Text>}
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
    marginTop: 20,
  },
  title: {
    flex: 2,
    fontSize: AppStyle.fontMiddle,
    color: 'black',
  },
  value: {
    textAlign: 'right',
    flex: 3,
    fontSize: AppStyle.fontMiddle,
    color: AppStyle.lightGrey,
  },
  touchable: {
    flex: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  touchableText: {
    textAlign: 'right',
    fontSize: AppStyle.fontMiddle,
    color: AppStyle.lightGrey,
  },
  touchableIcon: {
    paddingLeft: 10,
  },
});
