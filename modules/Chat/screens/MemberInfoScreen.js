import React from 'react';
import { Button, StyleSheet, View, Image, Text } from 'react-native';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import AppStyle from '../../../commons/AppStyle';
import { screensList } from '../../../navigation/screensList';
import NavigationHeader from '../../../components/NavigationHeader';

const mock = {
  rule: [-150, -150, -10, 1, 1],
};

class MemberInfoScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: <NavigationHeader title={screensList.Wallet.title} />,
    headerRight: (
      <Button
        onPress={() => navigation.navigate(screensList.Transactions.label)}
        title={'Info'}
        color="black"
      />
    ),
    headerBackTitle: '',
    headerStyle: {
      backgroundColor: AppStyle.backgroundColor,
    },
  });

  static propTypes = {
    navigation: PropTypes.object,
  };

  render() {
    const { navigation } = this.props;
    const title = navigation.getParam('title', '');
    const imageSource = navigation.getParam('imageSource', '');
    const raw = navigation.getParam('raw', {});
    console.log('data is', raw);
    return (
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={imageSource} />
          </View>
          <View style={styles.profileTextContainer}>
            <Text style={styles.nameText}>{title}</Text>
            <Text style={styles.idText}>{t.ID_TITLE + raw.user}</Text>
          </View>
        </View>
        <View style={styles.ruleInfoContainer}>
          <Text style={styles.ruleTitleText}>{t.RULE_TITLE}</Text>
          <Text style={styles.ruleValueText}>{mock.rule.join('/').toString()}</Text>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  walletAddress: state.walletAddress,
});

const mapDispatchToProps = _.curry(bindActionCreators)({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MemberInfoScreen);

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppStyle.chatBackGroundColor,
    flex: 1,
  },
  profileContainer: {
    flexDirection: 'row',
    marginTop: 30,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  imageContainer: {
    height: 50,
    width: 50,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 50,
    width: 50,
    resizeMode: 'contain',
  },
  profileTextContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: 20,
  },
  nameText: {
    fontSize: AppStyle.fontMiddle,
    color: 'black',
    fontFamily: AppStyle.mainFont,
  },
  idText: {
    fontSize: AppStyle.fontMiddleSmall,
    color: AppStyle.lightGrey,
    fontFamily: AppStyle.mainFont,
  },
  ruleInfoContainer: {
    marginTop: 20,
    backgroundColor: 'white',
    alignItems: 'center',
    paddingVertical: 50,
  },
  ruleTitleText: {
    fontSize: AppStyle.fontMiddle,
    color: 'black',
    fontFamily: AppStyle.mainFont,
  },
  ruleValueText: {
    fontSize: AppStyle.fontMiddle,
    color: 'black',
    fontFamily: AppStyle.mainFont,
  },
});

const t = {
  RULE_TITLE: '(Join/Quit/Tax/Vote/Status)',
  ID_TITLE: 'Genesis ID: ',
};
