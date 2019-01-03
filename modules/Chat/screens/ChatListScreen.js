import React from 'react';
import { Button, StyleSheet, View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { Ionicons } from '@expo/vector-icons';
import AppStyle from '../../../commons/AppStyle';
import { screensList } from '../../../navigation/screensList';
import NavigationHeader from '../../../components/NavigationHeader';
import TinodeAPI from "../TinodeAPI";

class ChatListScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: <NavigationHeader title={screensList.ChatList.title} />,
    headerRight: (
      <TouchableOpacity
        style={styles.addIcon}
        onPress={() => navigation.navigate(screensList.Transactions.label)}>
        <Ionicons name="md-add" size={AppStyle.fontMiddle} color="black" />
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

  componentDidMount(){
    TinodeAPI.getTopics();
  }

  render() {
    return <View>{/*<Connector />*/}</View>;
  }
}

const mapStateToProps = state => ({
  walletAddress: state.walletAddress,
  chatList: state.chat.chatList,
});

const mapDispatchToProps = _.curry(bindActionCreators)({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatListScreen);

const styles = StyleSheet.create({
  addIcon: {
    padding: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
