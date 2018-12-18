import React from 'react';
import { StyleSheet, ListView, View, Text } from 'react-native';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import AppStyle from '../../../commons/AppStyle';
import { screensList } from '../../../navigation/screensList';
import NavigationHeader from '../../../components/NavigationHeader';

class TransactionsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: <NavigationHeader title={screensList.Transactions.title} />,
    headerBackTitle: '',
    headerStyle: {
      backgroundColor: AppStyle.backgroundColor,
    },
  });

  static propTypes = {
    navigation: PropTypes.object,
  };

  renderRow(transaction) {
    const timeObject = new Date(transaction.date);
    const timeText = timeObject.toISOString();
    const signText = transaction.subType === 'send' ? '+' : '-';
    const color = transaction.subType === 'send' ? AppStyle.variantConfirm : AppStyle.variantCancel;
    return (
      <View style={styles.rowContainer}>
        <View style={styles.transactionInfo}>
          <Text style={styles.typeText}>{transaction.type}</Text>
          <Text style={styles.dateText}>{timeText}</Text>
        </View>
        <View style={styles.amountDisplay}>
          <Text style={[styles.amountText, { color }]}>{`${signText} ${transaction.value}`}</Text>
        </View>
      </View>
    );
  }

  render() {
    return <ListView style={styles.container} dataSource={mockData} renderRow={this.renderRow} />;
  }
}

const ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2,
});

const mockData = ds.cloneWithRows([
  {
    type: 'Transfer',
    date: 1545106999285,
    value: '1000.02',
    subType: 'receive',
  },
  {
    type: 'Transfer',
    date: 1545107077423,
    value: '5000.09',
    subType: 'send',
  },
]);

const mapStateToProps = state => ({
  // transactionsData: ds.cloneWithRows(state.transactions.transactionsData)
});

const mapDispatchToProps = _.curry(bindActionCreators)({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TransactionsScreen);

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  rowContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: AppStyle.superLightGrey,
  },
  transactionInfo: {
    flex: 3,
    justifyContent: 'flex-start',
  },
  typeText: {
    fontSize: AppStyle.fontMiddle,
    paddingTop: 15,
    paddingHorizontal: 15,
  },
  dateText: {
    padding: 15,
    fontSize: AppStyle.fontSmall,
    color: AppStyle.lightGrey,
  },
  amountDisplay: {
    flex: 2,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 20,
  },
  amountText: {
    fontSize: AppStyle.fontMiddle,
  },
});
