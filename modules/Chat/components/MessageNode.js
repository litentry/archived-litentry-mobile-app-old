import React from 'react';
import PropTypes from 'prop-types';
import {Image, StyleSheet, View, Text} from 'react-native';
import AppStyle from '../../../commons/AppStyle';
import { bindActionCreators } from 'redux';
import {makeImageUrl} from "../lib/blob-helpers";
import _ from 'lodash'
import connect from "react-redux/src/connect/connect";

class MessageNode extends React.Component {
  static propTypes = {
    userId: PropTypes.string.isRequired,

    message: PropTypes.object.isRequired,
    avatar: PropTypes.string.isRequired,
  };

  static defaultProps = {};

  render() {
    const {message, userId, avatar} = this.props;
    const isUser = message['from'] === userId;


    return <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: avatar }} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{message.content}</Text>
        <View style={styles.textTriangle}/>
      </View>
    </View>;
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
  textContainer: {

  },
  text: {

  },
  textTriangle: {

  }
});
