import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Platform
} from 'react-native'
// import PropTypes from 'prop-types'
import { openSansRegular } from '../../../commons/commonStyles'
import AppStyle from '../../../commons/AppStyle'

const title = 'PIN Code is disabled'
const attention = 'Erase all your data on the App after 5 failed PIN Code attempts'

const { width, height } = Dimensions.get('window')
const extraBottom = Platform.OS === 'ios' ? 0 : 48

export default class DisableView extends Component {

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.attention}>{attention}</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.7)',
    alignItems: 'center',
    justifyContent: 'center',
    width,
    height: height + extraBottom,
    paddingHorizontal: 60
  },
  title: {
    color: 'white',
    fontSize: 26,
    fontFamily: 'OpenSans-SemiBold',
    textAlign: 'center'
  },
  description: {
    fontFamily: openSansRegular,
    fontSize: 20,
    color: AppStyle.mainTextColor,
    marginTop: 10,
    textAlign: 'center'
  },
  attention: {
    color: AppStyle.secondaryTextColor,
    fontSize: 14,
    fontFamily: 'OpenSans-SemiBold',
    marginTop: 20,
    textAlign: 'center'
  }
})
