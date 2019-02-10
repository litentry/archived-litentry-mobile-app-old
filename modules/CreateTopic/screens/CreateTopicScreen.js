import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import AppStyle from '../../../commons/AppStyle';
import { screensList } from '../../../navigation/screensList';
import NavigationHeader from '../../../components/NavigationHeader';
import TopicInnerScreen from '../../../InnerScreens/TopicInnerScreen';

class CreateTopicScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: <NavigationHeader title={screensList.CreateTopic.title} />,
    headerBackTitle: '',
  });

  static propTypes = {
    navigation: PropTypes.object,
  };

  render() {
    return (
      <TopicInnerScreen
        description={t.DESCRIPTION}
        topic={{}}
        allowEdit
        isJoined={false}
        iconName="addfile"
      />
    );
  }
}

const mapStateToProps = state => ({
  walletAddress: state.appState.walletAddress,
});

const mapDispatchToProps = _.curry(bindActionCreators)({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateTopicScreen);

const styles = StyleSheet.create({
  container: {},
});

const t = {
  DESCRIPTION: 'Create a new country',
};
