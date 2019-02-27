import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';

class PendingPromise extends Component {
  constructor(props) {
    super(props);
    this.state = {
      acceptPromisesModal: false,
      loginUser: window.getLoginUser(),
    }
  }

  componentDidMount() {
    this.acceptPromisesModal();
  }
  

  acceptPromisesModal = () => {
    setTimeout(() => {
      this.setState(prevState => ({
        modal: !prevState.modal
      }));
    }, 3500);
  }

  closePromisesModal = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  render() {
    const deniedPromises = this.props.deniedPromises;
    const receiver = this.props.user.receiver;
    const {loginUser} = this.state;
    return (
      <div>
        <Modal className="promise_popup" isOpen={this.state.modal} toggle={this.closePromisesModal} >
          <ModalHeader toggle={this.closePromisesModal}>Request Promises</ModalHeader>
          <ModalBody>
          {
            deniedPromises.length > 0 && deniedPromises.map((item, index) =>{
              return(
                <div className="request__items" key={index}>
                  <div className="request__items__avatar">
                    <img src={item.avatar} alt="" />
                  </div>
                  <div className="detail">
                    <button className="request__items__displayname"> {item.displayName} </button>
                    <div className="request__items__username">@{item.username}</div>
                    {
                      (loginUser === receiver) && <div className="request__items__btn">
                      <button type="button" className="request__items__btn__accept" onClick={ this.acceptPromisesModal }>Accept</button>
                      <button type="button" className="request__items__btn__delete">Delete</button>
                      </div>
                    }
                  </div>
                </div>
              )
            })
          }
          </ModalBody>
          {/* <ModalFooter>
            <Button disabled={!this.isDisableAccept()} className="accept_promises_request" onClick={() => this.acceptPromises(item.proposeId)}>Accept</Button>
            <Button className="cancel_promises_request" color="info" onClick={this.acceptPromisesModal}>Cancel</Button>
          </ModalFooter> */}
        </Modal>
      </div>
    );
  }
}

export default PendingPromise;