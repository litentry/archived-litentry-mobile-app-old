import React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Ionicons } from '@expo/vector-icons';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { walletAction } from '../actions/walletAction';
import { screensList } from '../navigation/screensList';
import AppStyle from '../commons/AppStyle';
import GenesisButton from '../components/GenesisButton';
import NavigationHeader from '../components/NavigationHeader';
import NewWalletInnerScreen from '../modules/WalletImport/screens/NewWalletInnerScreen';
import { contractInfo } from '../config';
import { getEtherBalance, getNumber, getTokenBalance } from '../utils/ethereumUtils';

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
    walletAddress: PropTypes.string.isRequired,
    updateNes: PropTypes.func.isRequired,
    updateEth: PropTypes.func.isRequired,
    nes: PropTypes.number,
    eth: PropTypes.number,
  };

  updateBalance() {
    const { walletAddress, updateNes, updateEth } = this.props;
    getTokenBalance(walletAddress)
      .then(nesBalance => updateNes(nesBalance))
      .catch(e => console.log('err', e));
    getEtherBalance(walletAddress)
      .then(ethBalance => updateEth(ethBalance))
      .catch(e => console.log('err', e));
  }

  componentDidMount() {
    const { nes, walletAddress } = this.props;
    if (!_.isNull(nes) || _.isNull(walletAddress)) return;
    this.updateBalance();
  }

  renderBalance = balance => (_.isNull(balance) ? '0' : balance.toString());

  render() {
    const { walletAddress, nes } = this.props;
    if (_.isEmpty(walletAddress)) return <NewWalletInnerScreen />;
    return (
      <View style={styles.container}>
        <View style={styles.displayContainer}>
          <View style={styles.iconContainer}>
            <Ionicons name="logo-yen" size={32} color={AppStyle.walletBackgroundColor} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.balanceText}>Balance</Text>
            <Text style={styles.amountText}>{this.renderBalance(nes)}</Text>
            <Text style={styles.walletAddress}>Public Address: {walletAddress}</Text>
          </View>
        </View>
        <View style={styles.actionsContainer}>
          {/*<GenesisButton*/}
          {/*action={()=> {}}*/}
          {/*text={'Receive'}*/}
          {/*style={{ marginTop: 50 }}*/}
          {/*/>*/}
          {/*<GenesisButton action={()=>{}} text={'Send'} disabled />*/}
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  walletAddress: state.appState.walletAddress,
  nes: state.wallet.nes,
  eth: state.wallet.eth,
});

const mapDispatchToProps = _.curry(bindActionCreators)({
  updateNes: walletAction.updateNes,
  updateEth: walletAction.updateEth,
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
    fontWeight: 'bold',
  },
  amountText: {
    fontSize: AppStyle.fontSmall,
    color: 'white',
    fontWeight: 'bold',
  },
  walletAddress: {
    fontSize: AppStyle.fontSmall,
    color: 'white',
    fontWeight: 'bold',
  },
});
