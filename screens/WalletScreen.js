import React from 'react';
import { Text, View, Button } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { walletAction } from '../actions/wallet';
import { navigationText } from '../constants/Text';

class WalletScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  static propTypes = {
    wallet: PropTypes.object.isRequired,
    testAddEth: PropTypes.func.isRequired,
    navigation: PropTypes.object,
  };

  render() {
    const { wallet } = this.props;
    return (
      <View style={styles.container}>
        <Text>{'wallet value  ' + wallet.eth}</Text>
        <Button title="Plus one" onPress={this.props.testAddEth} />
        <Button
          title={t.createButtonLabel}
          onPress={() => this.props.navigation.navigate(navigationText.CreateWallet.label)}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  wallet: state.wallet,
});

const mapDispatchToProps = dispatch => ({
  testAddEth: () => dispatch(walletAction.testAddEth()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WalletScreen);

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
};

const t = {
  createButtonLabel: 'create Wallet',
};
