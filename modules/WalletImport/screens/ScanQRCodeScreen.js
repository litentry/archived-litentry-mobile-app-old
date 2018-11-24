import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import PropsType from 'prop-types';
import { Permissions, BarCodeScanner } from 'expo';
import { connect } from 'react-redux';
import _ from 'lodash';
import HapticFeedback from '../../../utils/HapticFeedback';
import { screenAction } from '../../../actions/screenAction';
import { popupAction } from '../../../actions/popupAction';
import Checker from "../../../utils/Checker";
import {walletImportAction} from "../walletImportAction";

class ScanQRCodeScreen extends Component {
  static propTypes = {
    navigation: PropsType.object,
    lockScreen: PropsType.func.isRequired,
    showPopup: PropsType.func.isRequired,
    setAddress: PropsType.func.isRequired,
  };

  state = {
    showCamera: false,
  };

  async componentDidMount() {
    this.props.lockScreen();
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    if (status !== 'granted') {
      alert('Hey! You might want to enable notifications for my app, they are good.');
    }
    this.setState({ showCamera: status === 'granted' });
  }

  componentDidUpdate() {
    // this.resetCamera();
  }

  resetCamera() {
    this.setState({ showCamera: false }, () => {
      this.setState({ showCamera: true });
    });
  }

  handleBarCodeScanned = ({ type, data }) => {
    const {navigation, setAddress, showPopup} = this.props
    console.log(`Bar code with type ${type} and data ${data} has been scanned!`);
      // if (this.importAddressStore.title === '') {
      //   setTimeout(() => this.nameField.focus(), 250)
      // }
      const resChecker = Checker.checkAddressQR(data.toString());
      if (resChecker && resChecker.length > 0) {
        setAddress(data);
        navigation.goBack()
      } else{
        showPopup('Not a valid address')
      }

    // HapticFeedback.NotificationSuccess();
    // this.props.navigation.state.params.returnData(result);
    // this.setState({showCamera: false});
    // this.props.navigation.goBack();
  };

  render() {
    const { showCamera } = this.state;

    if (showCamera === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (showCamera === false) {
      return <Text>No access to camera</Text>;
    }
    return (
      <View style={{ flex: 1 }}>
        <BarCodeScanner onBarCodeScanned={this.handleBarCodeScanned} style={styles.camera} />
      </View>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  lockScreen: _.flow(
    screenAction.lockScreen,
    dispatch
  ),
  showPopup: _.flow(
    popupAction.showPopup,
    dispatch
  ),
  setAddress: _.flow(
    walletImportAction.setAddress,
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScanQRCodeScreen);

const styles = StyleSheet.create({
  camera: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
