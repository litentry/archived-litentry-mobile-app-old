import React from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import AppStyle from '../../../commons/AppStyle';
import { screensList } from '../../../navigation/screensList';
import NavigationHeader from '../../../components/NavigationHeader';
import { userRegisterAction } from '../actions/userRegiseterActions';
import TinodeAPI from '../../Chat/TinodeAPI';
import PhotoUploader from '../../../components/PhotoUploader';

class UploadUserProfileScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: <NavigationHeader title={screensList.UploadUserProfile.title} />,
    headerBackTitle: '',
    headerStyle: {
      backgroundColor: AppStyle.backgroundColor,
    },
  });

  static propTypes = {
    navigation: PropTypes.object,
    updateUserRegisterInfo: PropTypes.func.isRequired,
    photo: PropTypes.object,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  };

  createAccountRequest = () => {
    const { navigation, username, password, email, photo } = this.props;
    TinodeAPI.handleCreateNewAccount(navigation, email, password, username, photo);
  };

  updatePhoto = photoObject => {
    const { updateUserRegisterInfo } = this.props;
    updateUserRegisterInfo({ photo: photoObject });
  };

  render() {
    const { photo } = this.props;
    return (
      <PhotoUploader
        onConfirm={this.createAccountRequest}
        photo={photo}
        updatePhoto={this.updatePhoto}
        title={t.TITLE}
      />
    );
  }
}

const mapStateToProps = state => ({
  photo: state.userRegister.photo,
  username: state.userRegister.username,
  password: state.userRegister.password,
  email: state.userRegister.email,
});

const mapDispatchToProps = _.curry(bindActionCreators)({
  updateUserRegisterInfo: userRegisterAction.update,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadUserProfileScreen);

const t = {
  TITLE: 'Upload a profile photo',
};
