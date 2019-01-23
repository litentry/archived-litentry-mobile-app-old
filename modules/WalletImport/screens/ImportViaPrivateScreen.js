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
} from 'react-native';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { AntDesign } from '@expo/vector-icons';
import Spinner from '../../../components/Spinner';
import Checker from '../../../utils/Checker';
import AppStyle from '../../../commons/AppStyle';
import KeyboardView from '../../../components/KeyboardView';
import TouchOutSideDismissKeyboard from '../../../components/TouchOutSideDismissKeyboard';
import { screensList } from '../../../navigation/screensList';
import { walletImportAction } from '../walletImportAction';
import { lockScreen } from '../../Unlock/lockScreenUtils';
import GenesisButton from '../../../components/GenesisButton';
import { loaderAction } from '../../../actions/loaderAction';
import { getPublicKeyFromPrivateKey } from '../../../utils/ethereumUtils';
import { dataEntry } from '../../../reducers/loader';
import LightButton from '../../../components/LightButton';
const { width } = Dimensions.get('window');

class ImportViaPrivateScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    privateKey: PropTypes.string.isRequired,
    isValidPrivateKey: PropTypes.bool.isRequired,
    setPrivateKey: PropTypes.func.isRequired,
    saveAppData: PropTypes.func.isRequired,
  };

  static navigationOptions = {
  };

  constructor(props){
    super(props);
    this.state = {
      loading: false,
    }
  }

  onPaste = async () => {
    const content = await Clipboard.getString();
    if (content) {
      this.onChangePrivateKey(content);
    }
  };

  clearText = () => {
    this.onChangePrivateKey('');
  };

  onChangePrivateKey = text => {
    this.props.setPrivateKey(text);
  };

  gotoScan = () => {
    this.props.navigation.navigate(screensList.ScanQRCode.label);
  };

  onConfirm = () => {
    const { navigation } = this.props;
    lockScreen(navigation).then(this.onImportSuccess);
  };

  onImportSuccess = () => {
    this.setState({loading:true})
    const { privateKey, navigation, saveAppData } = this.props;
    //TODO now I should get the public key and then save it into loader;s place and save private key into secure store.
    // and then split the default screen into two different screens.
    const publicKey = getPublicKeyFromPrivateKey(privateKey);
    saveAppData({ [dataEntry.publicKey.stateName]: publicKey });
    this.setState({loading:false})
    navigation.navigate(screensList.Wallet.label);
  };

  render() {
    const { privateKey, isValidPrivateKey } = this.props;
    const { loading } = this.state
    const ClearButton = () => (
      <View style={styles.clearButton}>
        <TouchableOpacity onPress={this.clearText}>
          <AntDesign name="delete" size={AppStyle.fontMiddle} color={AppStyle.lightGrey} />
        </TouchableOpacity>
      </View>
    );

    const PasteButton = () => (
      <View style={styles.pasteButton}>
        <TouchableOpacity onPress={this.onPaste}>
          <View style={{ padding: 15 }}>
            <Text style={styles.pasteText}>{t.PASTE}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );

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
                {privateKey === '' ? <PasteButton /> : <ClearButton />}
              </View>
              {!isValidPrivateKey && privateKey !== '' && (
                <Text style={styles.errorText}>{t.INVALID_PRIVATE_KEY}</Text>
              )}
              <LightButton onPress={this.gotoScan} text={t.SCAN_QR_CODE} />
            </KeyboardView>
            <GenesisButton
              containerStyle={styles.button}
              action={this.onConfirm}
              disable={!isValidPrivateKey}
              text={t.DONE}
            />
            {loading && <Spinner />}
          </View>
        </TouchOutSideDismissKeyboard>
      </SafeAreaView>
    );
  }
}

const validPrivateKey = privateKey =>
  privateKey !== '' && !_.isEmpty(Checker.checkPrivateKey(privateKey));

const mapStateToProps = state => ({
  privateKey: state.walletImport.privateKey,
  isValidPrivateKey: validPrivateKey(state.walletImport.privateKey),
});

const mapDispatchToProps = _.curry(bindActionCreators)({
  ...walletImportAction,
  saveAppData: loaderAction.saveAppData,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ImportViaPrivateScreen);

const t = {
  PASTE: 'Paste',
  SCAN_QR_CODE: 'Scan QR Code',
  EXISTED_WALLET: 'Wallet already exists.',
  INVALID_PRIVATE_KEY: 'Invalid Private Key.',
  DONE: 'Done',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: AppStyle.chatBackGroundColor,
  },
  textInput: {
    height: 182,
    width: width - 40,
    backgroundColor: 'white',
    borderRadius: 14,
    color: AppStyle.lightGrey,
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
    color: AppStyle.lightGrey,
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 16,
  },
  button: {
    width: '100%',
    position: 'absolute',
    bottom: 30,
  },
  pasteButton: {
    position: 'absolute',
    right: 0,
  },
  clearButton: {
    position: 'absolute',
    right: 15,
    top: 15,
  },
});
