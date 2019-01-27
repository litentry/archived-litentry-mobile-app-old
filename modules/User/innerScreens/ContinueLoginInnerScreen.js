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

class ContinueLoginInnerScreen extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    loginToken: PropTypes.string.isRequired,
    profileImage: PropTypes.string,
    profileName: PropTypes.string,
  };

  renderImageSource = () => {
    const { profileImage } = this.props;
    return profileImage ? { uri: profileImage } : Images.blankProfile;
  };

  render() {
    const { loginToken, navigation, profileName } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{t.TITLE}</Text>
        <TouchableOpacity
          style={styles.profileContainer}
          onPress={() => {
            TinodeAPI.login(null, null, loginToken, null, navigation);
          }}>
          <Image style={styles.profile} resizeMode="contain" source={this.renderImageSource()} />
          <Text style={styles.textContainer}>
            <Text style={styles.textContinue}>{t.CONTINUE}</Text>
            <Text style={styles.textName}> {profileName ? profileName : 'last user'}</Text>
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  loginToken: state.appState.loginToken,
  profileImage: state.appState.profileImage,
  profileName: state.appState.profileName,
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
});

const t = {
  TITLE: 'Welcome to Genesis Space!',
  CONTINUE: 'Continue as',
};
