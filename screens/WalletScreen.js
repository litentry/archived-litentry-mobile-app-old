import React from 'react';
import {Text} from 'react-native';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={styles.container}>
      </View>
    )
  }

}

const styles = {
  container: {
    flex:1
  }
}