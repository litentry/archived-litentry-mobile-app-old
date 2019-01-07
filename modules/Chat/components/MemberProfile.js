import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Image, Text } from 'react-native';
import AppStyle from '../../../commons/AppStyle';

export default class MemberProfile extends React.Component {
  static propTypes = {
    imageSource: PropTypes.oneOfType([PropTypes.number, PropTypes.object]).isRequired,
    title: PropTypes.string.isRequired,
  };

  static defaultProps = {};

  render() {
    const {imageSource, title} = this.props;
    return <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={imageSource}/>
      </View>
      <Text style={styles.title} numberOfLines={1}>{title}</Text>
    </View>;
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    flexDirection: 'column',
    width: 50,
    justifyContent: 'center'
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
  title: {
    width: 50,
    marginTop: 5,
    textAlign: 'center',
    fontSize: AppStyle.fontSmall,
    color: AppStyle.lightGrey,
    fontFamily: AppStyle.mainFont,
  }
});
