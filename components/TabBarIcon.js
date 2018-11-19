import React from 'react';
import { Icon } from 'expo';
import PropTypes from 'prop-types';
import Colors from '../constants/Colors';

const TabBarIcon = props => (
  <Icon.Ionicons
    name={props.name}
    size={26}
    style={{ marginBottom: -3 }}
    color={props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
  />
);

TabBarIcon.propTypes = {
  name: PropTypes.string,
  focused: PropTypes.bool,
};

export default TabBarIcon;
