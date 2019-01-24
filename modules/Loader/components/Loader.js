import React, { Component } from 'react';
import _ from 'lodash';
import { View, StyleSheet, AsyncStorage } from 'react-native';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import PropTypes from 'prop-types';
import { loaderAction } from '../../../actions/loaderAction';
import { dataEntry } from '../../../reducers/loader';
import { testScript } from '../../../testScript';

class Loader extends Component {
  static propTypes = {
    readAppData: PropTypes.func.isRequired,
  };

  async componentDidMount() {
    testScript();
    const { readAppData } = this.props;
    const requestList = _.map(dataEntry, v => v.label);
    const resultList = await AsyncStorage.multiGet(requestList);
    readAppData(resultList);
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
