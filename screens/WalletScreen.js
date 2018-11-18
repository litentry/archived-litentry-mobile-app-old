import React from 'react';
import { Text, View, Button } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { walletAction } from '../actions/wallet';

class WalletScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    const { wallet } = this.props;
    return (
      <View style={styles.container}>
        <Text>{'wallet value  ' + wallet.eth}</Text>
        <Button title="Plus one" onPress={this.props.testAddEth} />
      </View>
    );
  }
}

WalletScreen.propTypes = {
  wallet: PropTypes.object.isRequired,
  testAddEth: PropTypes.func.isRequired,
};

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
};

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
