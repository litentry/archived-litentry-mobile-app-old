import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Modal,
  Text,
  TouchableOpacity,
  Platform,
  TextInput,
  Keyboard,
  Animated,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import PropType from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import _ from 'lodash';
import images from '../commons/Images';
import AppStyle from '../commons/AppStyle';
import { popupAction } from '../actions/popupAction';

class PopupCustom extends Component {
  static propTypes = {
    walletAddress: PropType.string,
    type: PropType.oneOf(['normal', 'input']),
    buttons: PropType.arrayOf(PropType.object),
    content: PropType.string,
    visible: PropType.bool,
    title: PropType.string,
    isAddress: PropType.bool,
    image: PropType.object,
    hidePopup: PropType.func.isRequired,
  };

  static defaultProps = {
    type: 'normal',
  };

  state = {
    valueInput: '',
    offsetY: new Animated.Value(0),
    errorMsg: '',
  };

  componentDidMount() {
    const show = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const hide = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';
    this.keyboardDidShowListener = Keyboard.addListener(show, e => this._keyboardDidShow(e));
    this.keyboardDidHideListener = Keyboard.addListener(hide, e => this._keyboardDidHide(e));
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  UNSAFE_componentWillReceiveProps() {
    console.log('should value input change now');
  }

  onChangeText = text => {
    this.setState({ valueInput: text, errorMsg: '' });
  };

  _runKeyboardAnimation(toValue) {
    // if (!isNaN(this.state.bottom)) return

    // this.setState({bottom: toValue})
    Animated.timing(
      // Animate value over time
      this.state.offsetY, // The value to drive
      {
        toValue: -toValue, // Animate to final value of 1
        duration: 250,
        useNativeDriver: true,
      }
    ).start();
  }

  _keyboardDidShow(e) {
    const value = Platform.OS === 'ios' ? e.endCoordinates.height / 2 : 0;
    this._runKeyboardAnimation(value);
  }

  _keyboardDidHide(e) {
    this._runKeyboardAnimation(0);
  }

  show(
    title = this.state.title,
    buttons = [
      {
        text: 'OK',
        onClick: () => {
          this.setState({
            visible: false,
          });
        },
      },
    ],
    content,
    type = 'normal',
    isAddress = false,
    valueInput = '',
    image = null
  ) {}

  _renderButtons = () => {
    const { type, buttons, hidePopup } = this.props;
    const { errorMsg, valueInput } = this.state;
    const buttonsView = buttons.map((btn, index) => {
      let disable = false;
      let styleTextDisable = {};
      if (index === 1 && type === 'input' && (valueInput === '' || errorMsg !== '')) {
        disable = true;
        styleTextDisable = { color: AppStyle.secondaryTextColor };
      }
      if (index === 1) {
        disable = true;
        styleTextDisable = { color: AppStyle.secondaryTextColor };
        if (valueInput === '') {
          disable = false;
          styleTextDisable = { color: AppStyle.mainColor };
        }
      }
      const lineBetween = index > 0 ? <View style={styles.line} /> : <View />;
      return (
        <View
          key={index}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            height:300,
            width: 300,
          }}>
          {lineBetween}
          <TouchableOpacity
            disabled={disable}
            style={[styles.buttonView]}
            onPress={() => {
              btn.onClick ?
              btn.onClick(valueInput) :
              hidePopup();
            }}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={[styles.textButton, styleTextDisable]}>{btn.text}</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    });
    return buttonsView;
  };

  clearText = () => {
    this.setState({ valueInput: '' });
  };

