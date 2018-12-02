import React, { Component } from 'react'
import _ from "lodash";
import {bindActionCreators} from "redux";
import connect from "react-redux/es/connect/connect";
import {loaderAction} from "../../../actions/loaderAction";

export default class Loader extends Component {

  componentDidMount(){
    const {readAppData} = this.props;
    console.log('loader did mount!')
    readAppData();
  }

  render() {
    return (
      <View style={styles.container}>

      </View>
    )
  }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = _.curry(bindActionCreators)({
  readAppData: loaderAction.readAppData,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Loader);

const styles = StyleSheet.create({
  container: {

  },
})
