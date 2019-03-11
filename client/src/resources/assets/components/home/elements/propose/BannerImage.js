import React, { Component } from 'react';
import axios from 'axios';
import PopUp from '../popup/PopUp';
import PubSub from 'pubsub-js';
import { connect } from 'react-redux';

const mapStatetoProps = (state) => ({
  ...state.initPopup
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
  constructor(props) {
    super(props);
    this.state = {
      imgBanner: [],
      loginUser: window.getLoginUser(),
      show_Popup: false
    }
    this.showPopUp = (data) => {this.props.showPopUp(data)}
  }

  componentDidMount() {
    this.getImgBanner()
  }

  componentWillMount() {
    PubSub.subscribe('updateBanner', () => {
      this.getImgBanner();
    });
  }

  getImgBanner = () => {
    const {loginUser} = this.state;
    axios.get(`/api/propose/list?username=${loginUser}`)
    .then(res => {
      this.setState({ imgBanner: res.data.data });
    });
  }

  showImgBanner = () => {
    const {imgBanner, loginUser} = this.state;
    const proposeId = this.props.proposeId;
    const list = imgBanner.length > 0 && imgBanner.map((item, index) => {
      if(item.id === proposeId && loginUser === item.sender && item.r_attachments){
        return(
          <div key={index}>
            {(item.r_attachments.length > 0) && <img src={item.r_attachments[0].url} alt="" onClick={this.showPopUp}/>}
          </div>
        )
      }else if(item.id === proposeId && loginUser === item.receiver && item.s_attachments){
        return(
          <div key={index}>
            {(item.s_attachments.length > 0) && <img src={item.s_attachments[0].url} alt="" onClick={this.showPopUp}/>}
          </div>
        )
      }else{
        //console.log("false");
      }
    })
    return list;
  }

  render() {
    return (
      <div className="banner_container mg-auto">
        { this.showImgBanner () }
      </div>
    );
  }
}

export default connect(mapStatetoProps, mapDispatchToProps)(BannerImage);