import React from 'react';
import { Button, StyleSheet, View, Text, TextInput } from 'react-native';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { screensList } from '../../../navigation/screensList';
import HeaderButton from '../../../components/HeaderButton';
import TextWithQRInput from '../../WalletImport/components/TextWithQRInput';
import { saveLockMnemonicAsync, saveLockPrivateKeyAsync } from '../../../utils/secureStoreUtils';
import { getAddressFromPrivateKey } from '../../../utils/ethereumUtils';
import { dataEntry } from '../../../reducers/loader';
import Checker from '../../../utils/Checker';

class CreateLockScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: screensList.CreateLock.title,
    headerRight: (
      <HeaderButton
        title={'DONE'}
        onPress={() => navigation.navigate(screensList.Transactions.label)}
        color={'white'}
      />
    ),
    headerBackTitle: '',
  });

  static propTypes = {
    navigation: PropTypes.object,
    locks: PropTypes.object.isRequired,
    saveAppData: PropTypes.func.isRequired,
  };

  generateKey = (privateKey, description) =>
    new Promise((resolve, reject) => {
      const { saveAppData, locks } = this.props;
      //TODO now I should get the public key and then save it into loader;s place and save private key into secure store.
      // and then split the default screen into two different screens.
      const wallet = getAddressFromPrivateKey(privateKey);
      if (!wallet) {
        return reject();
      }
      const newLocksMap = _.assign({}, locks, {
        [wallet.address]: {
          publicKey: wallet.signingKey.publicKey,
          description,
        },
      });
      saveAppData({
        [dataEntry.locks.stateName]: newLocksMap,
      });
      return resolve(wallet);
    });

  validate = privateKey => privateKey === '' || !_.isEmpty(Checker.checkPrivateKey(privateKey));

  render() {
    return (
      <TextWithQRInput
        generateKey={this.generateKey.bind(this)}
        validate={this.validate}
        errorText={t.INVALID_PRIVATE_KEY}
        saveMnemonic={saveLockMnemonicAsync}
        savePrivateKey={saveLockPrivateKeyAsync}
        nextScreenLabel={screensList.DefinitionList.label}
      />
    );
  }
}

const t = {
  PRIVATE_KEY: 'Private key',
  DESCRIPTION: 'Description',
  INVALID_PRIVATE_KEY: 'Invalid Private Key.',
};

const mapStateToProps = state => ({
  walletAddress: state.appState.walletAddress,
  locks: state.appState.locks,
});

const mapDispatchToProps = _.curry(bindActionCreators)({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateLockScreen);

const styles = StyleSheet.create({
  container: {},
});
