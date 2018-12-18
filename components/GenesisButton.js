import React, { Component } from 'react';
import { TouchableOpacity, View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import AppStyle from '../commons/AppStyle';

const { height, width } = Dimensions.get('window');
const isSmallScreen = height < 569;

const VariantList = {
  CONFIRM: 'confirm',
  CANCEL: 'cancel',
};

const getBackgroundColor = (variant, disabled) => {
  if (disabled) return AppStyle.variantDisable;
  switch (variant) {
    case VariantList.CONFIRM:
      return AppStyle.variantConfirm;
    case VariantList.CANCEL:
      return AppStyle.variantCancel;
    default:
      return AppStyle.variantConfirm;
  }
};

export default class GenesisButton extends Component {
  static propTypes = {
    action: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
    style: PropTypes.object,
    styleText: PropTypes.object,
    disabled: PropTypes.bool,
    variant: PropTypes.oneOf(Object.values(VariantList)),
  };

  render() {
    const { disabled, variant, action, style, styleText, text } = this.props;
    return (
      <TouchableOpacity disabled={disabled} onPress={() => action()} style={styles.canvas}>
        <View
          style={[
            styles.container,
            { backgroundColor: getBackgroundColor(variant, disabled) },
            style,
          ]}>
          <Text style={[styles.buttonText, styleText]}>{text}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  canvas: {},
  container: {
    borderRadius: 5,
    flexDirection: 'row',
    height: isSmallScreen ? 30 : 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: width * 0.05,
    marginHorizontal: width * 0.05,
    paddingHorizontal: isSmallScreen ? 15 : 25,
  },
  buttonText: {
    fontSize: isSmallScreen ? 10 : AppStyle.fontMiddle,
    // fontFamily: 'OpenSans-Regular',
    color: 'white',
  },
});
