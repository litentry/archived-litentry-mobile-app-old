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
    width: 40,
    justifyContent: 'center'
  },
  imageContainer: {
    height: 30,
    width: 30,
    margin:5,
  },
  image: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
  },
  title: {
    width: 30,
    marginHorizontal: 10,
    marginVertical: 5,
    textAlign: 'center',
    fontSize: AppStyle.fontSmall,
    color: AppStyle.lightGrey,
    fontFamily: AppStyle.mainFont,
  }
});
