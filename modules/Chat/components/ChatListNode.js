import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, Image } from 'react-native';
import AppStyle from '../../../commons/AppStyle';
import { shortDateFormat } from '../lib/strformat';
import { makeImageUrl } from '../lib/blob-helpers';

export default class ChatListNode extends React.Component {
  static propTypes = {
    chatNode: PropTypes.object.isRequired,
  };

  static defaultProps = {};

  render() {
    const { chatNode } = this.props;

    const imageUrl = makeImageUrl(chatNode.public.photo);
    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: imageUrl }} />
          <View style={styles.imageFloat} />
        </View>
        <View style={styles.textContainer}>
          <View style={styles.firstLineContainer}>
            <Text style={styles.title} numberOfLines={1}>
              {chatNode.public.fn}
            </Text>
            <Text style={styles.date} numberOfLines={1}>
              {shortDateFormat(new Date(chatNode.updated))}
            </Text>
          </View>
          <View style={styles.secondLineContainer}>
            <Text style={styles.text} numberOfLines={1}>
              {chatNode.private.comment}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    margin: 10,
    height: 70,
    display: 'flex',
    flexDirection: 'row',
  },
  imageContainer: {
    height: 60,
    width: 60,
    marginRight: 10,
    position: 'relative',
    // backgroundColor: 'grey',
  },
  image: {
    height: 60,
    width: 60,
    resizeMode: 'contain',
  },
  imageFloat: {
    position: 'absolute',
    right: 0,
    top: 0,
    borderRadius: 5,
    width: 10,
    height: 10,
    backgroundColor: 'red',
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderColor: AppStyle.chatBorder,
    flexWrap: 'nowrap',
  },
  firstLineContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  title: {
    flexShrink: 1,
    color: 'black',
    fontFamily: AppStyle.mainFont,
    fontSize: AppStyle.fontMiddleSmall,
  },
  date: {
    color: AppStyle.lightGrey,
    fontFamily: AppStyle.mainFont,
    fontSize: AppStyle.fontSmall,
  },
  secondLineContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  text: {
    color: AppStyle.lightGrey,
    fontSize: AppStyle.fontSmall,
    fontFamily: AppStyle.mainFont,
    flex: 1,
  },
});
