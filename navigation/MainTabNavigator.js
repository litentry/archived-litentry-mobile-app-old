import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import PropTypes from 'prop-types';
import TabBarIcon from '../components/TabBarIcon';
import { screensList } from './screensList';
import WalletCreateScreen from '../screens/WalletCreateScreen';
import HomeScreen from '../screens/HomeScreen';
import WalletImportScreen from '../screens/WalletImportScreen';
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
import ContinueLoginScreen from '../modules/User/screens/ContinueLoginScreen';
import LoginScreen from '../modules/User/screens/LoginScreen';
import TopicScreen from '../modules/Chat/screens/TopicScreen';
import TopicInfoScreen from '../modules/Chat/screens/TopicInfoScreen';
import MembersScreen from '../modules/Chat/screens/MembersScreen';
import MemberInfoScreen from '../modules/Chat/screens/MemberInfoScreen';
import RulesDescriptionScreen from '../modules/Rules/screens/RulesDescriptionScreen';

const iconPropTypes = { focused: PropTypes.bool };

const commonScreens = {
  Unlock: UnlockScreen,
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
    Login: LoginScreen,
    RulesDescription: RulesDescriptionScreen,
    MemberInfo: MemberInfoScreen,
    Members: MembersScreen,
    Settings: SettingsScreen,
    AccountSetting: AccountSettingScreen,
    TopicInfo: TopicInfoScreen,
    Topic: TopicScreen,
    ContinueLogin: ContinueLoginScreen,
    SetPassword: SetPasswordScreen,
    VerifyCredential: VerifyCredentialScreen,
    Start: StartScreen,
    CreateAccount: CreateAccountScreen,
    ChatList: ChatListScreen,
    About: AboutScreen,
    PasswordSetting: PasswordSettingScreen,
    Transactions: TransactionsScreen,
    Home: HomeScreen,
    ...commonScreens,
  },
  {
    navigationOptions: {
      tabBarLabel: screensList.Home.label,
      tabBarIcon: HomeStackIcon,
    },
  }
);

const WalletStackIcon = ({ focused }) => (
  <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'} />
);
WalletStackIcon.propTypes = iconPropTypes;

const WalletStack = createStackNavigator(
  {
    WalletCreate: WalletCreateScreen,
    WalletImport: WalletImportScreen,
    ImportViaPrivate: ImportViaPrivateScreen,
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
