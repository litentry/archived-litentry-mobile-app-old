import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import AppStyle from '../commons/AppStyle';
import { screensList } from '../navigation/screensList';
import NavigationHeader from '../components/NavigationHeader';
import { walletImportAction } from '../modules/WalletImport/walletImportAction';

class TemplateScreen extends React.Component {
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
  };

  render() {
    return <View />;
  }
}

const mapStateToProps = state => ({
  walletAddress: state.walletAddress,
});

const mapDispatchToProps = _.curry(bindActionCreators)({
  setPrivateKey: walletImportAction.setPrivateKey,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TemplateScreen);

const styles = StyleSheet.create({});
