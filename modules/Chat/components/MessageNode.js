import React from 'react';
import PropTypes from 'prop-types';
import { Image, StyleSheet, View, Text } from 'react-native';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import connect from 'react-redux/src/connect/connect';
import { makeImageUrl } from '../lib/blob-helpers';
import AppStyle from '../../../commons/AppStyle';

class MessageNode extends React.Component {
  static propTypes = {
    userId: PropTypes.string.isRequired,
    message: PropTypes.object.isRequired,
    imageSource: PropTypes.oneOfType([PropTypes.number, PropTypes.object]).isRequired,
    senderName: PropTypes.string.isRequired,
  };

  static defaultProps = {};

  render() {
    const { message, userId, imageSource, senderName } = this.props;
    const isUser = message.from === userId;

    const containerFlexDirection = {
      flexDirection: isUser ? 'row-reverse' : 'row',
    };
    const backGroundColor = {
      backgroundColor: isUser ? AppStyle.userCancelGreen : 'white',
    };
    const imageMargin = {
      [isUser ? 'marginLeft' : 'marginRight']: 10,
    };
    const titleAlign = {
      textAlign: isUser ? 'right' : 'left',
    };
    const arrowStyle = isUser ? styles.rightTriangle : styles.leftTriangle;
    const messageContent =
      typeof message.content === 'string' ? message.content : 'Unavailable message';

    return (
      <View style={[styles.container, containerFlexDirection]}>
        <View style={[styles.imageContainer, imageMargin]}>
          <Image style={styles.image} source={imageSource} />
        </View>
        <View style={styles.textContainer}>
          <Text style={[styles.title, titleAlign]}>{senderName}</Text>
          <Text style={[styles.text, backGroundColor]}>{messageContent}</Text>
          <View style={[styles.textTriangle, arrowStyle]} />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  userId: state.chat.userId,
});

const mapDispatchToProps = _.curry(bindActionCreators)({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageNode);

const styles = StyleSheet.create({
  container: {
    margin: 10,
    display: 'flex',
    alignItems: 'flex-start',
  },
  imageContainer: {
    height: 30,
    width: 30,
    marginTop: 10,
    position: 'relative',
  },
  image: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
  },
  textContainer: {
    position: 'relative',
    width: '60%',
    flexDirection: 'column',
  },
  title: {
    fontSize: AppStyle.fontSmall,
    fontFamily: AppStyle.mainFont,
    color: AppStyle.lightGrey,
    marginBottom: 3,
  },
  text: {
    fontSize: AppStyle.fontMiddleSmall,
    fontFamily: AppStyle.mainFont,
    color: 'black',
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  textTriangle: {
    width: 0,
    height: 0,
    top: 25,
    position: 'absolute',
    borderTopWidth: 5,
    borderTopColor: 'transparent',
    borderBottomWidth: 5,
    borderBottomColor: 'transparent',
  },
  leftTriangle: {
    left: -5,
    borderRightWidth: 5,
    borderRightColor: 'white',
  },
  rightTriangle: {
    right: -5,
    borderLeftWidth: 5,
    borderLeftColor: AppStyle.userCancelGreen,
  },
});
