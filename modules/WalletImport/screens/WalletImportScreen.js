import React, { Component } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import SmallCard from '../../../components/SmallCard';
import Images from '../../../commons/Images';
import AppStyle from '../../../commons/AppStyle';
import { screensList } from '../../../navigation/screensList';
import Container from '../../../components/Container';

export default class WalletImportScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object,
  };

  static navigationOptions = {
    title: screensList.WalletImport.title,
    headerBackTitle: null,
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container style={styles.container}>
        <SmallCard
          style={styles.card}
          title={t.titlePrivateKey}
          subtitle={t.contentPrivateKey}
          imageCard={Images.iconPrivateKey}
          onPress={() => navigate(screensList.ImportViaPrivate.label)}
        />

        <SmallCard
          style={styles.card}
          title={t.titleMnemonicPhrase}
          subtitle={t.contentMnemonicPhrase}
          imageCard={Images.iconMnemonic}
          onPress={() => navigate(screensList.ImportViaMnemonic.label)}
        />
      </Container>
    );
  }
}

const t = {
  titlePrivateKey: 'Private Key',
  contentPrivateKey:
    'Scan or enter your Private Key to restore your wallet. Make sure to keep your Private Key safe after you are done.',
  titleMnemonicPhrase: 'Mnemonic Phrase',
  contentMnemonicPhrase:
    'Enter your Mnemonic Phrase to recover your wallet. Make sure to keep your Mnemonic Phrase safe after you are done.',
  titleAddressOnly: 'Address Only',
  contentAddressOnly:
    'Scan or enter your wallet address to monitor it. This is a view only wallet and transaction cannot be sent without a Private Key.',
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppStyle.mainBackgroundColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    height: 174,
    marginTop: 20,
  },
  subtitle: {
    marginTop: 10,
  },
});
