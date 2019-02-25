import React, { Component } from 'react';
import axios from 'axios';

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
  getImgBanner = () => {
    const {loginUser} = this.state;
    axios.get(`/api/propose/list?username=${loginUser}`)
    .then(res => {
      this.setState({ imgBanner: res.data.data });
    });
  }

  render() {
    const {imgBanner, loginUser} = this.state;
    return (
      <div>
        {
          imgBanner.length > 0 && imgBanner.map((item, index) => {
            const id = item.id;
            const proposeId = this.props.proposeId;
            return(
              (id === proposeId && loginUser === item.sender && item.s_attachments.length > 0) ? <div className="banner_container mg-auto" key={index}>
                <img src={item.s_attachments[0].url} alt="" />
                <p className="short_desc color-violet"><span className="icon-luggage"></span>
                  {item.s_attachments[0].caption}
                </p>
              </div> : (id === proposeId && loginUser === item.receiver && item.r_attachments.length > 0) && <div className="banner_container mg-auto" key={index}>
                <img src={item.r_attachments[0].url} alt="" />
                <p className="short_desc color-violet"><span className="icon-luggage"></span>
                  {item.r_attachments[0].caption}
                </p>
              </div>
            )
          })
        }
      </div>
    );
  }
}

export default BannerImage;