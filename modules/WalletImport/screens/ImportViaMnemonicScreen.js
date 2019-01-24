import React, { Component } from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { screensList } from '../../../navigation/screensList';
import { walletImportAction } from '../walletImportAction';
import { loaderAction } from '../../../actions/loaderAction';
import { getPublicKeyFromMnemonic } from '../../../utils/ethereumUtils';
import { dataEntry } from '../../../reducers/loader';
import TextWithQRInput from '../components/TextWithQRInput';
import {savePrivateKeyAsync} from "../../../utils/secureStoreUtils";

class ImportViaMnemonicScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    saveAppData: PropTypes.func.isRequired,
  };

  static navigationOptions = {};

  generateKey = privateKey =>
    new Promise((resolve, reject) => {
      const { saveAppData } = this.props;
      //TODO now I should get the public key and then save it into loader;s place and save private key into secure store.
      // and then split the default screen into two different screens.
      const wallet = getPublicKeyFromMnemonic(privateKey);
      if (!wallet) {
        return reject();
      }
      const publicKey = wallet.address;
      saveAppData({ [dataEntry.publicKey.stateName]: publicKey });
      return resolve(wallet);
    });

  validate = mnemonicPhrase =>
    mnemonicPhrase === '' || mnemonicPhrase.trim().split(' ').length === 12;

  render() {
    return (
      <TextWithQRInput
        generateKey={this.generateKey.bind(this)}
        validate={this.validate}
        nextScreen={screensList.Wallet.label}
        errorText={t.INVALID_MNEMONIC_PHRASE}
      />
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = _.curry(bindActionCreators)({
  ...walletImportAction,
  saveAppData: loaderAction.saveAppData,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ImportViaMnemonicScreen);

const t = {
  INVALID_MNEMONIC_PHRASE: 'Invalid Mnemonic Phrase, expect 12 words.',
};
