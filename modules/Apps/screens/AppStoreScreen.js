import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import AppStyle from '../../../commons/AppStyle';
import { screensList } from '../../../navigation/screensList';
import { AntDesign } from '../../../InnerScreens/components';
import Images from '../../../commons/Images';
import appList from '../appList';
import AppShowcase from '../components/AppShowcase';

class AppStoreScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: screensList.AppStore.title,
    headerBackTitle: '',
  });

  static propTypes = {
    navigation: PropTypes.object,
  };

  render() {
    const { navigation } = this.props;
    return (
      <ScrollView style={styles.container}>
        <View style={styles.introContainer}>
          <View style={styles.imageContainer}>
            <Image source={Images.appStore} style={styles.introIcon} />
          </View>
          <Text style={styles.introText}>
            {t.INTRO}
            <Text style={styles.introText} onPress={() => {}}>
              {t.LINK}
            </Text>
          </Text>
        </View>
        <View style={styles.listContainer}>
          {_.values(appList)
            .filter(item => !item.enabled)
            .map(item => (
              <AppShowcase
                imageSource={item.imageSource}
                title={item.title}
                description={item.description}
                key={item.title}
                onPress={() =>
                  navigation.navigate(screensList.AppProfile.label, {
                    title: item.title,
                  })
                }
              />
            ))}
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  walletAddress: state.appState.walletAddress,
});

const mapDispatchToProps = _.curry(bindActionCreators)({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppStoreScreen);

const t = {
  INTRO:
    'Anyone can develop an app and have it list in GS app store freely. ' +
    'There is no quality control of any sort. Please use with extremely caution.' +
    ' Please submit your own apps please click',
  LINK: 'here',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppStyle.mainBackgroundColor,
  },
  introContainer: {
    marginVertical: 10,
    padding: 10,
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  introIcon: {
    height: 50,
    width: 50,
    resizeMode: 'contain',
  },
  introText: {
    flex: 3,
    padding: 10,
    color: AppStyle.lightGrey,
    fontFamily: AppStyle.mainFont,
    fontSize: AppStyle.fontMiddleSmall,
  },
  listContainer: {
    marginTop: 20,
    backgroundColor: 'white',
  },
});
