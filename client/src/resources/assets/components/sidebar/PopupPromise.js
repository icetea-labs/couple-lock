import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import axios from 'axios';

class PendingPromise extends Component {
  constructor(props) {
    super(props);
    this.state = {
      acceptPromisesModal: false,
      loginUser: window.getLoginUser(),
      viewed: false,
    }
  }

  componentWillReceiveProps(nextProps){
    const deniedPromises = this.props.deniedPromises;
    const receiver = this.props.user.receiver;
    const {loginUser} = this.state;
    if(this.props !== nextProps && deniedPromises.length > 0 && loginUser===receiver){
      this.popupPromises();
    }
  }

  popupPromises = () => {
    setTimeout(() => {
      this.setState({ modal: true })
    }, 3000);
    
    this.getViewed();
  }
  
  getViewed = () => {
    axios.get('/api/propose/viewed?id=0')
    .then(res => {
      // console.log(res.data);
      this.setState({ viewed: res.data });
    })
  }

  openPromisesModal = () => {
    this.props.acceptPromisesModal();
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
                      <button type="button" className="request__items__btn__accept" onClick={ this.openPromisesModal }>Accept</button>
                      <button type="button" className="request__items__btn__delete">Delete</button>
                      </div>
                    }
                  </div>
                </div>
              )
            })
          }
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default PendingPromise;