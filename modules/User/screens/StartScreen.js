import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import AppStyle from '../../../commons/AppStyle';
import { screensList } from '../../../navigation/screensList';
import NavigationHeader from '../../../components/NavigationHeader';

class StartScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: <NavigationHeader title={screensList.Start.title} />,
    headerBackTitle: '',
    headerRight: (
      <Button
        onPress={() => navigation.navigate(screensList.CreateAccount.label)}
        title={screensList.CreateAccount.title}
        color="black"
      />
    ),
    headerStyle: {
      backgroundColor: AppStyle.userHeaderBackgroundColor,
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

const mapDispatchToProps = _.curry(bindActionCreators)({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StartScreen);

const styles = StyleSheet.create({});
