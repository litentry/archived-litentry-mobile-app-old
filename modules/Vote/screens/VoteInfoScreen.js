import React from 'react';
import {TouchableOpacity, StyleSheet, View, Text, ScrollView, Alert} from 'react-native';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { AntDesign } from '@expo/vector-icons';
import AppStyle from '../../../commons/AppStyle';
import { screensList } from '../../../navigation/screensList';
import NavigationHeader from '../../../components/NavigationHeader';
import MultiLineButton from '../../../components/MultiLineButton';
import MemberList from '../../../components/MemberList';
import LightButton from '../../../components/LightButton';
import GenesisButton, {VariantList} from "../../../components/GenesisButton";
import {lockScreen} from "../../Unlock/lockScreenUtils";
import {aboutInfo} from "../../../config";
import {INIT_VALUE} from "../reducer/voteReducer";
import {popupAction} from "../../../actions/popupAction";

const locale = window.navigator.language;
const mock = {
  id: '100012',
  expires: new Date().toLocaleTimeString(locale, {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
  }),
};

class VoteInfoScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: <NavigationHeader title={screensList.VoteInfo.title} />,
    headerBackTitle: ' ',
    headerStyle: {
      backgroundColor: AppStyle.backgroundColor,
    },
  });

  static propTypes = {
    navigation: PropTypes.object,
    userName: PropTypes.string,
    topicsMap: PropTypes.object.isRequired,
    subscribedChatId: PropTypes.string,

    walletAddress: PropTypes.string,
    showPopup: PropTypes.func.isRequired,
  };

  buildSupportTitle = (number, rate) => `${number} (${Number(rate * 100).toFixed(2)}%)`;

  onPayment() {
    const { navigation, showPopup, walletAddress } = this.props;
    Alert.alert(
      'Payment',
      `${INIT_VALUE.origin.voteCost} NES`,
      [
        {
          text: 'Pay now',
          onPress: () => {
            if (_.isEmpty(walletAddress)) {
              showPopup(t.NO_WALLET);
            } else {
              lockScreen(navigation).then(() => {
                showPopup(aboutInfo.todo);
              });
            }
          },
        },
      ],
      { cancelable: false }
    );
  }

  render() {
    const { topicsMap, navigation, subscribedChatId, userName } = this.props;
    const topic = _.get(topicsMap, subscribedChatId);
    if (!topic) return null;
    const renderList = [
      { title: t.VOTE_ID_TITLE, value: mock.id },
      { title: t.OWNER_TITLE, value: userName },
      { title: t.EXPIRES_TITLE, value: mock.expires },
    ];

    //TODO only in test that yes + no = 1
    const mockYesRate = 0.66666;
    const supportNumber = Math.round(topic.subs.length * mockYesRate);
    const mockNoRate = 0.33333;
    const denyNumber = Math.round(topic.subs.length * mockNoRate);
    const mockYesList = _.take(topic.subs, supportNumber);
    const mockNoList = _.drop(topic.subs, supportNumber);

    const SupportList = props => (
      <View style={styles.supportListContainer}>
        <View style={styles.listTitleContainer}>
          <Text style={styles.listTitleText}>{props.titleText}</Text>
          <Text style={styles.listSubtitleText}>{props.supportRateText}</Text>
        </View>
        <View style={styles.supportList}>
          <MemberList list={props.list} limit={12} />
          {props.list.length > 12 && <LightButton
            onPress={() =>
              navigation.navigate(screensList.Members.label, {
                list: props.list,
              })
            }
            text={t.VIEW_MORE_MEMBERS}
          />}
        </View>
      </View>
    );

    return (
      <ScrollView style={styles.container}>
        <View style={styles.voteContainer}>
          <MultiLineButton renderList={renderList} onPress={() => {}} />
        </View>
        <SupportList
          titleText={t.YES}
          supportRateText={this.buildSupportTitle(supportNumber, mockYesRate)}
          list={mockYesList}
        />
        <SupportList
          titleText={t.NO}
          supportRateText={this.buildSupportTitle(denyNumber, mockNoRate)}
          list={mockNoList}
        />
        <GenesisButton action={()=>this.onPayment()} text={t.YES_BUTTON} variant={VariantList.CONFIRM}/>
        <GenesisButton action={()=>this.onPayment()} text={t.NO_BUTTON} variant={VariantList.CANCEL}/>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  topicsMap: state.topics.topicsMap,
  userInfo: state.chat.userInfo,
  userName: state.chat.userInfo.name,
  subscribedChatId: state.chat.subscribedChatId,
  walletAddress: state.appState.walletAddress,
});

const mapDispatchToProps = _.curry(bindActionCreators)({
  showPopup: popupAction.showPopup,
});

const t = {
  VOTE_ID_TITLE: 'Vote # ',
  OWNER_TITLE: 'By: ',
  EXPIRES_TITLE: 'Expires: ',
  YES: 'Yes',
  NO: 'No',
  VIEW_MORE_MEMBERS: 'View more voters',
  YES_BUTTON: 'Vote support',
  NO_BUTTON: 'Vote against',
  NO_WALLET: 'please set wallet first',
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VoteInfoScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppStyle.chatBackGroundColor,
  },
  voteContainer: {
    backgroundColor: 'white',
    marginVertical: 20,
    height: 100,
  },
  supportListContainer: {
    backgroundColor: 'white',
    padding: 10,
  },
  listTitleContainer: {
    borderBottomColor: AppStyle.lightGrey,
    borderBottomWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  listTitleText: {
    color: 'red',
    fontFamily: AppStyle.mainFont,
    fontSize: AppStyle.fontMiddle,
  },
  listSubtitleText: {
    color: 'black',
    fontSize: AppStyle.fontMiddleSmall,
    fontFamily: AppStyle.mainFont,
    paddingLeft: 20,
  },
  supportList: {
    flexDirection: 'column',
  },
});
