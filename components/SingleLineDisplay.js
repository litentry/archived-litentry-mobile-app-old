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
    Icon: PropTypes.func,
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
      <View style={styles.titleContainer}>
        <Icon style={styles.icon} />
        <Text style={styles.title}>{title}</Text>
      </View>
    );
  }

  render() {
    const { value, onClick, style } = this.props;
    const valueContainerFlex = value.trim() === '' ? 1 : 3;

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
        <View style={[styles.valueContainer, { flex: valueContainerFlex }]}>
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
    flexDirection: 'row',
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
