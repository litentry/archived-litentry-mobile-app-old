import React from 'react';
import { Text, Image, StyleSheet, View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { AntDesign } from '@expo/vector-icons';
import AppStyle from '../../../commons/AppStyle';
import { screensList } from '../../../navigation/screensList';
import NavigationHeader from '../../../components/NavigationHeader';
import SingleLineDisplay from '../../../components/SingleLineDisplay';
import packageJson from '../../../package';
import TinodeAPI from '../../Chat/TinodeAPI';
import Container from '../../../components/Container';
import Images from '../../../commons/Images';

class SettingsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: <NavigationHeader title={screensList.Settings.title} />,
    headerBackTitle: '',
  });

  static propTypes = {
    navigation: PropTypes.object,
    userId: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    avatar: PropTypes.string,
  };

  render() {
    const { navigation, avatar, userId, username } = this.props;
    return (
      <Container style={styles.container}>
        <TouchableOpacity
          style={styles.profileContainer}
          onPress={() => navigation.navigate(screensList.AccountSetting.label)}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={_.isEmpty(avatar) ? Images.blankProfile : { uri: avatar }}
            />
          </View>
          <View style={styles.accountInfoContainer}>
            <Text style={styles.userNameText}>{username}</Text>
            <Text style={styles.userIdText}>GS ID: {userId}</Text>
          </View>
          <View style={styles.arrowContainer}>
            <AntDesign
              name="right"
              size={AppStyle.fontMiddle}
              style={styles.arrowIcon}
              color={AppStyle.lightGrey}
            />
          </View>
        </TouchableOpacity>

        <SingleLineDisplay
          title={t.WALLET_TITLE}
          value={''}
          style={styles.singleDisplay}
          onClick={() => navigation.navigate(screensList.Wallet.label)}
        />
        <SingleLineDisplay
          title={t.ABOUT_TITLE}
          style={styles.singleDisplay}
          value={packageJson.version}
          onClick={() => navigation.navigate(screensList.About.label)}
        />
        <SingleLineDisplay
          title={t.LOG_OUT_TITLE}
          style={styles.singleDisplay}
          value={''}
          onClick={() => TinodeAPI.logout(navigation)}
        />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  walletAddress: state.appState.walletAddress,
  userId: state.appState.userId,
  avatar: state.chat.userInfo.avatar,
  username: state.chat.userInfo.name,
});

const mapDispatchToProps = _.curry(bindActionCreators)({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsScreen);

const styles = StyleSheet.create({
  singleDisplay: {
    marginTop: 20,
  },
  container: {
    flex: 1,
    backgroundColor: AppStyle.mainBackgroundColor,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    marginTop: 20,
  },
  accountInfoContainer: {
    flexGrow: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: 10,
  },
  userNameText: {
    fontSize: AppStyle.fontMiddleSmall,
    fontFamily: AppStyle.mainFont,
    color: 'black',
  },
  userIdText: {
    fontSize: AppStyle.fontSmall,
    fontFamily: AppStyle.mainFont,
    color: 'black',
  },
  imageContainer: {
    height: 50,
    width: 50,
    marginRight: 10,
  },
  image: {
    height: 50,
    width: 50,
    resizeMode: 'contain',
  },
  arrowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrowIcon: {
    paddingLeft: 10,
  },
});

const t = {
  ABOUT_TITLE: 'About',
  LOG_OUT_TITLE: 'Log out',
  WALLET_TITLE: 'Wallet',
};
