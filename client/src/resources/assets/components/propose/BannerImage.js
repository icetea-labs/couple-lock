import React, { Component } from 'react';
import axios from 'axios';
import PubSub from 'pubsub-js';

class BannerImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgBanner: [],
      loginUser: window.getLoginUser(),
    }
  }

  componentDidMount() {
    this.getImgBanner();
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
      // console.log(item);
      if(item.id === proposeId && loginUser === item.sender && item.r_attachments.length > 0){
        return(
          <div className="banner_container mg-auto" key={index}>
            <img src={item.r_attachments[0].url} alt="" />
            {
              (item.s_attachments.length > 0) && <p className="short_desc color-violet"><span className="icon-luggage"></span>
              {item.r_attachments[0].caption}
              </p>
            }
          </div>
        )     
      }else if(item.id === proposeId && loginUser === item.receiver && item.s_attachments.length > 0){
        return(
          <div className="banner_container mg-auto" key={index}>
            <img src={item.s_attachments[0].url} alt="" />
            {
              (item.s_attachments[0].length > 0) && <p className="short_desc color-violet"><span className="icon-luggage"></span>
              {item.s_attachments[0].caption}
              </p>
            }
          </div>
        )
      }else{
        // console.log("No images");
      }
    })
    return list;
  }
  render() {
    return (
      <div>
        { this.showImgBanner () }
      </div>
    );
  }
}

export default BannerImage;