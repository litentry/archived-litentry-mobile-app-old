import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, TouchableOpacity, View, Image, Text } from 'react-native';
import AppStyle from '../../../commons/AppStyle';

export default class SingleProfile extends React.Component {
  static propTypes = {
    imageSource: PropTypes.oneOfType([PropTypes.number, PropTypes.object]).isRequired,
    info: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    fontColor: PropTypes.string,
    onPress: PropTypes.func,
  };

  static defaultProps = {
    fontColor: AppStyle.lightGrey,
    onPress: () => {},
  };

  render() {
    const { imageSource, info, name, fontColor, onPress } = this.props;
    return (
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <View style={styles.profileContainer}>
          <View style={styles.imageContainer}>
            <Image source={imageSource} style={styles.image} />
          </View>
          <Text style={styles.nameText}>{name}</Text>
        </View>
        <Text style={[styles.infoText, { color: fontColor }]}>{info}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    height: 50,
    width: 50,
  },
  image: {
    height: 50,
    width: 50,
    resizeMode: 'contain',
  },
  nameText: {
    fontFamily: AppStyle.mainFont,
    fontSize: AppStyle.fontMiddleSmall,
    color: 'black',
    paddingLeft: 20,
  },
  infoText: {
    fontFamily: AppStyle.mainFont,
    fontSize: AppStyle.fontMiddleSmall,
  },
});
