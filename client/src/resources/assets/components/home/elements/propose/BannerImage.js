import React, { Component } from 'react';
import axios from 'axios';
import PopUp from '../popup/PopUp';
import PubSub from 'pubsub-js';

class BannerImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgBanner: [],
      loginUser: window.getLoginUser(),
      show_Popup: false
    }
  }

  componentDidMount() {
    this.getImgBanner()
  }

  showPopUp = () => {
    if (this.state.show_Popup === "true") {
      this.setState({
        show_Popup: false
      })
    } else {
      this.setState({
        show_PopUp: true
      })
    }

    return this.state.show_Popup
  }

  componentWillMount() {
    const { loginUser } = this.state;
    PubSub.subscribe('updateBanner', () => {
      axios.get(`/api/propose/list?username=${loginUser}`)
        .then(res => {
          this.setState({ imgBanner: res.data.data });
        });
    });
  }

  getImgBanner = () => {
    const { loginUser } = this.state;
    axios.get(`/api/propose/list?username=${loginUser}`)
      .then(res => {
        this.setState({ imgBanner: res.data.data });
      });
  }

  render() {
    const { imgBanner, loginUser } = this.state;
    return (
      <div onClick={this.showPopUp}>
        {
          imgBanner.length > 0 && imgBanner.map((item, index) => {
            const id = item.id;
            const proposeId = this.props.proposeId;
            return (
              (
                id === proposeId && loginUser === item.sender && item.s_attachments) ?
                <div className="banner_container mg-auto" key={index}>
                  <img src={item.s_attachments[0].url} alt="sender image" />
                  <p className="short_desc color-violet"><span className="icon-luggage"></span>
                    {item.s_attachments[0].caption}
                  </p>
                </div> : (id === proposeId && loginUser === item.receiver && item.r_attachments) && <div className="banner_container mg-auto" key={index}>
                  <img src={item.r_attachments[0].url} alt="" />
                  {
                    (item.r_attachments) && <p className="short_desc color-violet"><span className="icon-luggage"></span>
                      {item.r_attachments[0].caption}
                    </p>
                  }
                </div>
            )
          })
        }
        <PopUp isOpen={this.showPopUp} />
      </div>

    );
  }
}

export default BannerImage;