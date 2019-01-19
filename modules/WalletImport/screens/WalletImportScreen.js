import React, { Component } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import SmallCard from '../../../components/SmallCard';
import Images from '../../../commons/Images';
import AppStyle from '../../../commons/AppStyle';
import { screensList } from '../../../navigation/screensList';

export default class WalletImportScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object,
  };

  static navigationOptions = {
    title: screensList.WalletImport.title,
    headerBackTitle: null,
  };

  gotoImportPrivate = () => this.props.navigation.navigate(screensList.ImportViaPrivate.label);

  gotoImportMnemonic = () => this.props.navigation.navigate('ImportViaMnemonicScreen');

  goBack = () => this.props.navigation.navigate.goBack();

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <SmallCard
              style={{ height: 174, marginTop: 20 }}
              title={t.titlePrivateKey}
              subtitle={t.contentPrivateKey}
              imageCard={Images.iconPrivateKey}
              onPress={this.gotoImportPrivate}
              imageBackground="backgroundCard"
              imageBackgroundStyle={{ height: 174 }}
              titleTextStyle={{ color: AppStyle.mainColor }}
              subtitleTextStyle={{
                color: AppStyle.secondaryTextColor,
                marginTop: 10,
              }}
            />

            <SmallCard
              style={{ height: 174, marginTop: 20 }}
              title={t.titleMnemonicPhrase}
              subtitle={t.contentMnemonicPhrase}
              imageCard={Images.iconMnemonic}
              onPress={this.gotoImportMnemonic}
              titleTextStyle={{ color: AppStyle.mainTextColor }}
              subtitleTextStyle={{
                color: AppStyle.secondaryTextColor,
                marginTop: 10,
              }}
            />
          </View>
        </ScrollView>
      </View>
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
    flex: 1,
  },
});
