import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import AppStyle from '../../../commons/AppStyle';
import Images from '../../../commons/Images';
import { screensList } from '../../../navigation/screensList';

class ActionList extends React.Component {
  static propTypes = {
    show: PropTypes.bool.isRequired,
    navigation: PropTypes.object.isRequired,
  };

  static defaultProps = {};

  renderList() {
    const { navigation } = this.props;
    const dappList = [
      {
        name: 'vote',
        imageSource: Images.vote,
        action: () => navigation.navigate(screensList.VoteInfo.label),
      },
      // TODO disable App Store now.
      // {
      //   name: 'AppStore',
      //   imageSource: Images.appStore,
      //   action: () => {
      //     navigation.navigate(screensList.AppStore.label);
      //   },
      // },
    ];

    return dappList.map(item => (
      <TouchableOpacity style={styles.dappContainer} key={item.name} onPress={item.action}>
        <View style={styles.imageContainer}>
          <Image source={item.imageSource} style={styles.image} />
        </View>
        <Text style={styles.text}>{item.name}</Text>
      </TouchableOpacity>
    ));
  }

  render() {
    if (!this.props.show) return null;
    return <View style={styles.container}>{this.renderList()}</View>;
  }
}

export default withNavigation(ActionList);

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
