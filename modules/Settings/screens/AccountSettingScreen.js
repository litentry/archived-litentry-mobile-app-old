import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import AppStyle from '../../../commons/AppStyle';
import { screensList } from '../../../navigation/screensList';
import NavigationHeader from '../../../components/NavigationHeader';
import SingleLineDisplay from '../../../components/SingleLineDisplay';
import Container from '../../../components/Container';
import Images from '../../../commons/Images';
import SingleLineSingleValueDisplay from '../../../components/SingleLineSingleValueDisplay';

class AccountSettingScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: <NavigationHeader title={screensList.AccountSetting.title} />,
    headerBackTitle: '',
  });

  static propTypes = {
    navigation: PropTypes.object,
    userId: PropTypes.string.isRequired,
    avatar: PropTypes.string,
  };

  render() {
    const { navigation, userId, avatar } = this.props;
    return (
      <Container style={styles.container}>
        <SingleLineDisplay title={t.ID_TITLE} style={styles.singleLineDisplay} value={userId} />
        {/*<SingleLineDisplay*/}
        {/*title={t.PASSWORD_TITLE}*/}
        {/*style={styles.singleLineDisplay}*/}
        {/*value={t.PASSWORD_VALUE}*/}
        {/*onClick={() => navigation.navigate(screensList.PasswordSetting.label)}*/}
        {/*/>*/}
        <SingleLineSingleValueDisplay
          title={t.UPLOAD_PROFILE}
          Icon={() => (
            <View style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={_.isEmpty(avatar) ? Images.blankProfile : { uri: avatar }}
              />
            </View>
          )}
          onClick={() => navigation.navigate(screensList.UploadUserProfile.label)}
        />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  userId: state.appState.userId,
  avatar: state.chat.userInfo.avatar,
});

const mapDispatchToProps = _.curry(bindActionCreators)({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountSettingScreen);

const styles = {
  container: {
    backgroundColor: AppStyle.mainBackgroundColor,
  },
  singleLineDisplay: {
    marginTop: 20,
  },
  imageContainer: {
    height: 40,
    width: 40,
    marginRight: 10,
  },
  image: {
    height: 40,
    width: 40,
    resizeMode: 'contain',
  },
};

const t = {
  ID_TITLE: 'Genesis ID',
  PASSWORD_TITLE: 'Password',
  PASSWORD_VALUE: 'Set',
  UPLOAD_PROFILE: 'Update profile',
};
