import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Dimensions,
  StatusBar,
  Text,
  Animated,
  BackHandler,
  Platform
} from 'react-native'
import PropTypes from 'prop-types'
import DisableView from '../components/DisableView'
import AppStyle from '../../../commons/AppStyle'
import Keyboard from '../components/Keyboard'
import Spinner from "../../../components/Spinner";
import _ from "lodash";
import {bindActionCreators} from "redux";
import {loaderAction} from "../../../actions/loaderAction";
import connect from "react-redux/es/connect/connect";

const { height } = Dimensions.get('window')
const isSmallScreen = height < 569

const t = {
  UNLOCK_SCREEN: 'Unlock to continue',
  CREATE_PINCODE: 'Create your pin code'
}

export default class UnlockScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object
  }

  static defaultProps = {
    navigation: {}
  }

  constructor(props) {
    super()
    this.state.animatedValue = new Animated.Value(0)
  }

  componentDidMount() {
    this.setup()
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', this.handleBackPress)
    }
  }

  componentWillUnmount() {
    if (Platform.OS === 'android') {
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress)
    }
  }

  get shouldDisableApp() {
    const { wrongPincodeCount } = this.props
    return wrongPincodeCount > 5
  }

  handleBackPress = () => {
    BackHandler.exitApp()
    return true
  }

  renderDots(numberOfDots) {
    const { pincode } = this.props
    const dots = []
    const pinTyped = pincode.length

    const styleDot = {
      width: 13,
      height: 13,
      borderRadius: 6.5,
      borderWidth: 1,
      borderColor: 'white',
      marginHorizontal: 12
    }
    for (let i = 0; i < numberOfDots; i++) {
      const backgroundColor = i < pinTyped ? { backgroundColor: 'white' } : {}
      const dot = <View style={[styleDot, backgroundColor]} key={i} />
      dots.push(dot)
    }
    return dots
  }

  renderContent = () => {
    const { wrongPincodeCount, unlockDescription } = this.props
    const { animatedValue } = this.state;
    if (this.shouldDisableApp) {
      return <DisableView />
    }

    const renderWrongPincodeWarning = () => {
      if(wrongPincodeCount > 0  && wrongPincodeCount < 5) {
        return <Text style={styles.warningField}>{`${5 - wrongPincodeCount} attempts left!`}</Text>
      }
      return null
    }

    const animationShake = animatedValue.interpolate({
      inputRange: [0, 0.3, 0.7, 1],
      outputRange: [0, -20, 20, 0],
      useNativeDriver: true
    })
    return (
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text style={styles.desText}>{unlockDescription}</Text>
        {renderWrongPincodeWarning()}
        <Animated.View
          style={[styles.pinField, {
            transform: [
              {
                translateX: animationShake
              }
            ]
          }]}
        >
          {this.renderDots(6)}
        </Animated.View>
        <Keyboard
          params={this.props.navigation.state.params}
        />
      </View>
    )
  }

  render() {
    const { shouldDisableApp } = this
    const container = shouldDisableApp ? {} : { justifyContent: 'center' }
    return (
      <View style={[styles.container, container]}>
        <StatusBar
          hidden
        />
        <Spinner
          style={{ marginTop: shouldDisableApp ? 80 : 0 }}
          isSpin={false}
        />
        {this.renderContent()}
      </View>
    )
  }
}

const mapStateToProps = state => ({
  hasPassword: state.appState.hasPassword,
  disableTime: state.appState.disableTime,
  wrongPincodeCount: state.appState.wrongPincodeCount,
  pinConfirm: state.appState.pinConfirm,
  pincode: state.unlock.pincode,
  animatedValue: state.unlock.animatedValue,
  unlockDescription : state.appState.hasPassword ? t.UNLOCK_SCREEN : t.CREATE_PINCODE
});

const mapDispatchToProps = _.curry(bindActionCreators)({
  readAppData: loaderAction.readAppData,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UnlockScreen);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1
  },
  desText: {
    color: 'white',
    fontSize: isSmallScreen ? 14 : 22,
    fontFamily: 'OpenSans-Bold',
    marginTop: isSmallScreen ? 10 : height * 0.03,
    marginBottom: isSmallScreen ? 8 : height * 0.015
  },
  pinField: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: isSmallScreen ? 13 : height * 0.025
  },
  warningField: {
    color: AppStyle.errorColor,
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 16
  }
})
