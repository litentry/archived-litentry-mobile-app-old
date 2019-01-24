import React from 'react';
import PropTypes from 'prop-types';
import {
  Clipboard,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import _ from 'lodash';
import { AntDesign } from '@expo/vector-icons';
import { withNavigation } from 'react-navigation';
import AppStyle from '../../../commons/AppStyle';
import { screensList } from '../../../navigation/screensList';
import { lockScreen } from '../../Unlock/lockScreenUtils';
import LightButton from '../../../components/LightButton';
import GenesisButton from '../../../components/GenesisButton';
import Spinner from '../../../components/Spinner';
import KeyboardView from '../../../components/KeyboardView';
import TouchOutSideDismissKeyboard from '../../../components/TouchOutSideDismissKeyboard';

const { width } = Dimensions.get('window');

const initState = {
  loading: false,
  input: '',
};

class TextWithQRInput extends React.Component {
  static propTypes = {
    generateKey: PropTypes.func.isRequired,
    validate: PropTypes.func.isRequired,
    nextScreen: PropTypes.string.isRequired,
    errorText: PropTypes.string.isRequired,
    navigation: PropTypes.object.isRequired,
  };

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = initState;
  }

  onPaste = async () => {
    const content = await Clipboard.getString();
    if (content) {
      this.onChangeInput(content);
    }
  };

  clearText = () => {
    this.onChangeInput('');
  };

  onChangeInput = input => {
    this.setState({ input });
  };

  gotoScan = () => {
    this.props.navigation.navigate(screensList.ScanQRCode.label, {
      onChangePrivateKey: this.onChangeInput.bind(this),
    });
  };

  onConfirm = () => {
    const { navigation, generateKey, nextScreen } = this.props;
    const { input } = this.state;

    generateKey(input)
      .then(() => lockScreen(navigation))
      .then(() => {
        this.setState(initState);
        navigation.navigate(nextScreen);
      })
      .catch(e => {
        console.log(e);
        this.setState(initState);
      });
  };

  render() {
    const { validate, errorText } = this.props;
    const { loading, input } = this.state;
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
                  onChangeText={this.onChangeInput}
                  value={input}
                />
                {input === '' ? <PasteButton /> : <ClearButton />}
              </View>
              {!validate(input) && <Text style={styles.errorText}>{errorText}</Text>}
              <LightButton onPress={this.gotoScan} text={t.SCAN_QR_CODE} />
            </KeyboardView>
            <GenesisButton
              containerStyle={styles.button}
              action={this.onConfirm}
              disable={input === '' || !validate(input)}
              text={t.DONE}
            />
            <Spinner visible={loading} />
          </View>
        </TouchOutSideDismissKeyboard>
      </SafeAreaView>
    );
  }
}

export default withNavigation(TextWithQRInput);

const t = {
  PASTE: 'Paste',
  SCAN_QR_CODE: 'Scan QR Code',
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
