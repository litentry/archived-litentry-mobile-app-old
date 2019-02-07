import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Modal, Text, TouchableHighlight } from 'react-native';
import _ from 'lodash';
import connect from 'react-redux/es/connect/connect';
import { popupAction } from '../actions/popupAction';
import AppStyle from '../commons/AppStyle';

class PopupModal extends React.Component {
  static propTypes = {
    content: PropTypes.string,
    visible: PropTypes.bool,
    hidePopup: PropTypes.func.isRequired,
    onPress: PropTypes.func,
  };

  static defaultProps = {
    onPress: () => {},
  };

  render() {
    const { visible, content, hidePopup, onPress } = this.props;
    return (
      <View style={styles.marginTop}>
        <Modal animationType="slide" transparent visible onRequestClose={hidePopup}>
          <View style={styles.overlay}>
            <View style={styles.innerContainer}>
              <View style={styles.contentContainer}>
                <Text style={styles.contentText}>{content}</Text>
              </View>
              <TouchableHighlight
                onPress={() => {
                  hidePopup();
                  onPress();
                }}
                style={styles.buttonContainer}>
                <Text style={styles.buttonText}>{t.BUTTON_OK}</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  marginTop: { marginTop: 22 },
  overlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.75)',
  },
  innerContainer: {
    width: '60%',
    height: 150,
    alignItems: 'stretch',
  },
  contentContainer: {
    paddingHorizontal: 10,
    flex: 2,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentText: {
    color: AppStyle.lightGrey,
    fontSize: AppStyle.fontMiddleSmall,
    fontFamily: AppStyle.mainFont,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: AppStyle.userCancelGreen,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: AppStyle.fontMiddle,
    fontFamily: AppStyle.mainFont,
  },
});

const t = {
  BUTTON_OK: 'OK',
};

const mapStateToProps = state => ({
  visible: state.popup.visible,
  content: state.popup.content,
  onPress: state.popup.onPress,
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
)(PopupModal);
