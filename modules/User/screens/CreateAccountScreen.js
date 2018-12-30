import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import AppStyle from '../../../commons/AppStyle';
import { screensList } from '../../../navigation/screensList';
import NavigationHeader from '../../../components/NavigationHeader';

class CreateAccountScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    // headerTitle: <NavigationHeader title={''} />,
    headerTransparent: true,
    headerTintColor: 'black',
    headerBackImage: null,
    headerBackTitle: 'Back Back Back ',
    headerStyle: {
      backgroundColor: AppStyle.userHeaderBackgroundColor,
    },
  });

  static propTypes = {
    navigation: PropTypes.object,
  };

  render() {
    return <View style={styles.container}/>;
  }
}

const mapStateToProps = state => ({
  walletAddress: state.walletAddress,
});

const mapDispatchToProps = _.curry(bindActionCreators)({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateAccountScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  }
});
