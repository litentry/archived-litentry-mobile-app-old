import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { Wallet } from 'ethers';
import { NavigationActions, StackActions } from 'react-navigation';
import AppStyle from '../../../commons/AppStyle';
import { screensList } from '../../../navigation/screensList';
import NavigationHeader from '../../../components/NavigationHeader';
import { dataEntry } from '../../../reducers/loader';
import { saveMnemonicAsync, savePrivateKeyAsync } from '../../../utils/secureStoreUtils';
import { lockScreen } from '../../Unlock/lockScreenUtils';
import { loaderAction } from '../../../actions/loaderAction';

class WalletCreateScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: <NavigationHeader title={screensList.WalletCreate.title} />,
    headerBackTitle: '',
    headerStyle: {
      backgroundColor: AppStyle.backgroundColor,
    },
  });

  static propTypes = {
    navigation: PropTypes.object.isRequired,
    saveAppData: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { saveAppData, navigation } = this.props;

    const createWallet = new Promise((resolve, reject) => {
      //TODO now I should get the public key and then save it into loader;s place and save private key into secure store.
      // and then split the default screen into two different screens.
      const wallet = Wallet.createRandom();
      if (!wallet) {
        return reject();
      }
      saveAppData({
        [dataEntry.walletAddress.stateName]: wallet.address,
        [dataEntry.publicKey.stateName]: wallet.signingKey.publicKey,
      });
      return resolve(wallet);
    });

    createWallet
      .then(
        wallet =>
          new Promise((resolve, reject) => {
            savePrivateKeyAsync(
              wallet.privateKey,
              () => {
                resolve(wallet);
              },
              reject
            );
          })
      )
      .then(
        wallet =>
          new Promise((resolve, reject) => {
            saveMnemonicAsync(
              wallet.mnemonic,
              () => {
                resolve(wallet);
              },
              reject
            );
          })
      )
      .then(wallet => {
        console.log('all save successfully, wallet is', wallet);
        return lockScreen(navigation);
      })
      .then(() => {
        const resetAction = StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: screensList.Wallet.label })],
        });
        navigation.dispatch(resetAction);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Creating new wallet...</Text>
      </View>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = _.curry(bindActionCreators)({
  saveAppData: loaderAction.saveAppData,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WalletCreateScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppStyle.chatBackGroundColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: AppStyle.fontMiddleSmall,
    fontFamily: AppStyle.mainFont,
  },
});
