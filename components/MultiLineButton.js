import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import AppStyle from '../commons/AppStyle';

export default class MultiLineButton extends React.Component {
  static propTypes = {
    renderList: PropTypes.array.isRequired,
    onPress: PropTypes.func.isRequired,
  };

  static defaultProps = {};

  render() {
    const { renderList, onPress } = this.props;

    const VoteRow = props => (
      <View style={styles.row}>
        <Text style={styles.titleText}>{props.title}</Text>
        <Text style={styles.valueText}>{props.value}</Text>
      </View>
    );

    return (
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <View style={styles.textContainer}>
          {renderList.map((item, index) => (
            <VoteRow title={item.title} value={item.value} key={index} />
          ))}
        </View>
        <AntDesign
          name="right"
          size={AppStyle.fontMiddle}
          style={styles.icon}
          color={AppStyle.lightGrey}
        />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: 20,
  },
  row: {
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  titleText: {
    fontFamily: AppStyle.mainFont,
    color: AppStyle.lightGrey,
    fontSize: AppStyle.fontMiddleSmall,
  },
  valueText: {
    fontFamily: AppStyle.mainFontBold,
    color: AppStyle.lightGrey,
    fontSize: AppStyle.fontMiddleSmall,
  },
  icon: {
    paddingLeft: 10,
  },
});
