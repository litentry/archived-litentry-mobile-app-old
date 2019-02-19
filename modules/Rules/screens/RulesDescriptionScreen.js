import React from 'react';
import { Button, StyleSheet, View, Text } from 'react-native';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import AppStyle from '../../../commons/AppStyle';
import { screensList } from '../../../navigation/screensList';
import NavigationHeader from '../../../components/NavigationHeader';
import HeaderButton from '../../../components/HeaderButton';
import Container from '../../../components/Container';

const mock = {
  groupRuleName: 'democracy',
  economicRule: 'Standard plan',
  requiredApproved: 50,
  requiredHour: 168,
  groupWebsitePrefix: 'Https://www.bacaoke.com/',
};

class RulesDescriptionScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: <NavigationHeader title={screensList.RulesDescription.title} />,
    headerRight: (
      <HeaderButton title={'Done'} onPress={() => navigation.goBack()} color={'white'} />
    ),
    headerBackTitle: '',
  });

  static propTypes = {
    navigation: PropTypes.object,
    subscribedChatId: PropTypes.string,
    topicsMap: PropTypes.object.isRequired,
  };

  renderDescription(groupInfo) {
    return (
      `Default governance in ${groupInfo.public.fn} is ${mock.groupRuleName}. \n` +
      '\n' +
      `* Economic rules:\n` +
      `${mock.economicRule}\n` +
      '\n' +
      `* Voting rules:\n` +
      `Approved by ${mock.requiredApproved.toFixed(1)}% voters in ${mock.requiredHour} days\n` +
      '\n' +
      `Detailed rules please see:\n` +
      `${mock.groupWebsitePrefix}/${groupInfo.topic}\n`
    );
  }

  render() {
    const { topicsMap, subscribedChatId } = this.props;
    const topic = _.get(topicsMap, subscribedChatId);
    if (!topic) return null;
    return (
      <Container style={styles.container}>
        <View style={styles.descriptionTitleContainer}>
          <Text style={styles.descriptionTitle}>{t.DESCRIPTION_TITLE}</Text>
        </View>
        <Text style={styles.descriptionText}>{this.renderDescription(topic)}</Text>
        <Text style={styles.footText} numberOfLines={2}>
          {t.FOOT}
        </Text>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  subscribedChatId: state.chat.subscribedChatId,
  topicsMap: state.topics.topicsMap,
});

const mapDispatchToProps = _.curry(bindActionCreators)({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RulesDescriptionScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: 'white',
  },
  descriptionTitleContainer: {
    height: 80,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    backgroundColor: AppStyle.mainBackgroundColor,
  },
  descriptionTitle: {
    padding: 20,
    fontSize: AppStyle.fontMiddle,
    color: AppStyle.lightGrey,
    fontFamily: AppStyle.mainFont,
  },
  descriptionText: {
    padding: 20,
    color: 'black',
    fontFamily: AppStyle.mainFont,
    fontSize: AppStyle.fontMiddle,
  },
  footText: {
    position: 'absolute',
    bottom: 20,
    padding: 20,
    textAlign: 'center',
    color: AppStyle.lightGrey,
    fontSize: AppStyle.fontMiddleSmall,
    fontFamily: AppStyle.mainFont,
  },
});

const t = {
  DESCRIPTION_TITLE: 'Description',
  FOOT: 'To make changes please start a vote from chat window',
};
