import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  StatusBar,
  Text,
  Animated,
  BackHandler,
  Platform,
} from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import DisableView from '../components/DisableView';
import AppStyle from '../../../commons/AppStyle';
import Keyboard from '../components/Keyboard';
import Container from '../../../components/Container';

const { height } = Dimensions.get('window');
const isSmallScreen = height < 569;

const t = {
  UNLOCK_SCREEN: 'Unlock to continue',
  CREATE_PINCODE: 'Create your pincode',
  REPEAT_PINCODE: 'Please repeat the pincode',
};

class UnlockScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    pincode: PropTypes.string.isRequired,
    pincodeToBeConfirm: PropTypes.string.isRequired,
    wrongPincodeCount: PropTypes.number.isRequired,
    hasPassword: PropTypes.bool.isRequired,
    unlockDescription: PropTypes.string.isRequired,
  };

  static defaultProps = {
    navigation: {},
  };

  constructor(props) {
    super();
    this.state = { animatedValue: new Animated.Value(0) };
  }

  componentDidMount() {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }
  }

  componentWillUnmount() {
    if (Platform.OS === 'android') {
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }
  }

  get shouldDisableApp() {
    const { wrongPincodeCount } = this.props;
    return wrongPincodeCount > 5;
  }

  handleBackPress = () => {
    BackHandler.exitApp();
    return true;
  };

  renderDots(numberOfDots) {
    const { pincode } = this.props;
    const dots = [];
    const pinTyped = pincode.length;

    for (let i = 0; i < numberOfDots; i++) {
      const fillDotStyle = i < pinTyped ? { backgroundColor: AppStyle.lightGrey } : {};
      const dot = <View style={[styles.dot, fillDotStyle]} key={i} />;
      dots.push(dot);
    }
    return dots;
  }

  renderContent = () => {
    const { wrongPincodeCount, unlockDescription } = this.props;
    const { animatedValue } = this.state;
    if (this.shouldDisableApp) {
      return <DisableView />;
    }

    const renderWrongPincodeWarning = () => {
      if (wrongPincodeCount > 0 && wrongPincodeCount < 5) {
        return <Text style={styles.warningField}>{`${5 - wrongPincodeCount} attempts left!`}</Text>;
      }
      return null;
    };

    const animationShake = animatedValue.interpolate({
      inputRange: [0, 0.3, 0.7, 1],
      outputRange: [0, -20, 20, 0],
      useNativeDriver: true,
    });
    return (
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text style={styles.desText}>{unlockDescription}</Text>
        {renderWrongPincodeWarning()}
        <Animated.View
          style={[
            styles.pinField,
            {
              transform: [
                {
                  translateX: animationShake,
                },
              ],
            },
          ]}>
          {this.renderDots(4)}
        </Animated.View>
        <Keyboard />
      </View>
    );
  };

  render() {
    const { shouldDisableApp } = this;
    const container = shouldDisableApp ? {} : { justifyContent: 'center' };
    return (
      <Container style={_.merge(styles.container, container)}>
        <StatusBar hidden />
        {this.renderContent()}
      </Container>
    );
  }
}

const createDescription = (hasPassword, pincodeToBeConfirm) => {
  if (hasPassword) {
    return t.UNLOCK_SCREEN;
  } else if (pincodeToBeConfirm) {
    return t.REPEAT_PINCODE;
  }
  return t.CREATE_PINCODE;
};

const mapStateToProps = state => ({
  hasPassword: state.appState.hasPassword,
  wrongPincodeCount: state.appState.wrongPincodeCount,
  pincode: state.unlock.pincode,
  pincodeToBeConfirm: state.unlock.pincodeToBeConfirm,
  animatedValue: state.unlock.animatedValue,
  unlockDescription: createDescription(state.appState.hasPassword, state.unlock.pincodeToBeConfirm),
});

const mapDispatchToProps = _.curry(bindActionCreators)({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UnlockScreen);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: AppStyle.mainBackgroundColor,
  },
  desText: {
    color: AppStyle.lightGrey,
    fontSize: isSmallScreen ? 14 : 22,
    fontFamily: AppStyle.mainFont,
    marginTop: isSmallScreen ? 10 : height * 0.03,
    marginBottom: isSmallScreen ? 8 : height * 0.015,
  },
  pinField: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: isSmallScreen ? 13 : height * 0.025,
  },
  warningField: {
    color: AppStyle.errorColor,
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 16,
  },
  dot: {
    width: 13,
    height: 13,
    borderRadius: 6.5,
    borderWidth: 1,
    borderColor: AppStyle.lightGrey,
    marginHorizontal: 12,
  },
});
