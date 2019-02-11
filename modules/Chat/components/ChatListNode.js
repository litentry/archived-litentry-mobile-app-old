import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, Image } from 'react-native';
import _ from 'lodash';
import AppStyle from '../../../commons/AppStyle';
import { isValidDate, shortDateFormat } from '../lib/strformat';
import { makeImageUrl } from '../lib/blob-helpers';
import Images from '../../../commons/Images';
import { renderImageSource } from '../../../utils/imageUtils';

export default class ChatListNode extends React.Component {
  static propTypes = {
    chatNode: PropTypes.object.isRequired,
  };

  static defaultProps = {};

  render() {
    const { chatNode } = this.props;
    const { unread } = chatNode;
    if (!chatNode.public) {
      console.log('topic with null publis is', chatNode);
      return null;
    }

    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={renderImageSource(chatNode.public.photo)} />
          {unread > 0 && (
            <View style={styles.imageFloat}>
              <Text style={styles.unreadNumber}>{unread < 100 ? unread.toString() : '..'}</Text>
            </View>
          )}
        </View>
        <View style={styles.textContainer}>
          <View style={styles.firstLineContainer}>
            <Text style={styles.title} numberOfLines={1}>
              {chatNode.public.fn}
            </Text>
            <Text style={styles.date} numberOfLines={1}>
              {isValidDate(chatNode.updated)
                ? shortDateFormat(new Date(chatNode.updated))
                : t.DATE_PLACEHOLDER}
            </Text>
          </View>
          {/*<View style={styles.secondLineContainer}>*/}
          {/*<Text style={styles.text} numberOfLines={1}>*/}
          {/*{chatNode.isSubscribed && chatNode.private && chatNode.private.comment ? chatNode.private.comment : t.DESCRIPTION_PLACEHOLDER}*/}
          {/*</Text>*/}
          {/*</View>*/}
        </View>
      </View>
    );
  }
}

const t = {
  DESCRIPTION_PLACEHOLDER: '',
  DATE_PLACEHOLDER: '',
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },
  imageContainer: {
    height: 50,
    width: 50,
    marginRight: 10,
    position: 'relative',
  },
  image: {
    height: 50,
    width: 50,
    resizeMode: 'contain',
  },
  imageFloat: {
    position: 'absolute',
    right: 0,
    top: 0,
    borderRadius: 10,
    width: 20,
    height: 20,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  unreadNumber: {
    fontSize: 10,
    color: 'white',
    fontFamily: AppStyle.mainFont,
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    flexWrap: 'nowrap',
  },
  firstLineContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
