import React from 'react';
import { Text, View, StyleSheet,} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { walletAction } from '../actions/walletAction';
import { screensList } from '../navigation/screensList';
import { Ionicons } from '@expo/vector-icons'
import AppStyle from "../commons/AppStyle";
import GenesisButton from "../components/GenesisButton";

const t = {
  createButtonLabel: 'create Wallet',
};

class WalletScreen extends React.Component {
  static navigationOptions = {
    title: screensList.Wallet.title,
  };

  static propTypes = {
    testAddEth: PropTypes.func.isRequired,
    navigation: PropTypes.object,
  };

  receiveTransaction = () => {}

  sendTransaction = () => {}

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.displayContainer}>
          <View style={styles.iconContainer}>
            <Ionicons name="logo-yen" size={32} color={AppStyle.walletBackgroundColor}/>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.balanceText}>Balance</Text>
            <Text style={styles.amountText}>325.67</Text>
          </View>
        </View>
        <View style={styles.actionsContainer}>
          <GenesisButton action={this.receiveTransaction} text={'Receive'} style={{marginTop: 50}}/>
          <GenesisButton action={this.sendTransaction} text={'Send'} disabled/>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  walletAddress: state.walletAddress,
});

const mapDispatchToProps = dispatch => ({
  testAddEth: () => dispatch(walletAction.testAddEth()),
});

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
    fontWeight: 'bold'
  },
  amountText: {
    fontSize: AppStyle.fontSmall,
    color: 'white',
    fontWeight: 'bold'
  }
});
