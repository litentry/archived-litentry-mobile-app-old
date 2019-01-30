import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import AppStyle from '../../../commons/AppStyle';

export default class AppShowcase extends React.Component {
  static propTypes = {
    imageSource: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
  };

  static defaultProps = {};

  render() {
    const {imageSource, title, description, onPress} = this.props
    return <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={imageSource}/>
        <Text style={styles.titleText}>{title}</Text>
      </View>
      <Text style={styles.descriptionText}>{description}</Text>
    </TouchableOpacity>;
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 150,
    borderBottomColor: AppStyle.lightGrey,
    borderBottomWidth: 1,
  },
  imageContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 50,
    width: 50,
    resizeMode: 'contain',
  },
  titleText: {
    paddingTop: 10,
    color: AppStyle.lightGrey,
    fontSize: AppStyle.fontMiddleSmall,
    fontFamily: AppStyle.mainFont,
  },
  descriptionText: {
    flex: 3,
    color: AppStyle.lightGrey,
    fontSize: AppStyle.fontMiddleSmall,
    fontFamily: AppStyle.mainFont,
  },
});
