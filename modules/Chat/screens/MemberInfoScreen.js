import React from 'react';
import { Button, StyleSheet, View, Image, Text } from 'react-native';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import AppStyle from '../../../commons/AppStyle';
import { screensList } from '../../../navigation/screensList';
import NavigationHeader from '../../../components/NavigationHeader';
import { voteInfo } from '../../../config';
import HeaderButton from '../../../components/HeaderButton';
import Container from '../../../components/Container';

const mock = {
  rule: [-150, -150, -10, 1, 1],
};

class MemberInfoScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: <NavigationHeader title={screensList.MemberInfo.title} />,
    headerRight: (
      <HeaderButton
        title={'Info'}
        onPress={() => navigation.navigate(screensList.RulesDescription.label)}
        color={'white'}
      />
    ),
    headerBackTitle: '',
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
      <Container style={styles.container}>
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
          <Text style={styles.ruleTitleText}>{voteInfo.rulesDescription}</Text>
          <Text style={styles.ruleValueText}>{mock.rule.join('/').toString()}</Text>
        </View>
      </Container>
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
)(MemberInfoScreen);

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppStyle.mainBackgroundColor,
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
  ID_TITLE: 'Genesis ID: ',
};
