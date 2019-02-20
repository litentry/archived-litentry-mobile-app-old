import React from 'react';
import { Button, StyleSheet, View, Text, ScrollView, FlatList, Alert } from 'react-native';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import AppStyle from '../../../commons/AppStyle';
import { screensList } from '../../../navigation/screensList';
import NavigationHeader from '../../../components/NavigationHeader';
import { voteInfo } from '../../../config';
import SingleProfile from '../components/SingleProfile';
import Images from '../../../commons/Images';
import { makeImageUrl } from '../../Chat/lib/blob-helpers';
import HeaderButton from '../../../components/HeaderButton';
import { alertNormal } from '../../../utils/alertUtils';

class MemberRulesScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: <NavigationHeader title={screensList.MemberRules.title} />,
    headerRight: (
      <HeaderButton
        title={screensList.RulesInfo.title}
        onPress={() => navigation.navigate(screensList.RulesInfo.label)}
        color={'white'}
      />
    ),
    headerBackTitle: '',
  });

  static propTypes = {
    navigation: PropTypes.object,
    subscribedChatId: PropTypes.string,
    topicsMap: PropTypes.object.isRequired,
    voteCached: PropTypes.object.isRequired,
  };

  renderItem = ({ item }) => {
    let imageSource;
    if (item.public.photo) {
      imageSource = { uri: makeImageUrl(item.public.photo) };
    } else {
      imageSource = Images.blankProfile;
    }

    return (
      <SingleProfile
        imageSource={imageSource}
        info={this.renderRulesValue(item.user)}
        name={item.public.fn}
        onPress={() => this.conditionalOpen(item.user)}
      />
    );
  };

  conditionalOpen(userId) {
    const { navigation } = this.props;
    const editEnabled = navigation.getParam('editEnabled', false);
    if (editEnabled) {
      navigation.navigate(screensList.AmendMemberRules.label, {
        userId,
      });
    } else {
      alertNormal('To make changes please start a vote from chat window');
    }
  }

  renderRulesValue(memberId) {
    const { voteCached, navigation } = this.props;
    const editEnabled = navigation.getParam('editEnabled', false);
    const rules = editEnabled ? voteCached : navigation.getParam('rulesData');
    const defaultRules = _.get(rules, 'memberRules.default');
    const memberRules = _.get(rules, `memberRules.${memberId}`, defaultRules);
    return memberRules.join('/');
  }

  render() {
    const { topicsMap, subscribedChatId, voteCached } = this.props;
    const topic = _.get(topicsMap, subscribedChatId);
    if (!topic) return null;
    console.log('in profile members, topic is', topic);

    return (
      <ScrollView style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.rulesTitleText}>{voteInfo.rulesDescription}</Text>
        </View>
        <SingleProfile
          imageSource={Images.blankProfile}
          info={this.renderRulesValue()}
          name={t.FUTURE_CITIZEN}
          onPress={() => this.conditionalOpen('default')}
        />

        <FlatList
          style={styles.memberList}
          data={topic.subs}
          extraData={voteCached}
          renderItem={this.renderItem}
          keyExtractor={item => item.user}
        />
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  subscribedChatId: state.chat.subscribedChatId,
  topicsMap: state.topics.topicsMap,
  voteCached: state.vote.cached,
});

const mapDispatchToProps = _.curry(bindActionCreators)({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MemberRulesScreen);

const t = {
  FUTURE_CITIZEN: 'Future Citizens',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppStyle.mainBackgroundColor,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 20,
  },
  rulesTitleText: {
    fontFamily: AppStyle.mainFont,
    fontSize: AppStyle.fontSmall,
    color: AppStyle.lightGrey,
  },
  memberList: {
    marginTop: 30,
  },
});
