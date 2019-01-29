import React from 'react';
import { Button, Image, Platform, StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { ImagePicker, Permissions } from 'expo';
import AppStyle from '../../../commons/AppStyle';
import { screensList } from '../../../navigation/screensList';
import NavigationHeader from '../../../components/NavigationHeader';
import GenesisButton from '../../../components/GenesisButton';
import { userRegisterAction } from '../actions/userRegiseterActions';
import Images from '../../../commons/Images';
import { makeImageUrl, MIME_EXTENSIONS } from '../../Chat/lib/blob-helpers';
import TinodeAPI from '../../Chat/TinodeAPI';
import { base64DecodedLen } from '../../../utils/imageUtils';
import { imageConfig } from '../../../config';

const isValidExtension = imageCallback => {
  const extension = imageCallback.uri.split('.')[1];
  return extension && MIME_EXTENSIONS.indexOf(extension) !== -1;
};

const generatePhotoObject = image => ({
  type: image.uri.split('.')[1],
  data: image.base64,
});

class UploadProfileScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: <NavigationHeader title={screensList.UploadProfile.title} />,
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

  validateAndUpdateImage = image => {
    const { showPopup, updateUserRegisterInfo } = this.props;
    if (image.cancelled || !isValidExtension(image)) {
      return showPopup(t.PHOTO_TYPE_ERROR);
    }
    if (base64DecodedLen(image.base64) > imageConfig.MAX_PHOTO_SIZE) {
      return showPopup(t.PHOTO_BIG_ERROR);
    }
    updateUserRegisterInfo({ photo: generatePhotoObject(image) });
  };

  pickFromCamera = async () => {
    if (Platform.OS === 'ios') {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert(t.CAMERA_ALERT);
      }
    }
    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      base64: true,
      quality: 0.78,
      aspect: [1, 1],
    });
    this.validateAndUpdateImage(image);
  };

  pickFromGallery = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL, Permissions.CAMERA);
    if (status !== 'granted') {
      alert(t.GALLERY_ALERT);
    }
    const image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'Images',
      allowsEditing: true,
      base64: true,
      quality: 0.78,
      aspect: [1, 1],
    });
    this.validateAndUpdateImage(image);
  };

  renderSource = () => {
    const { photo } = this.props;
    return _.isEmpty(photo) ? Images.blankProfile : { uri: makeImageUrl(photo) };
  };

  createAccountRequest = () => {
    const { navigation, username, password, photo, email } = this.props;
    TinodeAPI.handleCreateNewAccount(navigation, email, password, username, photo);
  };

  render() {
    const { navigation, photo } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{t.TITLE}</Text>
        <View style={styles.profileContainer}>
          <Image style={styles.profile} resizeMode="contain" source={this.renderSource()} />
        </View>
        <GenesisButton style={styles.pickButton} action={this.pickFromCamera} text={t.TAKE_PHOTO} />
        <GenesisButton
          style={styles.pickButton}
          action={this.pickFromGallery}
          text={t.FROM_GALLERY}
        />
        <GenesisButton
          // disabled={_.isEmpty(photo)}
          containerStyle={styles.nextButton}
          action={this.createAccountRequest}
          text={t.NEXT}
        />
        <Text style={styles.textContainer}>
          <Text style={styles.noticeText}>{t.NOTICE}</Text>
        </Text>
      </View>
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
)(UploadProfileScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppStyle.userBackgroundColor,
    alignItems: 'stretch',
  },
  title: {
    paddingVertical: 30,
    paddingHorizontal: 30,
    fontSize: AppStyle.fontMiddle,
    color: AppStyle.lightGrey,
    fontFamily: AppStyle.coverFont,
  },
  profileContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profile: {
    marginVertical: 50,
    height: 200,
    width: 200,
  },
  textContainer: {
    padding: 20,
    position: 'absolute',
    bottom: 20,
  },
  noticeText: {
    fontSize: AppStyle.fontSmall,
    color: AppStyle.lightGrey,
    fontFamily: AppStyle.mainFont,
  },
  pickButton: {
    backgroundColor: AppStyle.lightGrey,
  },
  nextButton: {
    marginTop: 20,
  },
});

const t = {
  TITLE: 'Upload profile photo',
  TAKE_PHOTO: 'Take a Photo',
  FROM_GALLERY: 'Choose from gallery',
  NOTICE: 'File size should be less than 1 MB',
  GALLERY_ALERT:
    'Hey! You might want to enable camera for my app, then you may pick you awesome photos.',
  CAMERA_ALERT:
    'Hey! You might want to enable camera roll for my app, then you may make brand new profile.',
  NEXT: 'Next',
  PHOTO_BIG_ERROR: 'Photo size too large, please choose a small one',
  PHOTO_TYPE_ERROR: 'Photo format is not supported or upload failed',
};
