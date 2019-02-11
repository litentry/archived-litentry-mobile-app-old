import React from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import AppStyle from '../../../commons/AppStyle';
import { screensList } from '../../../navigation/screensList';
import NavigationHeader from '../../../components/NavigationHeader';
import SingleLineDisplay from '../../../components/SingleLineDisplay';
import Container from "../../../components/Container";

class AccountSettingScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: <NavigationHeader title={screensList.AccountSetting.title} />,
    headerBackTitle: '',
  });

  static propTypes = {
    navigation: PropTypes.object,
    userId: PropTypes.string.isRequired,
  };

  render() {
    const { navigation, userId } = this.props;
    return (
      <Container style={styles.container}>
        <SingleLineDisplay title={t.ID_TITLE} style={styles.singleLineDisplay} value={userId} />
        <SingleLineDisplay
          title={t.PASSWORD_TITLE}
          style={styles.singleLineDisplay}
          value={t.PASSWORD_VALUE}
          onClick={() => navigation.navigate(screensList.PasswordSetting.label)}
        />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  userId: state.appState.userId,
});

const mapDispatchToProps = _.curry(bindActionCreators)({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountSettingScreen);

const styles = {
  container: {
    backgroundColor: AppStyle.chatBackGroundColor,
  },
  singleLineDisplay: {
    marginTop: 20,
  },
};

const t = {
  ID_TITLE: 'Genesis ID',
  PASSWORD_TITLE: 'Password',
  PASSWORD_VALUE: 'Set',
};
