import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import AppStyle from '../commons/AppStyle';

export default class SingleLineSingleValueDisplay extends React.Component {
  static propTypes = {
    onClick: PropTypes.func,
    title: PropTypes.string.isRequired,
    style: PropTypes.object,
    Icon: PropTypes.func,
    fontSize: PropTypes.number,
  };

  static defaultProps = {
    onClick: null,
    object: {},
    Icon: null,
    fontSize: AppStyle.fontMiddle,
  };

  renderTitle() {
    const { Icon, title, fontSize } = this.props;
    const fontSizeObject = { fontSize };
    if (!Icon) {
      return <Text style={[styles.title, fontSizeObject]}>{title}</Text>;
    }
    return (
      <View style={styles.titleContainer}>
        <Icon style={styles.icon} />
        <Text style={[styles.title, { paddingLeft: 10 }, fontSizeObject]}>{title}</Text>
      </View>
    );
  }

  render() {
    const { onClick, style } = this.props;

    if (!onClick) {
      return <View style={[styles.container, style]}>{this.renderTitle()}</View>;
    }

    return (
      <TouchableOpacity onPress={onClick} style={[styles.container, style]}>
        {this.renderTitle()}
        <View style={styles.arrowContainer}>
          <AntDesign
            name="right"
            size={AppStyle.fontMiddle}
            style={styles.arrowIcon}
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
    alignItems: 'center',
    flexDirection: 'row',
  },
  icon: {
    marginRight: 10,
  },
  title: {
    flex: 2,
    color: 'black',
  },
  arrowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  arrowIcon: {
    paddingLeft: 10,
  },
});
