import React from 'react';
import { TouchableOpacity, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import AppStyle from '../../../commons/AppStyle';
import { screensList } from '../../../navigation/screensList';
import NavigationHeader from '../../../components/NavigationHeader';
import appsList from '../appList';
import Images from '../../../commons/Images';
import { popupAction } from '../../../actions/popupAction';
import { aboutInfo } from '../../../config';

const mock = {
  free: 'Free',
  url: 'URL: https://www.sketchappsources.com',
  author: 'Developer: Davindfan',
  p1: 'Lottery是一款参考MMM设计的游戏，仅限中国大陆用户参与，风险自负。',
  p2:
    '这是一个去中心化的复利MMM，没有任何中心机构，所有的游戏规则都以智能合约的方式，写在以太坊网。并自动执行。\n \n' +
    '去中心化的复利MMM是建立在Genesis space理想国APP开发的小程序，在这里所有的参与和提现都是通过NES来实现。',
  p3:
    '这是一个去中心化的复利MMM，没有任何中心机构，所有的游戏规则都以智能合约的方式，写在以太坊网。并自动执行。\n' +
    '\n' +
    '去中心化的复利MMM是建立在Genesis space理想国APP开发的小程序，在这里所有的参与和提现都是通过NES来实现。\n' +
    '\n' +
    '首先必须是理想国的会员，注册的时候需要理想国授权，（类似微信小程序 需要微信授权登陆一样）。同时需要绑定手机号码来验证注册。设置交易密码.\n' +
    '\n' +
    '注册好之后，然后点击参与，会看到有一个参与金额，在参与金额里面，最小是1万，最大是100万，参与金额必须是万数的整倍。输入自己参与的金额，点击确定，此时会调用你理想国的个人钱包付NES，然后输入你个人钱包密码，点击提交。扣款成功之后会显示你参与成功',
};

const capitalize = ([s, ...tring]) => [s.toUpperCase(), ...tring].join('');

class AppProfileScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: navigation.getParam('title', 'App Profile'),
    headerBackTitle: '',
  });

  static propTypes = {
    navigation: PropTypes.object,
    showPopup: PropTypes.func.isRequired,
  };

  render() {
    const { navigation, showPopup } = this.props;
    const appTitle = navigation.getParam('title', 'App Profile');
    const app = _.get(appsList, appTitle, {});
    return (
      <ScrollView style={styles.container}>
        <View style={styles.introContainer}>
          <View style={styles.imageContainer}>
            <Image source={app.imageSource} style={styles.introIcon} />
            <TouchableOpacity
              style={styles.getButton}
              onPress={() => {
                showPopup(aboutInfo.todo);
              }}>
              <Text style={styles.getButtonText}>{mock.free}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.introTextContainer}>
            <Text style={styles.title}>{capitalize(app.title)}</Text>
            <Text style={styles.description}>{mock.url}</Text>
            <Text style={styles.description}>{mock.author}</Text>
          </View>
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.description}>{mock.p1}</Text>
          <Image style={styles.contentImage} source={Images.img1} />
          <Text style={styles.description}>{mock.p2}</Text>
          <Image style={styles.contentImage} source={Images.img2} />
          <Text style={styles.description}>{mock.p3}</Text>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  walletAddress: state.appState.walletAddress,
});

const mapDispatchToProps = _.curry(bindActionCreators)({
  showPopup: popupAction.showPopup,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppProfileScreen);

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppStyle.mainBackgroundColor,
  },
  introContainer: {
    marginVertical: 10,
    padding: 10,
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  introIcon: {
    height: 50,
    width: 50,
    resizeMode: 'contain',
  },
  introTextContainer: {
    flex: 3,
    padding: 10,
    color: AppStyle.lightGrey,
    fontFamily: AppStyle.mainFont,
    fontSize: AppStyle.fontMiddleSmall,
  },
  title: {
    color: AppStyle.lightGrey,
    fontFamily: AppStyle.mainFontBold,
    fontSize: AppStyle.fontMiddle,
  },
  description: {
    color: AppStyle.lightGrey,
    fontFamily: AppStyle.mainFont,
    fontSize: AppStyle.fontMiddleSmall,
  },
  contentImage: {
    marginVertical: 20,
    width: '100%',
    height: 200,
    resizeMode: 'contain',
  },
  textContainer: {
    padding: 10,
  },
  getButton: {
    borderRadius: 10,
    paddingVertical: 3,
    paddingHorizontal: 6,
    margin: 10,
    backgroundColor: AppStyle.blueButton,
  },
  getButtonText: {
    color: 'white',
    fontFamily: AppStyle.mainFont,
    fontSize: AppStyle.fontSmall,
  },
});
