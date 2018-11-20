import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import PropTypes from 'prop-types';
import TabBarIcon from '../components/TabBarIcon';
import { screensList } from './screensList';
import CreateWalletScreen from '../screens/CreateWalletScreen';
import WalletScreen from '../screens/WalletScreen';
import HomeScreen from '../screens/HomeScreen';
import ImportWalletScreen from "../screens/ImportWalletScreen";

const iconPropTypes = { focused: PropTypes.bool };

const HomeStack = createStackNavigator({
  Home: HomeScreen
})

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
  Wallet: WalletScreen ,
    CreateWallet: CreateWalletScreen ,
    ImportWallet: ImportWalletScreen,
  // ImportViaAddress: {label: 'ImportViaAddress', screen: ImportViaAddressScreen},
})

const WalletStackIcon = ({ focused }) => (
  <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'} />
);
WalletStackIcon.propTypes = iconPropTypes;

WalletStack.navigationOptions = {
  tabBarLabel: screensList.Wallet.label,
  tabBarIcon: WalletStackIcon,
};

export default createBottomTabNavigator({
  HomeStack,
  WalletStack,
});
