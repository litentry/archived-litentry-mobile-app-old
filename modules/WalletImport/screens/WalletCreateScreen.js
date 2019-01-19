import React, { Component } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import Images from '../../../commons/Images';
import SmallCard from '../../../components/SmallCard';
import AppStyle from '../../../commons/AppStyle';
import { screensList } from '../../../navigation/screensList';
const { width } = Dimensions.get('window');

export default class WalletCreateScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object,
  };

  static navigationOptions = {
    title: screensList.WalletCreate.title,
    headerBackTitle: null,
  };

  goBack = () => {
    this.props.navigation.goBack();
  };

  gotoEnterName = () => {
    this.props.navigation.navigate('WalletTypeCreateScreen');
  };

  gotoImport = () => {
    this.props.navigation.navigate(screensList.WalletImport.label);
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <SmallCard
            title={t.createTitle}
            subtitle={t.createSubtitle}
            imageCard={Images.imgCardCreate}
            onPress={this.gotoEnterName}
            imageBackground="backgroundCard"
            titleTextStyle={{ color: AppStyle.mainColor }}
            subtitleTextStyle={{ color: AppStyle.secondaryTextColor, marginTop: 4, fontSize: 16 }}
          />

          <SmallCard
            style={{ marginTop: 40 }}
            title={t.importTitle}
            subtitle={t.importSubtitle}
            imageCard={Images.imgCardImport}
            onPress={this.gotoImport}
            imgBackground="backgroundCard"
            imgBackgroundStyle={{ height: 214, borderRadius: 14, width: width - 40 }}
            titleTextStyle={{ color: AppStyle.mainTextColor }}
            subtitleTextStyle={{ color: AppStyle.secondaryTextColor, marginTop: 4, fontSize: 16 }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const t = {
  createTitle: 'Create',
  createSubtitle: 'a new wallet',
  importTitle: 'Import',
  importSubtitle: 'existing wallet',
};
