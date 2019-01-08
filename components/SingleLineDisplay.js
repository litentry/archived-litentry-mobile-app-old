import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import AppStyle from '../commons/AppStyle';

export default class SingleLineDisplay extends React.Component {
  static propTypes = {
    onClick: PropTypes.func,
    title: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    style: PropTypes.object,
    Icon: PropTypes.element,
  };

  static defaultProps = {
    onClick: null,
    object: {},
    Icon: null,
  };

  renderTitle() {
    const { Icon, title } = this.props;
    if (!Icon) {
      return <Text style={styles.title}>{title}</Text>;
    }
    return (
      <View style={styles.title}>
        <Icon style={styles.icon} />
        <Text style={styles.title}>{title}</Text>
      </View>
    );
  }

  render() {
    const { title, value, onClick, style } = this.props;

    if (!onClick) {
      return (
        <View style={[styles.container, style]}>
          {this.renderTitle()}
          <Text style={styles.value}>{value}</Text>
        </View>
      );
    }

    return (
      <TouchableOpacity onPress={onClick} style={[styles.container, style]}>
        {this.renderTitle()}
        <View style={styles.valueContainer}>
          <Text style={styles.value}>{value}</Text>
          <AntDesign
            name="right"
            size={AppStyle.fontMiddle}
            style={styles.valueIcon}
            color={AppStyle.lightGrey}
          />
        </View>
      </TouchableOpacity>
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
  titleContainer: {
    flex: 2,
  },
  icon: {
    paddingRight: 10,
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
  valueContainer: {
    flex: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  valueText: {
    textAlign: 'right',
    fontSize: AppStyle.fontMiddle,
    color: AppStyle.lightGrey,
  },
  valueIcon: {
    paddingLeft: 10,
  },
});
