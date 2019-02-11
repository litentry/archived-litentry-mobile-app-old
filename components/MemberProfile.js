import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import AppStyle from '../commons/AppStyle';
import { screensList } from '../navigation/screensList';

class MemberProfile extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    imageSource: PropTypes.oneOfType([PropTypes.number, PropTypes.object]).isRequired,
    title: PropTypes.string.isRequired,
    raw: PropTypes.object,
  };

  static defaultProps = {};

  render() {
    const { imageSource, title, navigation, raw } = this.props;
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          if (raw) {
            navigation.navigate(screensList.MemberInfo.label, { raw, imageSource, title });
          }
        }}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={imageSource} />
        </View>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  }
}

export default withNavigation(MemberProfile);

const styles = StyleSheet.create({
  container: {
    margin: 10,
    flexDirection: 'column',
    width: 50,
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
  title: {
    width: 50,
    marginTop: 5,
    textAlign: 'center',
    fontSize: AppStyle.fontSmall,
    color: AppStyle.lightGrey,
    fontFamily: AppStyle.mainFont,
  },
});
