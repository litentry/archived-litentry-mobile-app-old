import React from 'react';
import { Image, Platform, StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { ImagePicker, Permissions } from 'expo';
import AppStyle from '../commons/AppStyle';
import GenesisButton from '../components/GenesisButton';
import Images from '../commons/Images';
import { MIME_EXTENSIONS } from '../modules/Chat/lib/blob-helpers';
import { renderImageSource, validateImageSize } from '../utils/imageUtils';
import { popupAction } from '../actions/popupAction';

const isValidExtension = imageCallback => {
  const extension = imageCallback.uri.split('.')[1];
  return extension && MIME_EXTENSIONS.indexOf(extension) !== -1;
};

const generatePhotoObject = image => ({
  type: image.uri.split('.')[1],
  data: image.base64,
});

class PhotoUploader extends React.Component {
  static propTypes = {
    onConfirm: PropTypes.func.isRequired,
    photo: PropTypes.object.isRequired,
    updatePhoto: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,

    showPopup: PropTypes.func.isRequired,
  };

  validateAndUpdateImage = image => {
    const { showPopup, updatePhoto } = this.props;
    if (image.cancelled || !isValidExtension(image)) {
      return showPopup(t.PHOTO_TYPE_ERROR);
    }
    if (!validateImageSize(image.base64)) {
      return showPopup(t.PHOTO_BIG_ERROR);
    }
    updatePhoto(generatePhotoObject(image));
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

  render() {
    const { photo, onConfirm, title } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.profileContainer}>
          <Image style={styles.profile} resizeMode="contain" source={renderImageSource(photo)} />
        </View>
        <GenesisButton style={styles.pickButton} action={this.pickFromCamera} text={t.TAKE_PHOTO} />
        <GenesisButton
          style={styles.pickButton}
          action={this.pickFromGallery}
          text={t.FROM_GALLERY}
        />
        <GenesisButton containerStyle={styles.nextButton} action={onConfirm} text={t.NEXT} />
        <Text style={styles.textContainer}>
          <Text style={styles.noticeText}>{t.NOTICE}</Text>
        </Text>
      </View>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = _.curry(bindActionCreators)({
  showPopup: popupAction.showPopup,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PhotoUploader);

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
  TAKE_PHOTO: 'Take a Photo',
  FROM_GALLERY: 'Choose from gallery',
  NOTICE: 'File size should be less than 4 MB',
  GALLERY_ALERT:
    'Hey! You might want to enable camera for my app, then you may pick you awesome photos.',
  CAMERA_ALERT:
    'Hey! You might want to enable camera roll for my app, then you may make brand new profile.',
  NEXT: 'Next',
  PHOTO_BIG_ERROR: 'Photo size too large, please choose a small one',
  PHOTO_TYPE_ERROR: 'Photo format is not supported or upload failed',
};
