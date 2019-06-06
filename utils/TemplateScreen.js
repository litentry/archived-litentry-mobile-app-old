import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { screensList } from '../../../navigation/screensList';
import HeaderButton from '../components/HeaderButton';

class TemplateScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: screensList.Wallet.title,
    headerRight: (
      <HeaderButton
        title={screensList.Transactions.title}
        onPress={() => navigation.navigate(screensList.Transactions.label)}
        color={'white'}
      />
    ),
    headerBackTitle: '',
  });

  static propTypes = {
    navigation: PropTypes.object,
  };

  render() {
    return <View style={styles.container} />;
  }
}

const mapStateToProps = state => ({
  walletAddress: state.appState.walletAddress,
});

const mapDispatchToProps = _.curry(bindActionCreators)({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TemplateScreen);

const styles = StyleSheet.create({
  container: {},
});
