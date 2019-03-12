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
      show_Popup: false,
      id: null
    }
    this.showPopUp = (data) => { this.props.showPopUp(data) }
  }

  componentDidMount() {
    this.getImgBanner()
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

  check = () => {
    try {
      console.log(this.state.imgBanner[0].id);
    } catch (err){
      console.log(err);
      throw(err);
    }
  }
  render() {
    const { imgBanner, loginUser } = this.state;
    return (
      <div >
        {
          imgBanner.length > 0 && imgBanner.map((item, index) => {
            const id = item.id;
            const proposeId = this.props.proposeId;

            return (
              (id === proposeId && loginUser === item.sender && item.s_attachments) ?
                <div className="banner_container mg-auto" key={index}>
                  <img id={id} src={item.s_attachments[0].url} alt="sender image" onClick={this.showPopUp} />
                  <p className="short_desc color-violet"><span className="icon-luggage"></span>
                    {item.s_attachments[0].caption}
                  </p>
                </div> : (id === proposeId && loginUser === item.receiver && item.r_attachments) && <div className="banner_container mg-auto" key={index}>
                  <img id={id} src={item.r_attachments[0].url} alt="" onClick={this.showPopUp} />
                  {
                    (item.r_attachments) && <p className="short_desc color-violet"><span className="icon-luggage"></span>
                      {item.r_attachments[0].caption}
                    </p>
                  }
                </div>
            );

          })
        }
      </div>
    );
  }

}

export default connect(mapStatetoProps, mapDispatchToProps)(BannerImage);