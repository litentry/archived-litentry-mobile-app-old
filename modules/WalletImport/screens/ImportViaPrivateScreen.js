import React, { Component } from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import Checker from '../../../utils/Checker';
import { screensList } from '../../../navigation/screensList';
import { walletImportAction } from '../walletImportAction';
import { loaderAction } from '../../../actions/loaderAction';
import { getPublicKeyFromPrivateKey } from '../../../utils/ethereumUtils';
import { dataEntry } from '../../../reducers/loader';
import TextWithQRInput from "../components/TextWithQRInput";

class ImportViaPrivateScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    saveAppData: PropTypes.func.isRequired,
  };

  static navigationOptions = {
  };

  onUnlock = (privateKey) => {
    const {saveAppData} = this.props;
    //TODO now I should get the public key and then save it into loader;s place and save private key into secure store.
    // and then split the default screen into two different screens.
    const publicKey = getPublicKeyFromPrivateKey(privateKey);
    saveAppData({ [dataEntry.publicKey.stateName]: publicKey });
  }

  validate = (privateKey) => privateKey === '' || !_.isEmpty(Checker.checkPrivateKey(privateKey));

  render() {
    return <TextWithQRInput onUnlock={this.onUnlock} validate={this.validate} nextScreen={screensList.Wallet.label} errorText={t.INVALID_PRIVATE_KEY}/>
  }
}

const mapStateToProps = state => ({
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
  INVALID_PRIVATE_KEY: 'Invalid Private Key.',
};


