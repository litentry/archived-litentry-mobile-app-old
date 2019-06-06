import React from 'react';
import {
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { AntDesign } from '@expo/vector-icons';
import { Header } from 'react-navigation';
import AppStyle from '../../../commons/AppStyle';
import { screensList } from '../../../navigation/screensList';
import LockListNode from '../components/LockListNode';
import { loaderAction } from '../../../actions/loaderAction';
import ActionButton from '../../../components/ActionButton';
import Container from '../../../components/Container';

class LockListScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: screensList.LockList.title,
    headerBackTitle: ' ',
  });

  static propTypes = {
    navigation: PropTypes.object,
    locksMap: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
    };
  }

  componentDidMount() {}

  onRefresh = () => {};

  render() {
    const { locksMap, navigation } = this.props;
    const sortedList = _.values(locksMap).sort((a, b) => {
      //TODO add timestamp sorting
      const dateA = a.created || new Date(0);
      const dateB = b.created || new Date(0);
      return dateA.getTime() < dateB.getTime();
    });

    return (
      <Container
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} />
        }>
        <FlatList
          style={styles.listContainer}
          data={sortedList}
          extraData={sortedList}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.lockNode,
                { backgroundColor: item.isValid ? 'white' : AppStyle.mainBackgroundColor },
              ]}
              onPress={() =>
                navigation.navigate(screensList.Lock.label, {
                  lockId: item.id,
                  title: item.description,
                })
              }>
              <LockListNode lockNode={item} />
            </TouchableOpacity>
          )}
        />
        <View style={styles.actionButton}>
          <ActionButton
            buttonColor={AppStyle.backgroundRed}
            title={t.ADD_BUTTON}
            onPress={() => navigation.navigate(screensList.CreateLock.label)}
          />
        </View>
      </Container>
    );
  }
}

const t = {
  ADD_BUTTON: 'Add',
};

const mapStateToProps = state => ({
  walletAddress: state.appState.walletAddress,
  locksMap: state.lock.locksMap,
  // userId: state.appState.userId,
});

const mapDispatchToProps = _.curry(bindActionCreators)({
  clearAppData: loaderAction.clearAppData,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LockListScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  createTopicIconContainer: {
    height: Header.HEIGHT,
    paddingRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  createTopicIcon: {},
  listContainer: {
    flex: 1,
  },
  addIcon: {
    padding: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lockNode: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: AppStyle.chatBorder,
  },
  actionButton: {
    position: 'absolute',
    right: AppStyle.actionButtonRight,
    bottom: AppStyle.actionButtonBottom,
  },
});
