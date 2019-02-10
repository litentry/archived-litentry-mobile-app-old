import React from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { Header, withNavigation } from 'react-navigation';
import AppStyle from '../../../commons/AppStyle';
import Images from '../../../commons/Images';
import TinodeAPI from '../../Chat/TinodeAPI';
import { screensList } from '../../../navigation/screensList';
import { renderImageSource } from '../../../utils/imageUtils';
import { makeImageUrl } from '../../Chat/lib/blob-helpers';
import {store} from "../../../reducers/store";
import {loaderAction} from "../../../actions/loaderAction";

class ContinueLoginInnerScreen extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    loginToken: PropTypes.string.isRequired,
    profileImage: PropTypes.string,
    profileName: PropTypes.string,
    oldUserId: PropTypes.string.isRequired,
  };

  render() {
    const { loginToken, navigation, profileName, oldUserId, profileImage } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{t.TITLE}</Text>
        <TouchableOpacity
          style={styles.profileContainer}
          onPress={() => {
            TinodeAPI.login(null, null, oldUserId, loginToken, null, navigation);
          }}>
          <Image
            style={styles.profile}
            resizeMode="contain"
            source={_.isEmpty(profileImage) ? Images.blankProfile : { uri: profileImage }}
          />
          <Text style={styles.textContainer}>
            <Text style={styles.textContinue}>{t.CONTINUE}</Text>
            <Text style={styles.textName}>
              {' '}
              {!_.isEmpty(profileName) ? profileName : 'last user'}
            </Text>
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.newLoginContainer}
          onPress={() => {
            store.dispatch(loaderAction.clearAppData());
            navigation.navigate(screensList.Login.label)
          }}>
          <Text style={styles.newLoginText}>{t.NEW_LOGIN}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  loginToken: state.appState.loginToken,
  profileImage: state.appState.profileImage,
  profileName: state.appState.profileName,
  oldUserId: state.appState.userId,
});

const mapDispatchToProps = _.curry(bindActionCreators)({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNavigation(ContinueLoginInnerScreen));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Header.HEIGHT + 50,
    backgroundColor: AppStyle.userBackgroundColor,
  },
  title: {
    paddingHorizontal: 50,
    fontSize: AppStyle.fontMiddle,
    color: AppStyle.lightGrey,
    fontFamily: AppStyle.coverFont,
  },
  profileContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profile: {
    height: 150,
    width: 150,
  },
  textContainer: {
    padding: 20,
  },
  textContinue: {
    fontFamily: AppStyle.mainFont,
  },
  textName: {
    paddingVertical: 10,
    fontFamily: AppStyle.mainFontBold,
    fontSize: AppStyle.fontMiddleBig,
  },
  newLoginContainer: {
    paddingBottom: 50,
    marginTop: 'auto',
  },
  newLoginText: {
    textAlign: 'center',
    fontSize: AppStyle.fontMiddleSmall,
    fontFamily: AppStyle.coverFont,
    color: AppStyle.userCancelGreen,
  },
});

const t = {
  TITLE: 'Welcome to Genesis Space!',
  CONTINUE: 'Continue as',
  NEW_LOGIN: 'New login? old wallet data will be erased.',
};
