import React from 'react';
import { connect } from 'react-redux';
import PropType from 'prop-types';
import PopupCustom from './PopupCustom';
import PopupModal from './PopupModal';

class PopupWrapper extends React.Component {
  static propTypes = {
    shouldShowPopup: PropType.bool.isRequired,
  };

  render() {
    const { shouldShowPopup } = this.props;
    if (shouldShowPopup) {
      return <PopupModal />;
    } else {
      return null;
    }
  }
}

const mapStateToProps = state => ({
  shouldShowPopup: state.popup.visible,
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PopupWrapper);
