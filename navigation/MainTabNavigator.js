import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import PropTypes from 'prop-types';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import WalletScreen from '../screens/WalletScreen';

const iconPropTypes = { focused: PropTypes.bool };

const HomeStack = createStackNavigator({
  Home: HomeScreen,
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
  tabBarLabel: 'Home',
  tabBarIcon: HomeStackIcon,
};

const WalletStack = createStackNavigator({
  Wallet: WalletScreen,
});

const WalletStackIcon = ({ focused }) => (
  <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'} />
);
WalletStackIcon.propTypes = iconPropTypes;

WalletStack.navigationOptions = {
  tabBarLabel: 'Wallet',
  tabBarIcon: WalletStackIcon,
};

const LinksStack = createStackNavigator({
  Links: LinksScreen,
});

const LinksStackIcon = ({ focused }) => (
  <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'} />
);
LinksStackIcon.propTypes = iconPropTypes;

LinksStack.navigationOptions = {
  tabBarLabel: 'Links',
  tabBarIcon: LinksStackIcon,
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

const SettingsStackIcon = ({ focused }) => (
  <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
);
SettingsStackIcon.propTypes = iconPropTypes;

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: SettingsStackIcon,
};

export default createBottomTabNavigator({
  HomeStack,
  LinksStack,
  SettingsStack,
  WalletStack,
});
