import React from 'react';
import { Platform } from 'react-native';
import _ from 'lodash';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import PropTypes from 'prop-types';
import TabBarIcon from '../components/TabBarIcon';
import { screensList } from './screensList';
import HomeScreen from '../screens/HomeScreen';
import WalletImportScreen from '../modules/WalletImport/screens/WalletImportScreen';
import ImportViaPrivateScreen from '../modules/WalletImport/screens/ImportViaPrivateScreen';
import ScanQRCodeScreen from '../modules/WalletImport/screens/ScanQRCodeScreen';
import UnlockScreen from '../modules/Unlock/screens/UnlockScreen';
import TransactionsScreen from '../modules/Transactions/screens/TransactionsScreen';
import PasswordSettingScreen from '../modules/Settings/screens/PasswordSettingScreen';
import AccountSettingScreen from '../modules/Settings/screens/AccountSettingScreen';
import SettingsScreen from '../modules/Settings/screens/SettingsScreen';
import AboutScreen from '../modules/Settings/screens/AboutScreen';
import ChatListScreen from '../modules/Chat/screens/ChatListScreen';
import StartScreen from '../modules/User/screens/StartScreen';
import CreateAccountScreen from '../modules/User/screens/CreateAccountScreen';
import VerifyCredentialScreen from '../modules/User/screens/VerifyCredentialScreen';
import SetPasswordScreen from '../modules/User/screens/SetPasswordScreen';
import TopicScreen from '../modules/Chat/screens/TopicScreen';
import TopicInfoScreen from '../modules/Chat/screens/TopicInfoScreen';
import MembersScreen from '../modules/Chat/screens/MembersScreen';
import MemberInfoScreen from '../modules/Chat/screens/MemberInfoScreen';
import RulesDescriptionScreen from '../modules/Rules/screens/RulesDescriptionScreen';
import TreasureScreen from '../modules/Rules/screens/TreasureScreen';
import TopicRulesScreen from '../modules/Rules/screens/TopicRulesScreen';
import MemberRulesScreen from '../modules/Rules/screens/MemberRulesScreen';
import RulesInfoScreen from '../modules/Rules/screens/RulesInfoScreen';
import StartVoteScreen from '../modules/Vote/screens/StartVoteScreen';
import AmendSupportScreen from '../modules/Vote/screens/AmendSupportScreen';
import AmendCostScreen from '../modules/Vote/screens/AmendCostScreen';
import AmendMemberRulesScreen from '../modules/Vote/screens/AmendMemberRulesScreen';
import AmendDurationScreen from '../modules/Vote/screens/AmendDurationScreen';
import AmendDescriptionScreen from '../modules/Vote/screens/AmendDescriptionScreen';
import AmendCountryNameScreen from '../modules/Vote/screens/AmendCountryNameScreen';
import VoteInfoScreen from '../modules/Vote/screens/VoteInfoScreen';
import WalletScreen from '../screens/WalletScreen';
import ImportViaMnemonicScreen from '../modules/WalletImport/screens/ImportViaMnemonicScreen';
import WalletCreateScreen from '../modules/WalletImport/screens/WalletCreateScreen';
import UploadProfileScreen from '../modules/User/screens/UploadProfileScreen';
import LoginScreen from '../modules/User/screens/LoginScreen';
import CreateTopicScreen from '../modules/CreateTopic/screens/CreateTopicScreen';

const iconPropTypes = { focused: PropTypes.bool };

const commonScreens = {
  Unlock: UnlockScreen,
  Transactions: TransactionsScreen,
};

const HomeStackIcon = ({ focused }) => (
  <TabBarIcon
    focused={focused}
    name={
      Platform.OS === 'ios'
        ? `ios-information-circle${focused ? '' : '-outline'}`
        : 'md-information-circle'
    }
  />
);
HomeStackIcon.propTypes = iconPropTypes;

const HomeStack = createStackNavigator(
  {
    Start: StartScreen,
    SetPassword: SetPasswordScreen,

    Login: LoginScreen,
    UploadProfile: UploadProfileScreen,
    CreateAccount: CreateAccountScreen,
    VoteInfo: VoteInfoScreen,
    AmendCost: AmendCostScreen,
    AmendSupport: AmendSupportScreen,
    AmendMemberRules: AmendMemberRulesScreen,
    AmendDuration: AmendDurationScreen,
    AmendDescription: AmendDescriptionScreen,
    AmendCountryName: AmendCountryNameScreen,
    StartVote: StartVoteScreen,
    RulesInfo: RulesInfoScreen,
    MemberRules: MemberRulesScreen,
    TopicRules: TopicRulesScreen,
    Treasure: TreasureScreen,
    RulesDescription: RulesDescriptionScreen,
    MemberInfo: MemberInfoScreen,
    Members: MembersScreen,
    Settings: SettingsScreen,
    AccountSetting: AccountSettingScreen,
    TopicInfo: TopicInfoScreen,
    Topic: TopicScreen,
    VerifyCredential: VerifyCredentialScreen,
    ChatList: ChatListScreen,
    About: AboutScreen,
    PasswordSetting: PasswordSettingScreen,
    Home: HomeScreen,
    CreateTopic: CreateTopicScreen,
    ...commonScreens,
  },
  {
    navigationOptions: ({ navigation }) => {
      let tabBarVisible = true;
      const currentRouter = _.last(navigation.state.routes).routeName;
      if (navigation.state.index > 0 || currentRouter === screensList.Start.label) {
        tabBarVisible = false;
      }

      return {
        tabBarLabel: screensList.Home.label,
        tabBarIcon: HomeStackIcon,
        tabBarVisible,
      };
    },
  }
);

const WalletStackIcon = ({ focused }) => (
  <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'} />
);
WalletStackIcon.propTypes = iconPropTypes;

const WalletStack = createStackNavigator(
  {
    Wallet: WalletScreen,
    WalletImport: WalletImportScreen,
    WalletCreate: WalletCreateScreen,
    ImportViaPrivate: ImportViaPrivateScreen,
    ImportViaMnemonic: ImportViaMnemonicScreen,
    ScanQRCode: ScanQRCodeScreen,
    ...commonScreens,
  },
  {
    navigationOptions: {
      tabBarLabel: screensList.Wallet.title,
      tabBarIcon: WalletStackIcon,
    },
  }
);

export default createBottomTabNavigator({
  HomeStack,
  WalletStack,
});