  renderIconClear = () => {
    const { valueInput } = this.state;
    if (valueInput === '') {
      return <View key="invisible" />;
    }
    return (
      <View
        key="visible"
        style={{ position: 'absolute', right: 10, top: Platform.OS === 'ios' ? 28 : 32 }}>
        <TouchableOpacity onPress={this.clearText}>
          <Image source={images.iconCloseSearch} style={styles.iconClose} />
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    const { content, visible, title, type, isAddress, image, hidePopup } = this.props;
    const { valueInput, errorMsg } = this.state;
    const contentPaddingVertical =
      type === 'input'
        ? {
            paddingTop: 18,
            paddingBottom: 12,
          }
        : {
            paddingVertical: 26,
          };
    const titleColor =
      type === 'input' ? { color: AppStyle.mainColor } : { color: AppStyle.mainTextColor };
    const contentMarginTop = type === 'input' ? { marginTop: 8 } : { marginTop: 20 };
    let fontAddress = {};
    if (isAddress) {
      fontAddress =
        Platform.OS === 'ios'
          ? { fontFamily: 'Courier New', fontWeight: 'bold' }
          : { fontFamily: 'CourierNewBold' };
    }
    const renderContent =
      type === 'input' ? (
        <Text
          numberOfLines={1}
          ellipsizeMode="middle"
          style={[styles.contentPopup, contentMarginTop, fontAddress]}>
          {content}
        </Text>
      ) : (
        <Text style={[styles.contentPopup, contentMarginTop, fontAddress]}>{content}</Text>
      );
    return (
      <Modal animationType="none" transparent visible={visible} onRequestClose={() => {}}>
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
            hidePopup();
          }}>
          <Animated.View
            style={[
              styles.overlayPopup,
              {
                transform: [
                  {
                    translateY: this.state.offsetY,
                  },
                ],
              },
            ]}>
            <View style={styles.popupCustom}>
              <View style={[styles.contentField, contentPaddingVertical]}>
                {image && (
                  <Image style={{ alignSelf: 'center', marginBottom: 20 }} source={image} />
                )}
                <Text style={[styles.titlePopup, titleColor]}>{title}</Text>
                {!_.isEmpty(content) && renderContent}
                {type === 'input' && (
                  <View>
                    <TextInput
                      autoFocus
                      autoCorrect={false}
                      style={styles.textInput}
                      underlineColorAndroid="transparent"
                      onChangeText={this.onChangeText}
                      keyboardAppearance="dark"
                      placeholder=""
                      placeholderTextColor="#4A4A4A"
                      value={valueInput}
                    />
                    {errorMsg !== '' && <Text style={styles.errorText}>{errorMsg}</Text>}
                    {this.renderIconClear()}
                  </View>
                )}
              </View>
              <View style={styles.buttonField}>{this._renderButtons()}</View>
            </View>
          </Animated.View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  visible: state.popup.visible,
  buttons: state.popup.buttons,
  content: state.popup.content,
  title: state.popup.title,
  type: state.popup.type,
  isAddress: state.popup.isAddress,
  image: state.popup.image,
});

const mapDispatchToProps = dispatch => ({
  hidePopup: _.flow(
    popupAction.hidePopup,
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PopupCustom);

const styles = StyleSheet.create({
  popupCustom: {
    width: 270,
    borderRadius: 14,
    backgroundColor: '#0A0F24',
  },
  overlayPopup: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.75)',
  },
  titlePopup: {
    fontSize: 17,
    fontFamily: 'OpenSans-SemiBold',
    textAlign: 'center',
  },
  buttonField: {
    borderTopWidth: 0.5,
    borderColor: '#14192D',
    flexDirection: 'row',
    alignItems: 'center',
    height: 43,
  },
  buttonView: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  textButton: {
    fontSize: 18,
    fontFamily: 'OpenSans-SemiBold',
    color: AppStyle.mainColor,
  },
  contentField: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 17,
  },
  line: {
    height: 43,
    width: 0.5,
    backgroundColor: '#14192D',
  },
  contentPopup: {
    fontSize: 14,
    fontFamily: Platform.OS === 'ios' ? 'OpenSans' : 'OpenSans-Regular',
    color: AppStyle.mainTextColor,
    textAlign: 'center',
  },
  textInput: {
    width: 236,
    marginTop: 20,
    paddingLeft: 10,
    paddingRight: 40,
    paddingVertical: 10,
    color: AppStyle.mainTextColor,
    fontSize: 14,
    fontFamily: 'OpenSans-SemiBold',
    backgroundColor: '#121734',
  },
  errorText: {
    fontSize: 14,
    fontFamily: 'OpenSans-SemiBold',
    color: AppStyle.errorColor,
    alignSelf: 'flex-start',
    marginTop: 10,
  },
});
