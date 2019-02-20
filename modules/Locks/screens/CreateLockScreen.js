import React from 'react';
import { Button, StyleSheet, View, Text, TextInput } from 'react-native';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { screensList } from '../../../navigation/screensList';
import Container from "../../../components/Container";
import HeaderButton from "../../../components/HeaderButton";
import SingleLineInput from "../../Settings/components/SingleLineInput";

class CreateLockScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: screensList.Wallet.title,
    headerRight: (
      <HeaderButton
        title={'DONE'}
        onPress={() => navigation.navigate(screensList.Transactions.label)}
        color={'white'}
      />
    ),
    headerBackTitle: '',
  });
  
  constructor(props){
    super(props);
    this.state = {
      description: '',
      privateKey: '',
    }
  }
  
  static propTypes = {
    navigation: PropTypes.object,
  };
  
  render() {
    const {privateKey, description} = this.state;
    return <Container style={styles.container}>
      <Text>{t.PRIVATE_KEY}</Text>
      
      <Text>{t.DESCRIPTION}</Text>
      <SingleLineInput title={t.DESCRIPTION} onChangeText={description=>this.setState({description})} value={description}/>
    </Container>;
  }
}

const t = {
  PRIVATE_KEY: 'Private key',
  DESCRIPTION: 'Description',
}

const mapStateToProps = state => ({
  walletAddress: state.appState.walletAddress,
});

const mapDispatchToProps = _.curry(bindActionCreators)({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateLockScreen);

const styles = StyleSheet.create({
  container: {},
});
