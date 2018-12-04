import React, { Component } from 'react';
import { View, StyleSheet, Text, Dimensions, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import { withNavigation } from 'react-navigation';
import images from '../../../commons/images';
import HapticHandler from '../../../utils/HapticFeedback';
import { comparePasswordAsync, savePasswordAsync } from '../../../utils/secureStoreUtils';
import { loaderAction } from '../../../actions/loaderAction';
import { unlockAction } from '../unlockAction';

const { height } = Dimensions.get('window');
const isSmallScreen = height < 569;
const dataNumber1 = [{ number: '1' }, { number: '2' }, { number: '3' }];
const dataNumber2 = [{ number: '4' }, { number: '5' }, { number: '6' }];
const dataNumber3 = [{ number: '7' }, { number: '8' }, { number: '9' }];
const dataNumber4 = [
  {
    actions: 'cancel',
  },
  { number: '0' },
  {
    icon: images.imgDeletePin,
    actions: 'delete',
  },
];

class Keyboard extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    hasPassword: Keyboard.bool.isRequired,
    pincode: PropTypes.string.isRequired,
    pincodeToBeConfirm: PropTypes.string.isRequired,
    resetPincode: PropTypes.func.isRequired,
    setPincodeToBeConfirm: PropTypes.func.isRequired,
    deleteOnePincode: PropTypes.func.isRequired,
    addErrorCount: PropTypes.func.isRequired,
  };

  _confirmPassword(pincode) {
    if (this.props.pincodeToBeConfirm !== pincode) {
      this.props.resetPincode();
    } else {
      savePasswordAsync(pincode);
    }
  }

  _onCheckPassword(pincode) {
    const { addErrorCount, navigation, resetPincode } = this.props;
    const resolve = navigation.getParam('resolve', () => {});
    const resolveFunction = () => {
      resetPincode();
      resolve();
    };
    comparePasswordAsync(pincode, resolveFunction, addErrorCount);
  }

  _handlePress(number) {
    const { pincode, hasPassword, pincodeToBeConfirm, setPincodeToBeConfirm } = this.props;

    if (pincode.length === 6) {
      return null;
    }
    HapticHandler.ImpactLight();
    const pinData = pincode + number;

    if (pinData.length === 6) {
      if (hasPassword) {
        if (pincodeToBeConfirm) {
          this._confirmPassword(pincode);
        } else {
          this._onCheckPassword(pincode);
        }
      } else {
        setPincodeToBeConfirm();
      }
    }
  }

  renderNumber(arrayNumber) {
    const { deleteOnePincode, navigation, resetPincode } = this.props;
    const shouldShowCancel = navigation.getParam('shouldShowCancel', true);

    const numbers = arrayNumber.map(numberData => {
      if (numberData.number) {
        return (
          <TouchableOpacity
            onPress={() => {
              this._handlePress(numberData.number);
            }}
            key={numberData.number}>
            <View style={styles.numberField}>
              <Text style={styles.numberText}>{numberData.number}</Text>
            </View>
          </TouchableOpacity>
        );
      }

      return (
        <TouchableOpacity
          key={numberData.actions}
          onPress={() => {
            if (numberData.actions === 'delete') {
              deleteOnePincode();
            } else if (numberData.actions === 'cancel' && shouldShowCancel) {
              resetPincode();
              navigation.goBack();
            }
          }}>
          <View style={styles.numberField}>
            {numberData.actions !== 'cancel' && <Image source={numberData.icon} />}
            {numberData.actions === 'cancel' && <Text style={styles.cancelText}>Cancel</Text>}
          </View>
        </TouchableOpacity>
      );
    });

    return <View style={styles.arrayNumber}>{numbers}</View>;
  }

  render() {
    return (
      <View style={{ marginTop: isSmallScreen ? 10 : height * 0.03 }}>
        {this.renderNumber(dataNumber1)}
        {this.renderNumber(dataNumber2)}
        {this.renderNumber(dataNumber3)}
        {this.renderNumber(dataNumber4)}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  hasPassword: state.appState.hasPassword,
  pincode: state.unlock.pincode,
  pincodeToBeConfirm: state.unlock.pincodeToBeConfirm,
});

const mapDispatchToProps = _.curry(bindActionCreators)({
  resetPincode: unlockAction.resetPincode,
  setPincodeToBeConfirm: unlockAction.setPincodeToBeConfirm,
  deleteOnePincode: unlockAction.deleteOnePincode,
  addErrorCount: loaderAction.addErrorCount,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNavigation(Keyboard));

const styles = StyleSheet.create({
  arrayNumber: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: height * 0.02,
  },
  numberField: {
    width: isSmallScreen ? 60 : 75,
    height: isSmallScreen ? 60 : 75,
    borderRadius: 37.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 13,
  },
  numberText: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 36,
    color: 'white',
  },
  cancelText: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: isSmallScreen ? 18 : 20,
    color: 'white',
  },
});
