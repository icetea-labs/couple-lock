import React, { Component } from 'react';
import axios from 'axios';
import PubSub from 'pubsub-js';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';
import PopupPromise from './PopupPromise';
import encryptMessage from '../../../../../../private/encrypt';

class Promises extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginUser: window.getLoginUser(),
      acceptPromisesModal: false,
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

  getMessagePomises = e => {
    this.setState({ promisesMessage: e.target.value, });
  }

  promisesImage = e => {
    this.setState({
      promisesImage: e.target.files[0],
    });
  }

  isDisableAccept = () => {
    const { promisesMessage, promisesImage } = this.state;
    if (promisesMessage.length > 0 || promisesImage != null) {
      return "false";
    }
  }

  async acceptPromises(pId , visibility) {
    const proposeId = pId;
    const react = 1;
    const { promisesMessage, promisesImage } = this.state;
    const dataValue = new FormData();

    console.log(visibility);

    // TODO : create random_key
    for (let i = 0; i < 16; i++) {
      this.r_key += this.state.possible.charAt(Math.floor(Math.random() * this.state.possible.length));
    }

    // if (visibility === '2'){
    //   var messageHex  = encryptMessage(promisesMessage, this.r_key).messageHex;
    // }

    dataValue.append('r_key', this.r_key);
    dataValue.append('id', proposeId);
    dataValue.append('react', react);
    dataValue.append('message', promisesMessage);
    dataValue.append('attachment', promisesImage);

    axios.post('/api/propose/reply', dataValue)
      .then(res => {
        // console.log(res);
        // console.log(res.data);
        PubSub.publish('acceptPromise');
        PubSub.publish('refreshProposeDetail');
        PubSub.publish('updateBanner');
      })

    this.setState(prevState => ({
      modal: !prevState.modal,
    }));
  }

  render() {
    const deniedPromises = this.props.deniedPromises;
    return (
      <div className="request_promises">
        {deniedPromises.length > 0 && <h3 className="title title_promises">Request promise</h3>}
        <div className="request">
          {
            deniedPromises.length > 0 && deniedPromises.map((item, index) => {
              console.log(item);
              return (
                <div className="request__items" key={index}>
                  <div className="request__items__avatar">
                    <img src={item.avatar} alt="" />
                  </div>
                  <div className="detail">
                    <button className="request__items__displayname"> {item.displayName} </button>
                    <div className="request__items__username">@{item.username}</div>
                    <div className="request__items__btn">
                      <button type="button" className="request__items__btn__accept" onClick={this.acceptPromisesModal}>Accept</button>
                      <Modal isOpen={this.state.modal} toggle={this.acceptPromisesModal} className={this.props.className}>
                        <ModalHeader toggle={this.acceptPromisesModal}>Accept Promises</ModalHeader>
                        <ModalBody>
                          <p>
                            <span>Message: </span>
                            <Input type="textarea" name="text" id="exampleText" onChange={this.getMessagePomises} />
                          </p>
                          <p>
                            <span>Promises Images: </span>
                            <Input type="file" accept=".png, .jpg, .jpeg" name="file" onChange={this.promisesImage} />
                          </p>
                        </ModalBody>
                        <ModalFooter>
                          <Button disabled={!this.isDisableAccept()} className="accept_promises_request" onClick={() => this.acceptPromises(item.proposeId , item.eventData.visibility)}>Accept</Button>
                          <Button className="cancel_promises_request" color="info" onClick={this.acceptPromisesModal}>Cancel</Button>
                        </ModalFooter>
                      </Modal>
                      <button type="button" className="request__items__btn__delete">Denied</button>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
        <div className="popup_promises_wrapper">
          <PopupPromise
            deniedPromises={deniedPromises}
            acceptPromisesModal={this.acceptPromisesModal} />
        </div>
      </div>
    );
  }
}

export default Promises;