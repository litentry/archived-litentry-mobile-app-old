import React from 'react';
import { Button, StyleSheet, View, ScrollView } from 'react-native';
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

const mock ={
  isJoined: true,
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
    topicsMap: PropTypes.object,
  };

  renderMemberList (subs){
    let renderList
    if(subs.length > 25){
      renderList = _.slice(subs, 0, 25)
    } else {
      renderList = subs
    }
    renderList.map((item)=> {
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
          {this.renderMemberList()}
        </View>
        <View style={styles.viewMoreButton}></View>
      </View>
      <View style={styles.infoContainer}></View>
      <View style={styles.rulesContainer}></View>
      {mock.isJoined ?
        <GenesisButton style={styles.button} action={() => {}} text={t.LEAVE_BUTTON} variant={variantList.CANCEL}/> :
        <GenesisButton style={styles.button} action={() => {}} text={t.JOIN_BUTTON} variant={variantList.CONFIRM}/>
      }
    </ScrollView>;
  }
}

const mapStateToProps = state => ({
  walletAddress: state.walletAddress,
  topicsMap: state.chat.topicsMap,
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

  },
  viewMoreButton: {

  },
  infoContainer : {
    marginTop: 15,
    backgroundColor: 'white',
  },
  rulesContainer: {
    marginTop: 15,
    backgroundColor: 'white',
  },
  button: {
    marginTop: 30
  }
});

const t = {
  LEAVE_BUTTON: 'Leave',
  JOIN_BUTTON: 'join',
  VIEW_MORE_MEMBER: 'View more members'
}
