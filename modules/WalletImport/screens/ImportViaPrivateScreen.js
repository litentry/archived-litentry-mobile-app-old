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
import { bindActionCreators } from 'redux';
import ActionButton from '../../../components/ActionButton';
import Spinner from '../../../components/Spinner';
import BottomButton from '../../../components/BottomButton';
import Checker from '../../../utils/Checker';
import Images from '../../../commons/Images';
import AppStyle from '../../../commons/AppStyle';
import KeyboardView from '../../../components/KeyboardView';
import TouchOutSideDismissKeyboard from '../../../components/TouchOutSideDismissKeyboard';
import { screensList } from '../../../navigation/screensList';
import { walletImportAction } from '../walletImportAction';
import { lockScreen } from '../../Unlock/lockScreenUtils';

const { width } = Dimensions.get('window');

class ImportViaPrivateScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    privateKey: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    isValidPrivateKey: PropTypes.bool.isRequired,
    setTitle: PropTypes.func.isRequired,
    setPrivateKey: PropTypes.func.isRequired,
    setFocusField: PropTypes.func.isRequired,
  };

  static navigationOptions = {
    title: screensList.ImportViaPrivate.title,
  };

  constructor(props) {
    super();
  }

  onPaste = async () => {
    const content = await Clipboard.getString();
    if (content) {
      this.onChangePrivateKey(content);
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
    this.onChangePrivateKey('');
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

  onChangePrivateKey = text => {
    this.props.setPrivateKey(text);
  };

  onFocusName = () => this.props.setFocusField('name');
  onFocusPrivateKey = () => this.props.setFocusField('privateKey');
  onBlurTextField = () => this.props.setFocusField('');

  gotoScan = () => {
    this.props.navigation.navigate(screensList.ScanQRCode.label);
  };

  goBack = () => {
    this.props.navigation.goBack();
  };

  goToEnterName = () => {
    // this.props.navigation.navigate('EnterNameViaAddress');
    lockScreen(this.props.navigation).then(()=>
      console.log('success unlock screen!')
    )
  };

  render() {
    const { privateKey, loading, isValidPrivateKey } = this.props;
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
                  onChangeText={this.onChangePrivateKey}
                  value={privateKey}
                />
                {privateKey === '' ? this._renderPasteButton() : this._renderClearButton()}
              </View>
              {!isValidPrivateKey && privateKey !== '' && (
                <Text style={styles.errorText}>{t.INVALID_PRIVATE_KEY}</Text>
              )}
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
            <BottomButton onPress={this.goToEnterName} disable={!isValidPrivateKey} />
            {loading && <Spinner />}
          </View>
        </TouchOutSideDismissKeyboard>
      </SafeAreaView>
    );
  }
}

const validPrivateKey = privateKey => privateKey !== '' && !_.isEmpty(Checker.checkPrivateKey(privateKey));

const mapStateToProps = state => ({
  privateKey: state.walletImport.privateKey,
  loading: state.walletImport.loading,
  title: state.walletImport.title,
  isValidPrivateKey: validPrivateKey(state.walletImport.privateKey),
});

const mapDispatchToProps = _.curry(bindActionCreators)(walletImportAction);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ImportViaPrivateScreen);

const t = {
  PASTE: 'Paste',
  SCAN_QR_CODE: 'Scan QR Code',
  EXISTED_WALLET: 'Wallet already exists.',
  INVALID_PRIVATE_KEY: 'Invalid Private Key.',
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
