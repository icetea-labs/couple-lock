import React, { Component } from 'react';
import axios from 'axios';
import PubSub from 'pubsub-js'; import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';
import PopupRequestPromise from './PopupRequestPromise';
import encryptMessage from '../../../../../../private/encrypt';

const mapStateToProps = (state) => ({
  ...state.handleBanner
});

const mapDispatchToProps = (dispatch) => ({
  addBanner: (data) => dispatch({
    type: 'ADD_BANNER',
    proposeId: data.proposeId,
    img_sender: data.img_sender,
    img_receiver: data.img_receiver,
    sender: data.sender,
    receiver: data.receiver
  })
})

class Promises extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginUser: window.getLoginUser(),
      acceptPromisesModal: false,
      deniedPromisesModal: false,
      promisesMessage: "",
      promisesImage: null,
      possible: "abcdefghijklmnopqrstuvwxyz0123456789"
    };

    this.r_key = '';
  }
  acceptPromisesModal = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  deniedPromisesModal = () => {
    this.setState(prevState => ({
      modalDenied: !prevState.modalDenied
    }));
  }

  getMessagePomises = e => {
    this.setState({
      promisesMessage: e.target.value,
    });
  }

  promisesImage = e => {
    const img = {
      imgUpload: e.target.files[0],
      imgPreview: URL.createObjectURL(e.target.files[0]),
    }
    this.setState({
      promisesImage: img,
    });
  }

  isDisableAccept = () => {
    const {
      promisesMessage,
      promisesImage
    } = this.state;
    if (promisesMessage.length > 0 || promisesImage != null) {
      return "false";
    }
  }

  async acceptPromises(pId) {
    const proposeId = pId;
    const react = 1;
    const {
      promisesMessage,
      promisesImage
    } = this.state;
    const dataValue = new FormData();

    // TODO : create random_key
    for (let i = 0; i < 16; i++) {
      this.r_key += this.state.possible.charAt(Math.floor(Math.random() * this.state.possible.length));
    }

    dataValue.append('r_key', this.r_key);
    dataValue.append('id', proposeId);
    dataValue.append('react', react);
    dataValue.append('message', promisesMessage);
    dataValue.append('attachment', (promisesImage) ? promisesImage.imgUpload : null);

    axios.post('/api/propose/reply', dataValue)
      .then(res => {
        // console.log(res);
        // console.log(res.data);
        PubSub.publish('updatePromise');
        PubSub.publish('updateProposeDetail');
        PubSub.publish('updateBanner');
      });

    this.setState(prevState => ({
      modal: !prevState.modal,
    }));

    this.updateImage(pId);
  }

  updateImage = (pId) => {
    Promise.all([axios.get('/api/propose/details?id=' + pId)])
      .then(([res]) => {
      let data = res.data.data;

      if ('r_attachments' in data) {
        if (data.r_attachments.length !== 0) {
          var img_receiver = data.r_attachments[0].url;
        }
      }

      if ('s_attachments' in data) {
        if (data.s_attachments.length !== 0) {
          var img_sender = data.s_attachments[0].url
        }
      }

      const dataBanner = {
        pId,
        img_sender: img_sender,
        img_receiver: img_receiver,
        sender: res.data.data.sender,
        receiver: res.data.data.receiver
      }

      this.props.addBanner(dataBanner);
    });
  }

  deniedPromises = (pId) => {
    const proposeId = pId;
    const react = 2;
    const {
      promisesMessage
    } = this.state;
    const dataValue = new FormData();
    dataValue.append('id', proposeId);
    dataValue.append('react', react);
    dataValue.append('message', promisesMessage);

    axios.post('/api/propose/reply', dataValue)
      .then(res => {
        PubSub.publish('updatePromise');
        PubSub.publish('updateProposeDetail');
      })

    this.setState(prevState => ({
      modalDenied: !prevState.modalDenied,
    }));
  }

  render() {
    const receiverPromises = this.props.receiverPromises;
    return(
      <div className="request_promises">
        {receiverPromises.length > 0 && <h3 className="title title_promises">Request promise</h3>}
        <div className="request">
          {
            receiverPromises.length > 0 && receiverPromises.map((item, index) =>{
              return(
                <div className="request__items" key={index}>
                  <div className="request__items__avatar">
                    <img src={item.avatar} alt="" />
                  </div>
                  <div className="detail">
                    <button className="request__items__displayname"> {item.displayName} </button>
                    <div className="request__items__username">@{item.username}</div>
                      <div className="request__items__btn">
                      <button type="button" className="request__items__btn__accept" onClick={ this.acceptPromisesModal }>Accept</button>
                      <button type="button" className="request__items__btn__delete" onClick={ this.deniedPromisesModal }>Deny</button>
                      </div>
                  </div>

                  {/* _____ Show popup accept promise when click Accept button */}
                  <div className="accept_promises_modal">
                    <Modal isOpen={this.state.modal} toggle={this.acceptPromisesModal} className={this.props.className}>
                      <ModalHeader toggle={this.acceptPromisesModal}>Accept Promises</ModalHeader>
                      <ModalBody>
                        <p className="send_message">Your message</p>
                        <Input className="msg_text" type="textarea" name="text" id="exampleText" placeholder="" onChange={ this.getMessagePomises } />
                        <div className="upload_img_promise">
                            <span class="icon-photo"></span>
                            <Input type="file" accept=".png, .jpg, .jpeg" name="file" onChange={this.promisesImage} />
                        </div>
                        {
                          (this.state.promisesImage != null) && <div className="img_preview"><img src={this.state.promisesImage.imgPreview} alt="" /></div>
                        }
                        <div className="btn_promise_pop">
                          <button type="button" className="cancel_promises_request btn_pop btn_border" onClick={this.acceptPromisesModal}>Cancel</button>
                          <button type="button" className="accept_promises_request btn_pop btn_background" disabled={!this.isDisableAccept()}  onClick={() => this.acceptPromises(item.proposeId)}>Accept</button>
                        </div>
                      </ModalBody>
                    </Modal>
                  </div>
                  
                  {/* _____ Show popup deny promise when click Deny button */}
                  <div className="denied_promises_modal">
                    <Modal isOpen={this.state.modalDenied} toggle={this.deniedPromisesModal} className={this.props.className}>
                        <ModalHeader toggle={this.deniedPromisesModal}>Denied Promises</ModalHeader>
                        <ModalBody>
                          <div>
                            <p className="send_message">Your message</p>
                            <Input type="textarea" className="msg_text" name="text" id="exampleText" onChange={ this.getMessagePomises } />
                          </div>

                          <div className="btn_promise_pop">
                            <button type="button" className="btn_pop btn_border" color="info" onClick={this.deniedPromisesModal}>Cancel</button>
                            <button type="button" disabled={!this.isDisableAccept()} className="btn_pop btn_background" onClick={() => this.deniedPromises(item.proposeId)}>Deny</button>
                          </div>
                        </ModalBody>
                    </Modal>
                  </div>
                </div>
              )
            })
          }
        </div>
        <div className="popup_promises_wrapper">
          <PopupRequestPromise
            acceptPromisesModal = { this.acceptPromisesModal }
            deniedPromisesModal = { this.deniedPromisesModal } />
        </div>
      </div>
    )  
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Promises);