import React from 'react';
import { Button, StyleSheet, View, Text, ScrollView, FlatList } from 'react-native';
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

const mock = {
  rule: [-150, -150, -10, 1, 1],
};

class MemberRulesScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: <NavigationHeader title={screensList.MemberRules.title} />,
    headerRight: (
      <Button
        onPress={() => navigation.navigate(screensList.RulesInfo.label)}
        title={screensList.RulesInfo.title}
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
    subscribedChatId: PropTypes.string,
    topicsMap: PropTypes.object.isRequired,
  };

  renderItem = ({ item }) => {
    let imageSource;
    if (item.public.photo) {
      imageSource = { uri: makeImageUrl(item.public.photo) };
    } else {
      imageSource = Images.blankProfile;
    }
    return (
      <SingleProfile imageSource={imageSource} info={mock.rule.join('/')} name={item.public.fn} />
    );
  };

  render() {
    const { topicsMap, subscribedChatId } = this.props;
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
          info={mock.rule.join('/')}
          name={t.FUTURE_CITIZEN}
        />

        <FlatList
          style={styles.memberList}
          data={topic.subs}
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
    backgroundColor: AppStyle.chatBackGroundColor,
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
