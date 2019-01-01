import React from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';

export const MonoText = props => (
  <Text {...props} style={[props.style, { fontFamily: 'space-mono' }]} />
);

MonoText.propTypes = {
  style: PropTypes.object,
};
