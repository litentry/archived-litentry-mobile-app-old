import React from 'react';
import {Button, StyleSheet, View, ScrollView, Text, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import AppStyle from '../../../commons/AppStyle';
import { screensList } from '../../../navigation/screensList';
import {makeImageUrl} from "../lib/blob-helpers";
import GenesisButton, {VariantList as variantList} from "../../../components/GenesisButton";
import MemberProfile from "../components/MemberProfile";
import Images from "../../../commons/Images";
import SingleLineDisplay from "../../../components/SingleLineDisplay";
import SingleSectionDisplay from "../../../components/SingleSectionDisplay";
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const mock ={
  isJoined: true,
  meta: '2000',
}

class TopicInfoScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: navigation.getParam('title', null),
    headerRight: (
      <Button
        onPress={() => navigation.navigate(screensList.Transactions.label)}
        title={screensList.Transactions.title}
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
    topicsMap: PropTypes.object.isRequired,
  };

  renderMemberList (subs){
    let renderList
    if(subs.length > 25){
      renderList = _.slice(subs, 0, 25)
    } else {
      renderList = subs
    }
    return renderList.map((item)=> {
      let imageSource
      if(item.public.photo){
        imageSource = {uri: makeImageUrl(item.public.photo)}
      }else {
        imageSource = Images.blankProfile
      }
      return (
      <MemberProfile title={item.public.fn} imageSource={imageSource}/>
      )
    })
  }

  render() {
    const { topicsMap, navigation } = this.props;
    const topicId = navigation.getParam('topicId', null);
    const topic = _.get(topicsMap, topicId);
    if(!topic)
      return null;

    const topicTitle = topic.public.fn;
    const topicAvatart = makeImageUrl(topic.public.photo);
    const topicDescription = topic.private.comment;
    return <ScrollView style={styles.container}>
      <View style={styles.memberContainer}>
        <View style={styles.memberList}>
          {this.renderMemberList(topic.subs)}
        </View>
        <TouchableOpacity style={styles.viewMoreButton} onPress={()=> {}}>
          <Text style={styles.viewMoreButtonText}>{t.VIEW_MORE_MEMBERS}</Text>
          <AntDesign
            name="right"
            size={AppStyle.fontMiddle}
            style={styles.rightArrowIcon}
            color={AppStyle.lightGrey}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.infoContainer}>
        <SingleLineDisplay title={t.GROUP_TOPIC_TITLE} value={topicTitle} onClick={()=>{}}/>
        <SingleSectionDisplay title={t.TOPIC_DESCRIPTION_TITLE} value={topicDescription} onClick={()=>{}}/>
        <SingleLineDisplay title={t.TOPIC_META_TITLE} value={mock.meta} onClick={()=>{}}/>
      </View>
      <View style={styles.rulesContainer}>
        <SingleLineDisplay title={t.TOPIC_RULES} value={''} onClick={()=>{}} style={styles.rules}/>
      </View>
      {mock.isJoined ?
        <GenesisButton style={styles.button} action={() => {}} text={t.LEAVE_BUTTON} variant={variantList.CANCEL}/> :
        <GenesisButton style={styles.button} action={() => {}} text={t.JOIN_BUTTON} variant={variantList.CONFIRM} Icon={
          <Entypo
          name="users"
          size={AppStyle.fontMiddle}
          color={AppStyle.blueIcon}
        />}/>
      }
    </ScrollView>;
  }
}

const mapStateToProps = state => ({
  walletAddress: state.walletAddress,
  topicsMap: state.topics.topicsMap,
});

const mapDispatchToProps = _.curry(bindActionCreators)({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopicInfoScreen);

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppStyle.chatBackGroundColor
  },
  memberContainer: {
    backgroundColor: 'white',
  },
  memberList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  viewMoreButton: {
    padding: 20,
    flex:1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewMoreButtonText: {
    fontFamily: AppStyle.mainFont,
    color: AppStyle.lightGrey,
    fontSize: AppStyle.fontMiddleSmall,
  },
  rightArrowIcon: {
    paddingLeft: 10,
  },
  infoContainer : {
    marginTop: 20,
    backgroundColor: 'white',
  },
  rulesContainer: {
    marginTop: 20,
    backgroundColor: 'white',
  },
  rules: {
  },
  button: {

  }
});

const t = {
  LEAVE_BUTTON: 'Leave',
  JOIN_BUTTON: 'join',
  VIEW_MORE_MEMBERS: 'View more members',
  GROUP_TOPIC_TITLE: 'Country Name',
  TOPIC_META_TITLE: 'National Treasure',
  TOPIC_DESCRIPTION_TITLE: 'Description',
  TOPIC_RULES: 'Rules',
}
