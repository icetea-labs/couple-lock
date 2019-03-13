import React, { Component } from 'react';
import axios from 'axios';
import PopUp from '../popup/PopUp';
import PubSub from 'pubsub-js';
import { connect } from 'react-redux';

const mapStatetoProps = (state) => ({
  ...state.handlePopUp,
  ...state.handleBanner,
})

const mapDispatchToProps = (dispatch) => ({
  showPopUp: (data = "open now") => {
    dispatch({
      type: 'OPEN_POPUP',
      data,
    })
  }
});


class BannerImage extends Component {
  constructor() {
    super();
    this.state = {
      imgBanner: [],
      loginUser: window.getLoginUser(),
      show_Popup: false,
      data: null,
      img: null,
    }

    this.img_sender = [];
    this.img_receiver = [];
  }

  componentWillMount() {
    PubSub.subscribe('updateBanner', () => {
      this.getImgBanner();
    });
  }

  async componentDidMount() {
    this.getImgBanner();
    console.log(this.img_receiver);
  }


  getImgBanner = () => {
    console.log(this.props);
    axios.get(`/api/propose/list?username=${this.props.sender}`)
      .then(res => {
        console.log(res)
        this.setState({
          imgBanner: res.data.data,
        });

        console.log(this.state.imgBanner)
        this.showImgBanner();
      });
  }

  showImgBanner = () => {
    const { imgBanner, loginUser } = this.state;
    const proposeId = this.props.proposeId;
    const list = imgBanner.length > 0 && imgBanner.map((item, index) => {
      if (item.id === proposeId && loginUser === item.sender && item.r_attachments) {
        return (
          <div key={index}>
            {(item.r_attachments.length > 0) && <img src={item.r_attachments[0].url} alt="" onClick={this.showPopUp} />}
          </div>
        )
      } else if (item.id === proposeId && loginUser === item.receiver && item.s_attachments) {
        return (
          <div key={index}>
            {(item.s_attachments.length > 0) && <img src={item.s_attachments[0].url} alt="" onClick={this.showPopUp} />}
          </div>
        )
      } else {
        //console.log("false");
      }
    })
    return list;
  }

  showPopUp = (data) => {
    this.props.showPopUp(data.target.value);
  }

  render() {
    return (
      <div className="banner_container mg-auto">
        <div className="sender-img--right">
          {this.showImgBanner}
        </div>
        <div className="receiver-img--left">
        </div>
      </div>
    );
  }

}

export default connect(mapStatetoProps, mapDispatchToProps)(BannerImage);