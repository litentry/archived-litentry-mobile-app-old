import React from 'react';
import { Text, StyleSheet, View, ScrollView, Button } from 'react-native';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import AppStyle from '../../../commons/AppStyle';
import { screensList } from '../../../navigation/screensList';
import NavigationHeader from '../../../components/NavigationHeader';
import SingleProfile from '../components/SingleProfile';
import Images from '../../../commons/Images';
import MultiLineDisplay from '../../../components/MultiLineDisplay';
import HeaderButton from '../../../components/HeaderButton';

class RulesInfoScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: <NavigationHeader title={screensList.RulesInfo.title} />,
    headerBackTitle: '',
    headerRight: (
      <HeaderButton title={'Done'} onPress={() => () => navigation.goBack()} color={'white'} />
    ),
  });

  static propTypes = {
    navigation: PropTypes.object,
  };

  renderArrow(height, right, text) {
    return (
      <View style={[styles.arrowContainer, { right }]}>
        <View style={[styles.arrowLine, { height }]} />
        <View style={styles.arrow} />
        <Text style={styles.arrowText}>{text}</Text>
      </View>
    );
  }

  renderIntroduction() {
    return t.RULES_TITLE.map((rulesTitle, index) => (
      <MultiLineDisplay title={rulesTitle} list={t.RULES_DESCRIPTION[index]} key={rulesTitle} />
    ));
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.sampleContainer}>
          <SingleProfile
            imageSource={Images.blankProfile}
            info={t.SAMPLE_RULES}
            name={t.SAMPLE_TITLE}
            fontColor={'red'}
          />
          {this.renderArrow(40, 165, t.RULES_TITLE[0])}
          {this.renderArrow(60, 120, t.RULES_TITLE[1])}
          {this.renderArrow(80, 86, t.RULES_TITLE[2])}
          {this.renderArrow(100, 50, t.RULES_TITLE[3])}
          {this.renderArrow(120, 13, t.RULES_TITLE[4])}
        </View>

        <View style={styles.introContainer}>{this.renderIntroduction()}</View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  walletAddress: state.appState.walletAddress,
});

const mapDispatchToProps = _.curry(bindActionCreators)({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RulesInfoScreen);

const t = {
  SAMPLE_TITLE: 'Name',
  SAMPLE_RULES: ' -150 / 150 /  10 /  1  /  1 ',
  RULES_TITLE: ['Join', 'Quit', 'Tax', 'Vote', 'Status', ''],
  RULES_DESCRIPTION: [
    ['The amount an user pays to join the virtual country.'],
    ['The amount an user pays to quit the virtual country.'],
    [
      'Tax are collected by National Treasury for purchasing dapps and paying universal taxes. Unit (NES/Day) ',
    ],
    ['Number of ballots a user has in any voting'],
    ['1 - normal', '0 - to be kicked out from the virtual country'],
    [
      '* Positive number means user will get money. ',
      'Negative number means user will lose money.',
    ],
  ],
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppStyle.mainBackgroundColor,
  },
  sampleContainer: {
    paddingTop: 30,
    position: 'relative',
  },
  arrowContainer: {
    position: 'absolute',
    flexDirection: 'column',
    alignItems: 'center',
    top: 80,
  },
  arrowText: {
    fontFamily: AppStyle.mainFont,
    fontSize: AppStyle.fontSmall,
    color: AppStyle.lightGrey,
  },
  arrowLine: {
    borderLeftWidth: 1,
    borderLeftColor: AppStyle.lightGrey,
    width: 1,
  },
  arrow: {
    width: 0,
    height: 0,
    borderLeftColor: 'transparent',
    borderLeftWidth: 5,
    borderRightColor: 'transparent',
    borderRightWidth: 5,
    borderTopColor: AppStyle.lightGrey,
    borderTopWidth: 5,
  },
  introContainer: {
    marginTop: 110,
    paddingHorizontal: 20,
  },
});
