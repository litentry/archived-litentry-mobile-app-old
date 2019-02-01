import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import AppStyle from '../../../commons/AppStyle';
import { screensList } from '../../../navigation/screensList';
import NavigationHeader from '../../../components/NavigationHeader';

class TreasureScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: <NavigationHeader title={screensList.Wallet.title} />,
    headerRight: (
      <TouchableOpacity
        onPress={() => navigation.navigate(screensList.Transactions.label)}
      >
        <Text style={styles.headerButtonText}>{screensList.Transactions.title}</Text>
      </TouchableOpacity>
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
)(TreasureScreen);

const styles = StyleSheet.create({
  container: {},
  headerButtonText: {
    fontSize: AppStyle.fontMiddleSmall,
    padding: 5,
    fontFamily: AppStyle.mainFont,
    color: 'black'
  },
});
