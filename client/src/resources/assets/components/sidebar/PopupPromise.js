import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import axios from 'axios';

class PendingPromise extends Component {
  constructor(props) {
    super(props);
    this.state = {
      acceptPromisesModal: false,
      loginUser: window.getLoginUser(),
    }
  }

  componentDidMount(){
    axios.get('/api/propose/viewed?id=richard_1551346465533');
  }

  componentWillReceiveProps(nextProps){
    const {loginUser} = this.state;
    const deniedPromises = this.props.deniedPromises.filter(item => item.receiver === loginUser)
    
    deniedPromises.forEach(item => {
      if(this.props !== nextProps && item.receiver === loginUser){
        this.popupPromises();
      }
    });
  }

  popupPromises = () => {
    setTimeout(() => {
      this.setState({ modal: true })
    }, 1500);
  }

  openPromisesModal = () => {
    this.props.acceptPromisesModal();
  }

  closePromisesModal = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }


  showRequestPromises = () =>{
    return(
      <Modal className="promise_popup" isOpen={this.state.modal} toggle={this.closePromisesModal} >
        <ModalHeader toggle={this.closePromisesModal}>Request Promises</ModalHeader>
        <ModalBody>
          {
            (this.props.deniedPromises && this.props.deniedPromises.length > 0) ? <div>
              {
                this.props.deniedPromises.map((item, index) =>{
                  return(
                    <div className="request__items" key={index}>
                      <div className="request__items__avatar">
                        <img src={item.avatar} alt="" />
                      </div>
                      <div className="detail">
                        <button className="request__items__displayname"> {item.displayName} </button>
                        <div className="request__items__username">@{item.username}</div>
                        {
                          <div className="request__items__btn">
                          <button type="button" className="request__items__btn__accept" onClick={ this.openPromisesModal }>Accept</button>
                          <button type="button" className="request__items__btn__delete">Delete</button>
                          </div>
                        }
                      </div>
                    </div>
                  )
                })
              }
            </div> : <div className="rp_message">No request promises</div>
          }
        </ModalBody>
      </Modal>
    )
  }

  render() {
    return (
      <div>{ this.showRequestPromises() }</div>
    );
  }
}

export default PendingPromise;