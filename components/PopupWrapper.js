import React from 'react';
import { connect } from 'react-redux';
import PropType from 'prop-types';
import PopupCustom from './PopupCustom';

class PopupWrapper extends React.Component {
  static propTypes = {
    showPopup: PropType.bool.isRequired,
  };

  render() {
    const { showPopup } = this.props;
    if (showPopup) {
      return <PopupCustom />;
    } else {
      return null;
    }
  }
}

const mapStateToProps = state => ({
  showPopup: state.popup.visible,
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PopupWrapper);
