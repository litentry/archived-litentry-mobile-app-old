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

const iconPropTypes = { focused: PropTypes.bool };

const commonScreens = {
  Unlock: UnlockScreen,
};

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  ...commonScreens,
});

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

HomeStack.navigationOptions = {
  tabBarLabel: screensList.Home.label,
  tabBarIcon: HomeStackIcon,
};

const WalletStack = createStackNavigator({
  // Wallet: WalletScreen,
  WalletCreate: WalletCreateScreen,
  WalletImport: WalletImportScreen,
  ImportViaPrivate: ImportViaPrivateScreen,
  ScanQRCode: ScanQRCodeScreen,
  ...commonScreens,
});

const WalletStackIcon = ({ focused }) => (
  <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'} />
);
WalletStackIcon.propTypes = iconPropTypes;

WalletStack.navigationOptions = {
  tabBarLabel: screensList.WalletCreate.label,
  tabBarIcon: WalletStackIcon,
};

export default createBottomTabNavigator({
  HomeStack,
  WalletStack,
});
