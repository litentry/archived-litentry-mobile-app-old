import React from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import AppStyle from '../../../commons/AppStyle';
import WelcomeInnerScreen from '../innerScreens/WelcomeInnerScreen';
import ContinueLoginInnerScreen from '../innerScreens/ContinueLoginInnerScreen';
import Connector from '../../Chat/components/Connector';
import Container from '../../../components/Container';

class StartScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerBackTitle: 'Cancel',
    headerTransparent: true,
    headerTintColor: AppStyle.userCancelGreen,
    headerStyle: {
      backgroundColor: AppStyle.userHeaderBackgroundColor,
    },
  });
  static propTypes = {
    navigation: PropTypes.object,
    isLoaded: PropTypes.bool.isRequired,
    loginToken: PropTypes.string,
  };

  renderInner() {
    const { isLoaded, loginToken } = this.props;

    if (isLoaded && !_.isEmpty(loginToken)) {
      return <ContinueLoginInnerScreen />;
    }
    return <WelcomeInnerScreen />;
  }

  render() {
    return (
      <Container hasPadding style={styles.container}>
        {this.renderInner()}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  loginToken: state.appState.loginToken,
  isLoaded: state.appState.isLoaded,
});

const mapDispatchToProps = _.curry(bindActionCreators)({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StartScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
