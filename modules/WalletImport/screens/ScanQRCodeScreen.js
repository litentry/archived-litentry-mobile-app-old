import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import PropsType from 'prop-types';
import { Permissions, BarCodeScanner } from 'expo';
import { connect } from 'react-redux';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { screenAction } from '../../../actions/screenAction';
import { popupAction } from '../../../actions/popupAction';
import Checker from '../../../utils/Checker';
import { walletImportAction } from '../walletImportAction';
import { secret } from '../../../constants/testAddress';
import { environment } from '../../../config';

class ScanQRCodeScreen extends Component {
  static propTypes = {
    navigation: PropsType.object,
    lockScreen: PropsType.func.isRequired,
    showPopup: PropsType.func.isRequired,
    setPrivateKey: PropsType.func.isRequired,
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
    if (environment.disableQRScan) {
      this.handleBarCodeScanned({
        type: 'string',
        data: secret,
      });
    }
  }

  handleBarCodeScanned = ({ type, data }) => {
    const { navigation, setPrivateKey, showPopup } = this.props;
    console.log(`Bar code with type ${type} and data ${data} has been scanned!`);
    const resChecker = Checker.checkPrivateKey(data.toString());
    if (resChecker && resChecker.length > 0) {
      setPrivateKey(data);
      navigation.goBack();
    } else {
      showPopup('Not a valid private Key');
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

const mapDispatchToProps = _.curry(bindActionCreators)({
  setPrivateKey: walletImportAction.setPrivateKey,
  showPopup: popupAction.showPopup,
  lockScreen: screenAction.lockScreen,
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
