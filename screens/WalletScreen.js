import React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Ionicons } from '@expo/vector-icons';
import { walletAction } from '../actions/walletAction';
import _ from 'lodash';
import { screensList } from '../navigation/screensList';
import AppStyle from '../commons/AppStyle';
import GenesisButton from '../components/GenesisButton';
import NavigationHeader from '../components/NavigationHeader';
import WalletCreateInnerScreen from '../modules/WalletImport/screens/WalletCreateInnerScreen';

class WalletScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: <NavigationHeader title={screensList.Wallet.title} />,
    headerRight: (
      <Button
        onPress={() => navigation.navigate(screensList.Transactions.label)}
        title={screensList.Transactions.title}
        color="black"
      />
    ),
    headerBackTitle: '',
    headerStyle: {
      backgroundColor: AppStyle.backgroundColor,
    },
  });

  static propTypes = {
    navigation: PropTypes.object,
    publicKey: PropTypes.string.isRequired,
  };

  receiveTransaction = () => {};

  sendTransaction = () => {};

  render() {
    const { publicKey } = this.props;
    if(_.isEmpty(publicKey))
      return <WalletCreateInnerScreen/>
    return (
      <View style={styles.container}>
        <View style={styles.displayContainer}>
          <View style={styles.iconContainer}>
            <Ionicons name="logo-yen" size={32} color={AppStyle.walletBackgroundColor} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.balanceText}>Balance</Text>
            <Text style={styles.amountText}>325.67</Text>
          </View>
        </View>
        <View style={styles.actionsContainer}>
          <GenesisButton
            action={this.receiveTransaction}
            text={'Receive'}
            style={{ marginTop: 50 }}
          />
          <GenesisButton action={this.sendTransaction} text={'Send'} disabled />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  publicKey: state.appState.publicKey,
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WalletScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppStyle.backgroundColor,
  },
  displayContainer: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppStyle.walletBackgroundColor,
  },
  actionsContainer: {
    flex: 7,
  },
  iconContainer: {
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    backgroundColor: 'white',
  },
  textContainer: {
    margin: 10,
    alignItems: 'center',
  },
  balanceText: {
    fontSize: AppStyle.fontMiddle,
    color: 'white',
    fontWeight: 'bold',
  },
  amountText: {
    fontSize: AppStyle.fontSmall,
    color: 'white',
    fontWeight: 'bold',
  },
});
