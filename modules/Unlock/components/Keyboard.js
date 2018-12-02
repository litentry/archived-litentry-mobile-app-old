import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  TouchableOpacity
} from 'react-native'
import PropTypes from 'prop-types'
import images from '../../../commons/images'
import NavStore from '../../../AppStores/NavStore'
import HapticHandler from "../../../utils/HapticFeedback";

const { height } = Dimensions.get('window')
const isSmallScreen = height < 569
const dataNumber1 = [
  { number: '1' },
  { number: '2' },
  { number: '3' }
]
const dataNumber2 = [
  { number: '4' },
  { number: '5' },
  { number: '6' }
]
const dataNumber3 = [
  { number: '7' },
  { number: '8' },
  { number: '9' }
]
const dataNumber4 = [
  {
    actions: 'cancel'
  },
  { number: '0' },
  {
    icon: images.imgDeletePin,
    actions: 'delete'
  }
]

export default class Keyboard extends Component {
  static propTypes = {
    params: PropTypes.object.isRequired
  }

  async handlePress(number) {
    const { pincode, pinConfirm } = this.props

    if (pincode.length === 6) {
      return null
    }
    HapticHandler.ImpactLight()
    const pinData = pincode + number
    return new Promise((resolve, reject) => {
      if (pinData.length === 6) {
        // handle check pincode
        this.setData({
          // pinTyped: pinTyped + 1,
          pincode: pinData
        })
        MigrateData.getItem('USER_WALLET_ENCRYPTED')
          .then((oldData) => {
            if (oldData) {
              this._handelMigrateData().then(res => resolve(res))
            } else if (MainStore.appState.hasPassword) {
              this._handleCheckPincode().then(res => resolve(res))
            } else if (pinConfirm === '') {
              this._handleCreatePin()
            } else if (this.data.pincode === this.data.pinConfirm) {
              this._handleConfirmPin().then(res => resolve(res))
            } else {
              this._handleErrorPin()
            }
          })
      } else {
        this.setData({
          // pinTyped: pinTyped + 1,
          pincode: pinData
        })
      }
    })
  }

  renderNumber(arrayNumber) {
    const { onUnlock = () => {}, shouldShowCancel } = this.props.params
    const nums = arrayNumber.map((num, i) => {
      if (num.number) {
        return (
          <TouchableOpacity
            onPress={() => {
              this.onKeyPress(num.number).then((res) => {
                if (!res) return
                onUnlock(res)
              })
            }}
            key={num.number}
          >
            <View style={styles.numberField}>
              <Text style={styles.numberText}>{num.number}</Text>
            </View>
          </TouchableOpacity>
        )
      }

      return (
        <TouchableOpacity
          key={num.actions}
          onPress={() => {
            if (num.actions === 'delete') {
              UnlockStore.handleDeletePin()
            } else if (num.actions === 'cancel' && shouldShowCancel) {
              NavStore.goBack()
            }
          }}
        >
          <View style={styles.numberField}>
            {num.actions !== 'cancel' &&
            <Image
              source={num.icon}
            />
            }
            {num.actions === 'cancel' &&
            <Text style={styles.cancelText}>Cancel</Text>
            }
          </View>
        </TouchableOpacity>
      )
    })

    return (
      <View style={styles.arrayNumber}>
        {nums}
      </View>
    )
  }

  render() {
    return (
      <View style={{ marginTop: isSmallScreen ? 10 : height * 0.03 }}>
        {this.renderNumber(dataNumber1)}
        {this.renderNumber(dataNumber2)}
        {this.renderNumber(dataNumber3)}
        {this.renderNumber(dataNumber4)}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  arrayNumber: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: height * 0.02
  },
  numberField: {
    width: isSmallScreen ? 60 : 75,
    height: isSmallScreen ? 60 : 75,
    borderRadius: 37.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 13
  },
  numberText: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 36,
    color: 'white'
  },
  cancelText: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: isSmallScreen ? 18 : 20,
    color: 'white'
  }
})
