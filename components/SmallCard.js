import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
  Image,
  Dimensions,
  Platform,
} from 'react-native';
import PropTypes from 'prop-types';
import AppStyle from '../commons/AppStyle';
import Images from '../commons/Images';

const { width, height } = Dimensions.get('window');
const isSmallScreen = height < 569;

export default class SmallCard extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    imageCard: PropTypes.number.isRequired,
    titleTextStyle: PropTypes.object,
    subtitleTextStyle: PropTypes.object,
    onPress: PropTypes.func,
    style: PropTypes.object,
  };

  static defaultProps = {
    titleTextStyle: {},
    subtitleTextStyle: {},
    imageBackground: null,
    onPress: () => {},
    style: {},
    imageBackgroundStyle: {},
    subtitle: '',
  };

  render() {
    const {
      title,
      subtitle,
      imageCard,
      titleTextStyle,
      subtitleTextStyle,
      onPress,
      style,
    } = this.props;
    const styleImage = isSmallScreen ? { height: height * 0.2 } : {};
    return (
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={[styles.container, style]}>
          <View
            style={{
              justifyContent: 'center',
              maxWidth: width - 150,
            }}>
            <Text style={[styles.title, titleTextStyle]}>{title}</Text>
            {subtitle !== '' && (
              <Text style={[styles.subtitle, subtitleTextStyle]}>{subtitle}</Text>
            )}
          </View>
          <View style={[styles.imageContainer, styleImage]}>
            <Image resizeMode="contain" style={styles.image} source={imageCard} />
            <View style={styles.overlay} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 30,
    paddingHorizontal: 15,
    width: width - 30,
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 20,
    backgroundColor: 'white',
    borderRadius: 14,
    margin: 5,
    elevation: 4,
  },
  title: {
    fontFamily: 'OpenSans-Bold',
    fontSize: AppStyle.fontMiddleBig,
    color: 'black',
  },
  subtitle: {
    fontFamily: Platform.OS === 'ios' ? 'OpenSans' : 'OpenSans-Regular',
    fontSize: isSmallScreen ? 10 : 12,
    color: AppStyle.lightGrey,
  },
});
