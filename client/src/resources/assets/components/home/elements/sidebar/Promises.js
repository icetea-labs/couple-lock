import React, { Component } from 'react';
import axios from 'axios';
import PubSub from 'pubsub-js';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';
// import PopupPromise from './PopupPromise';

class Promises extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginUser: window.getLoginUser(),
      acceptPromisesModal: false,
      promisesMessage: "",
      promisesImage: null,
    };
  }
  acceptPromisesModal = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  getMessagePomises = e => {
    this.setState({ promisesMessage: e.target.value,  });
  }

  promisesImage = e => {
    this.setState({
      promisesImage: e.target.files[0],
    });
  }

  isDisableAccept = () =>{
    const { promisesMessage, promisesImage } = this.state;
    if(promisesMessage.length > 0 && promisesImage != null){
      return "false" ;
    }
  }

  acceptPromises = (pId) => {
    const proposeId = pId;
    const react = 1;
    const {promisesMessage, promisesImage} = this.state;
    const dataValue = new FormData();
    dataValue.append('id', proposeId);
    dataValue.append('react', react);
    dataValue.append('message', promisesMessage);
    dataValue.append('attachment', promisesImage);

    axios.post('/api/propose/reply', dataValue)
    .then(res => {
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
    const {loginUser} = this.state;
    const sender = this.props.user.sender;
    const receiver = this.props.user.receiver;
    return (
      <div className="request_promises">
        {deniedPromises.length > 0 && <h3 className="title title_promises">Pending promise</h3>}
        <div className="request">
          {
            deniedPromises.length > 0 && deniedPromises.map((item, index) =>{
              return(
                <div className="request__items" key={index}>
                  <div className="request__items__avatar">
                    <img src={item.avatar} alt="" />
                  </div>
                  <div className="detail">
                    <button className="request__items__displayname"> {item.displayName} </button>
                    { (loginUser === sender) && <div className="request__items__pending">Pending</div> }
                    <div className="request__items__username">@{item.username}</div>
                    {
                      (loginUser === receiver) && <div className="request__items__btn">
                      <button type="button" className="request__items__btn__accept" onClick={ this.acceptPromisesModal }>Accept</button>
                      <Modal isOpen={this.state.modal} toggle={this.acceptPromisesModal} className={this.props.className}>
                        <ModalHeader toggle={this.acceptPromisesModal}>Accept Promises</ModalHeader>
                        <ModalBody>
                          <p>
                            <span>Message: </span>
                            <Input type="textarea" name="text" id="exampleText" onChange={ this.getMessagePomises } />
                          </p>
                          <p>
                            <span>Promises Images: </span>
                            <Input type="file" accept=".png, .jpg, .jpeg" name="file" onChange={this.promisesImage} />
                          </p>
                        </ModalBody>
                        <ModalFooter>
                          <Button disabled={!this.isDisableAccept()} className="accept_promises_request" onClick={() => this.acceptPromises(item.proposeId)}>Accept</Button>
                          <Button className="cancel_promises_request" color="info" onClick={this.acceptPromisesModal}>Cancel</Button>
                        </ModalFooter>
                      </Modal>
                      <button type="button" className="request__items__btn__delete">Delete</button>
                      </div>
                    }
                  </div>
                </div>
              )
            })
          }
        </div>
        {/* <div className="popup_promises_wrapper">
          <PopupPromise user={this.props.user} deniedPromises={deniedPromises} acceptPromisesModal = { this.acceptPromisesModal } />
        </div> */}
      </div>
    );
  }
}

export default Promises;