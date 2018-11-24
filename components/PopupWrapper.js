import React from 'react';
import { connect } from 'react-redux';
import PopupCustom from "./PopupCustom";


class PopupWrapper extends React.Component {
    render() {
      const {showPopup} = this.props
      if(showPopup) {
        return  <PopupCustom/>
      } else{
        return null
      }
    }
}

const mapStateToProps = state => ({
  showPopup: state.popup.visible,
});

const mapDispatchToProps = dispatch => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PopupWrapper);

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
};
