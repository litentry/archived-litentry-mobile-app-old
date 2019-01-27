import React, { Component } from 'react';
import { View, StyleSheet, Text, Dimensions, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import { withNavigation } from 'react-navigation';
import { AntDesign } from '@expo/vector-icons';
import images from '../../../commons/Images';
import { comparePasswordAsync, savePasswordAsync } from '../../../utils/secureStoreUtils';
import { loaderAction } from '../../../actions/loaderAction';
import { unlockAction } from '../unlockAction';
import AppStyle from '../../../commons/AppStyle';
import {dataEntry} from "../../../reducers/loader";

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
    hasPassword: PropTypes.bool.isRequired,
    pincode: PropTypes.string.isRequired,
    pincodeToBeConfirm: PropTypes.string.isRequired,
    resetPincode: PropTypes.func.isRequired,
    setPincodeToBeConfirm: PropTypes.func.isRequired,
    deleteOnePincode: PropTypes.func.isRequired,
    addErrorCount: PropTypes.func.isRequired,
    addOnePincode: PropTypes.func.isRequired,
    saveAppData: PropTypes.func.isRequired,
  };

  _confirmPassword(pincode, resolve) {
    const {saveAppData, pincodeToBeConfirm, resetPincode} = this.props
    if (pincodeToBeConfirm !== pincode) {
      resetPincode();
    } else {
      saveAppData({[dataEntry.hasPassword.stateName]: true})
      savePasswordAsync(pincode, resolve, resetPincode);
    }
  }

  _onCheckPassword(pincode, resolve) {
    const { addErrorCount, resetPincode } = this.props;
    const resolveFunction = () => {
      resetPincode();
      resolve();
    };
    comparePasswordAsync(pincode, resolveFunction, addErrorCount);
  }

  _handlePress(number) {
    const { navigation } = this.props;
    const resolve = navigation.getParam('resolve');

    const {
      pincode,
      hasPassword,
      pincodeToBeConfirm,
      setPincodeToBeConfirm,
      addOnePincode,
    } = this.props;

    if (pincode.length === 4) {
      return null;
    }
    // HapticHandler.ImpactLight();
    addOnePincode(number);
    const newPinCode = pincode + number;

    if (newPinCode.length === 4) {
      if (!hasPassword) {
        if (pincodeToBeConfirm) {
          this._confirmPassword(newPinCode, resolve);
        } else {
          setPincodeToBeConfirm(newPinCode);
        }
      } else {
        this._onCheckPassword(newPinCode, resolve);
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
            {numberData.actions !== 'cancel' && (
              <AntDesign name="delete" color={AppStyle.lightGrey} size={AppStyle.fontMiddleBig} />
            )}
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
  addOnePincode: unlockAction.addOnePincode,
  resetPincode: unlockAction.resetPincode,
  setPincodeToBeConfirm: unlockAction.setPincodeToBeConfirm,
  deleteOnePincode: unlockAction.deleteOnePincode,
  addErrorCount: loaderAction.addErrorCount,
  saveAppData: loaderAction.saveAppData,
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
    color: AppStyle.lightGrey,
  },
  cancelText: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: isSmallScreen ? 18 : 20,
    color: AppStyle.lightGrey,
  },
});
