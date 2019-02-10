import React from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import AppStyle from '../../../commons/AppStyle';
import { screensList } from '../../../navigation/screensList';
import NavigationHeader from '../../../components/NavigationHeader';
import PhotoUploader from '../../../components/PhotoUploader';
import { voteAction } from '../../Vote/voteAction';
import { groupMetaRules } from '../../../config';

class UploadCountryProfileScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: <NavigationHeader title={screensList.UploadUserProfile.title} />,
    headerBackTitle: '',
  });

  static propTypes = {
    navigation: PropTypes.object,
    profile: PropTypes.object.isRequired,
    setVote: PropTypes.func.isRequired,
  };

  onConfirm() {
    const { navigation } = this.props;
    navigation.goBack();
  }

  updateProfile = profileObject => {
    const { setVote } = this.props;
    setVote({ [groupMetaRules.PROFILE]: profileObject });
  };

  render() {
    const { profile } = this.props;
    return (
      <PhotoUploader
        onConfirm={() => this.onConfirm()}
        photo={profile}
        updatePhoto={this.updateProfile.bind(this)}
        title={t.TITLE}
      />
    );
  }
}

const mapStateToProps = state => ({
  profile: state.vote.cached.profile,
});

const mapDispatchToProps = _.curry(bindActionCreators)({
  setVote: voteAction.setVote,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadCountryProfileScreen);

const t = {
  TITLE: 'Upload a country profile photo',
};
