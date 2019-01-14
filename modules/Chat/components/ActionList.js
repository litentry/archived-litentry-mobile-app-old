import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Image, Text } from 'react-native';
import AppStyle from '../../../commons/AppStyle';
import Images from '../../../commons/Images';

const dappList = [
  {
    name: 'vote',
    imageSource: Images.vote,
    action: () => {},
  },
  {
    name: 'AppStore',
    imageSource: Images.appStore,
    action: () => {},
  },
];

export default class ActionList extends React.Component {
  static propTypes = {
    show: PropTypes.bool.isRequired,
  };

  static defaultProps = {};

  renderList() {
    return dappList.map(item => (
      <View style={styles.dappContainer} key={item.name}>
        <View style={styles.imageContainer}>
          <Image source={item.imageSource} style={styles.image} />
        </View>
        <Text style={styles.text}>{item.name}</Text>
      </View>
    ));
  }

  render() {
    if (!this.props.show) return null;
    return <View style={styles.container}>{this.renderList()}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 50,
  },
  dappContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: 10,
  },
  imageContainer: {
    height: 60,
    width: 60,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
  },
  text: {
    fontFamily: AppStyle.mainFont,
    fontSize: AppStyle.fontMiddleSmall,
    color: AppStyle.lightGrey,
  },
});
