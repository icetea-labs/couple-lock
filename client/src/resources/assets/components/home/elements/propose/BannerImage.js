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
      list: [],
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
        this.setState({
          imgBanner: res.data.data,
        });

        console.log(this.state.imgBanner)
        this.showImgBanner();
      });
    }

  showImgBanner = () => {
    this.state.imgBanner.forEach((item, index) => {
      if (item.r_attachments.length > 0) {
        console.log(item.r_attachments[index])
        this.img_receiver.map((item, i) => {
          return (
            <img key={i} src={item[i].url} />
          )
        })
      }

      console.log(this.img_receiver);
    })

    return this.img_receiver;
  }

  showPopUp = (data) => {
    // this.props.showPopUp(data.target.value);
  }


  check = () => {
  }

  render() {
    return (
      <div className="banner_container mg-auto">
        <div className="sender-img--right">
          {this.img_receiver}
        </div>
        <div className="receiver-img--left">
          {this.img_receiver}
        </div>
      </div>
    );
  }

}

export default connect(mapStatetoProps, mapDispatchToProps)(BannerImage);