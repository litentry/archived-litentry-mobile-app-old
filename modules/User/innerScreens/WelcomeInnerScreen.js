import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { Header, withNavigation } from 'react-navigation';
import AppStyle from '../../../commons/AppStyle';
import { screensList } from '../../../navigation/screensList';
import GenesisButton from '../../../components/GenesisButton';

class WelcomeInnerScreen extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    loginToken: PropTypes.string,
  };

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.intro} key="intro">
          {t.INTRO}
        </Text>
        <View style={styles.nameContainer}>
          <View style={styles.nameBorder}>
            <Text style={styles.name} key="name">
              {t.NAME}
            </Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <GenesisButton
            action={() => navigation.navigate(screensList.CreateAccount.label)}
            text={t.BUTTON_TEXT}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  loginToken: state.appState.loginToken,
  isLoaded: state.appState.isLoaded,
});

const mapDispatchToProps = _.curry(bindActionCreators)({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNavigation(WelcomeInnerScreen));

const styles = StyleSheet.create({
  container: {
    paddingTop: Header.HEIGHT,
    flex: 1,
    backgroundColor: AppStyle.userBackgroundColor,
    flexDirection: 'column',
  },
  intro: {
    padding: 50,
    textAlign: 'center',
    flex: 2,
    color: AppStyle.coverTextBlack,
    fontSize: AppStyle.fontMiddleBig,
    fontFamily: AppStyle.coverFont,
  },
  nameContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameBorder: {
    margin: 30,
    borderBottomWidth: 2,
    borderBottomColor: AppStyle.lightGrey,
  },
  name: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    textAlign: 'center',
    fontFamily: AppStyle.coverFont,
    color: AppStyle.coverTextBlack,
    fontSize: AppStyle.fontMiddleBig,
  },
  buttonContainer: {
    flex: 1,
  },
});

const t = {
  INTRO:
    'We are creating a world where anyone, anywhere may express his or her beliefs, no matter how singular, without fear of being coerced into silence or conformity.',
  NAME: 'John Perry Barlow',
  BUTTON_TEXT: 'Get Started',
};
