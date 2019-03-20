import React, { Component } from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';

const mapStatetoProps = (state) => ({
  ...state.handlePopUp,
  ...state.handleBanner,
})

const mapDispatchToProps = (dispatch) => ({
  showPopUp: (image, proposeId) => {
    dispatch({
      type: 'OPEN_POPUP',
      image,
      proposeId,
    })
  }
});


class BannerImage extends Component {
  constructor() {
    super();
    this.state = {
      loginUser: window.getLoginUser(),
      show_Popup: false,
      // img_sender: this.props.img_sender,
      // img_receiver: this.props.img_receiver,
    }
  }

  componentWillMount() {
    console.log(this.props.proposeId);

    // TODO : convert data to Byte

    // TODO : create aesCtr

    // TODO: decrypt data

    // TODO: convert data to string

    // TODO: connect first propose
  }

  showPopUp = (image, proposeId) => {

    console.log('data is:', image, proposeId);

    this.props.showPopUp(image, proposeId);
  }

  render() {
    return (
      <div className="banner_container mg-auto">
        {this.state.loginUser === this.props.sender ?
          <img src={this.props.img_sender} onClick={() => { this.showPopUp(this.props.img_sender, this.props.proposeId) }} /> :
          <img src={this.props.img_receiver} onClick={() => { this.showPopUp(this.props.img_receiver, this.props.proposeId) }} />
        }
      </div>
    )
  }
}

export default connect(mapStatetoProps, mapDispatchToProps)(BannerImage);