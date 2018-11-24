import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  Platform,
  TextInput,
  TouchableOpacity,
  Clipboard,
  Image,
} from 'react-native';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import _ from 'lodash';
import ActionButton from '../../../components/ActionButton';
import Spinner from '../../../components/Spinner';
import BottomButton from '../../../components/BottomButton';
import LayoutUtils from '../../../commons/LayoutUtils';
import Checker from '../../../utils/Checker';
import Images from '../../../commons/Images';
import AppStyle from '../../../commons/AppStyle';
import KeyboardView from '../../../components/KeyboardView';
import TouchOutSideDismissKeyboard from '../../../components/TouchOutSideDismissKeyboard';
import { screensList } from '../../../navigation/screensList';
import { walletImportAction } from '../walletImportAction';

const { width } = Dimensions.get('window');
const marginTop = LayoutUtils.getExtraTop();

class ImportViaAddressScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    address: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    errorAddress: PropTypes.string.isRequired,
    setTitle: PropTypes.func.isRequired,
    setAddress: PropTypes.func.isRequired,
    setFocusField: PropTypes.func.isRequired
  };

  static navigationOptions = {
    title: screensList.ImportViaAddress.title,
  };

  constructor(props) {
    super();
  }

  onPaste = async () => {
    const content = await Clipboard.getString();
    if (content) {
      this.onChangeAddress(content);
    }
  };

  _renderPasteButton() {
    return (
      <View style={{ position: 'absolute', right: 0 }}>
        <TouchableOpacity onPress={this.onPaste}>
          <View style={{ padding: 15 }}>
            <Text style={styles.pasteText}>{t.PASTE}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  clearText = () => {
    this.onChangeAddress('');
  };

  _renderClearButton() {
    return (
      <View style={{ position: 'absolute', right: 15, top: 15 }}>
        <TouchableOpacity onPress={this.clearText}>
          <Image source={Images.iconCloseSearch} />
        </TouchableOpacity>
      </View>
    );
  }

  onChangeName = text => {
    this.props.setTitle(text);
  };

  onChangeAddress = text => {
    this.props.setAddress(text);
  };

  onFocusName = () => this.props.setFocusField('name');
  onFocusAddress = () => this.props.setFocusField('address');
  onBlurTextField = () => this.props.setFocusField('');

  gotoScan = () => {
    setTimeout(() => {
      this.props.navigation.navigate('ScanQRCodeScreen', {
        title: 'Scan Address',
        marginTop,
        returnData: this.returnData.bind(this),
      });
    });
  };

  goBack = () => {
    this.props.navigation.goBack();
  };

  returnData(codeScanned) {
    let address = codeScanned;
    // if (this.importAddressStore.title === '') {
    //   setTimeout(() => this.nameField.focus(), 250)
    // }
    const resChecker = Checker.checkAddressQR(codeScanned);
    if (resChecker && resChecker.length > 0) {
      [address] = resChecker;
    }
    this.props.setAddress(address);
  }

  goToEnterName = () => {
    this.props.navigation.navigate('EnterNameViaAddress');
  };

  render() {
    const { address, loading, errorAddress } = this.props;
    const isValidAddress = this.address !== '' && this.errorAddress === '';
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <TouchOutSideDismissKeyboard>
          <View style={styles.container}>
            <KeyboardView style={styles.container}>
              <View style={{ marginTop: 25 }}>
                <TextInput
                  underlineColorAndroid="transparent"
                  keyboardAppearance="dark"
                  autoCorrect={false}
                  multiline
                  style={[styles.textInput]}
                  onChangeText={this.onChangeAddress}
                  value={address}
                />
                {address === '' ? this._renderPasteButton() : this._renderClearButton()}
              </View>
              {errorAddress !== '' && <Text style={styles.errorText}>{errorAddress}</Text>}
              <ActionButton
                style={{ height: 40, marginTop: 25 }}
                buttonItem={{
                  name: t.SCAN_QR_CODE,
                  icon: Images.iconQrCode,
                  background: '#121734',
                }}
                styleText={{ color: AppStyle.mainTextColor }}
                styleIcon={{ tintColor: AppStyle.mainTextColor }}
                action={this.gotoScan}
              />
            </KeyboardView>
            <BottomButton onPress={this.goToEnterName} disable={!isValidAddress} />
            {loading && <Spinner />}
          </View>
        </TouchOutSideDismissKeyboard>
      </SafeAreaView>
    );
  }
}

const getErrorAddress = (address, finished) => {
  if (address !== '' && !finished && !Checker.checkAddress(address)) {
    return t.INVALID_ADDRESS;
  }
  //TODO
  // if (!finished && this.addressMap[address.toLowerCase()]) {
  //   return t.EXISTED_WALLET
  // }
  return '';
};

const mapStateToProps = state => ({
  address: state.walletImport.address,
  loading: state.walletImport.loading,
  title: state.walletImport.title,
  errorAddress: getErrorAddress(state.walletImport.address, state.walletImport.finished),
});

const mapDispatchToProps = dispatch => ({
  setAddress: _.flow(
    walletImportAction.setAddress,
    dispatch
  ),
  setTitle: _.flow(
    walletImportAction.setTitle,
    dispatch
  ),
  setFocusField: _.flow(
    walletImportAction.setFocusField,
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ImportViaAddressScreen);

const t = {
  PASTE: 'Paste',
  SCAN_QR_CODE: 'Scan QR Code',
  EXISTED_WALLET: 'Wallet already exists.',
  INVALID_ADDRESS: 'Invalid Address.',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  titleText: {
    fontSize: 16,
    fontFamily: 'OpenSans-SemiBold',
    color: 'white',
    alignSelf: 'flex-start',
    marginLeft: 20,
  },
  textInput: {
    height: 182,
    width: width - 40,
    backgroundColor: '#14192D',
    borderRadius: 14,
    color: '#7F8286',
    fontFamily: Platform.OS === 'ios' ? 'OpenSans' : 'OpenSans-Regular',
    fontSize: 18,
    paddingHorizontal: 27,
    paddingTop: 50,
    paddingBottom: 50,
    textAlignVertical: 'center',
  },
  errorText: {
    fontSize: 14,
    fontFamily: 'OpenSans-SemiBold',
    color: AppStyle.errorColor,
    alignSelf: 'flex-start',
    marginTop: 10,
    marginLeft: 20,
  },
  pasteText: {
    color: AppStyle.mainColor,
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 16,
  },
});
