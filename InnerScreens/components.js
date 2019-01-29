/* eslint-disable react/prop-types */

import { Text, View } from 'react-native';
import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import AppStyle from '../commons/AppStyle';
import { screensList } from '../navigation/screensList';
import LightButton from '../components/LightButton';
import MemberList from '../components/MemberList';

export const IntroContainer = props => (
  <View style={styles.introContainer}>
    <AntDesign
      name={props.iconName}
      size={AppStyle.fontBig}
      color={AppStyle.blueIcon}
      style={styles.introIcon}
    />
    <Text style={styles.introText}>{props.description}</Text>
  </View>
);

IntroContainer.prototype = {
  iconName: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export const MemberListContainer = props => (
  <View style={styles.memberContainer}>
    <MemberList list={props.topic.subs} limit={25} />
    <LightButton
      onPress={() =>
        props.navigation.navigate(screensList.Members.label, {
          list: props.topic.subs,
        })
      }
      text={t.VIEW_MORE_MEMBERS}
    />
  </View>
);

MemberListContainer.prototype = {
  topic: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};

const styles = {
  introIcon: {
    padding: 20,
  },
  introContainer: {
    padding: 20,
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  introText: {
    flex: 3,
    color: AppStyle.lightGrey,
    fontFamily: AppStyle.mainFont,
    fontSize: AppStyle.fontMiddleSmall,
  },
  memberContainer: {
    backgroundColor: 'white',
  },
};
