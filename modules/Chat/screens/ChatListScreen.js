import React from 'react';
import { Button, StyleSheet, View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import AppStyle from '../../../commons/AppStyle';
import { screensList } from '../../../navigation/screensList';
import NavigationHeader from '../../../components/NavigationHeader';
import { Ionicons } from '@expo/vector-icons';

class ChatListScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: <NavigationHeader title={screensList.ChatList.title} />,
    headerRight: (
      <TouchableOpacity
        style={styles.addIcon}
        onPress={() => navigation.navigate(screensList.Transactions.label)}>
        <Ionicons
          name='md-add'
          size={AppStyle.fontMiddle}
          color="black"
        />
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
)(ChatListScreen);

const styles = StyleSheet.create({
  addIcon: {
    padding: 10,
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
