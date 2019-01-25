import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { Header } from 'react-navigation';
import AppStyle from '../../../commons/AppStyle';
import Images from '../../../commons/Images';

const mock = {
  profile: Images.mockProfile,
  name: ' ' + 'Hannah',
};

class ContinueLoginScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerBackTitle: '',
    headerTransparent: true,
    headerTintColor: AppStyle.userCancelGreen,
    headerStyle: {
      backgroundColor: AppStyle.userHeaderBackgroundColor,
    },
  });

  static propTypes = {
    navigation: PropTypes.object,
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{t.TITLE}</Text>
        <View style={styles.profileContainer}>
          <Image style={styles.profile} resizeMode="contain" source={mock.profile} />
          <Text style={styles.textContainer}>
            <Text style={styles.textContinue}>{t.CONTINUE}</Text>
            <Text style={styles.textName}>{mock.name}</Text>
          </Text>
        </View>
      </View>
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
)(ContinueLoginScreen);

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
  profile: {},
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
