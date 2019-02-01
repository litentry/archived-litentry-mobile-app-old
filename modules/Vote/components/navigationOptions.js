import AppStyle from "../../../commons/AppStyle";
import HeaderButton from "../../../components/HeaderButton";
import React from "react";

export const generateNavigationOptions = (title) => ({ navigation }) => ({
  headerTitle: title,
  headerRight: (
    <HeaderButton title={'Done'} onPress={() => () => navigation.goBack()} color={'white'} />
  ),
  headerTintColor: 'white',
  headerStyle: {
    backgroundColor: AppStyle.voteHeaderBackgroundColor,
  },
})