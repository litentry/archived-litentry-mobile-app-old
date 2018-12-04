import React, { Component } from 'react';
import _ from 'lodash';
import { View, StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import PropTypes from 'prop-types';
import { loaderAction } from '../../../actions/loaderAction';

class Loader extends Component {
  static propTypes = {
    readAppData: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { readAppData } = this.props;
    console.log('loader did mount!');
    readAppData();
  }

  render() {
    return <View style={styles.container} />;
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = _.curry(bindActionCreators)({
  readAppData: loaderAction.readAppData,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Loader);

const styles = StyleSheet.create({
  container: {},
});
