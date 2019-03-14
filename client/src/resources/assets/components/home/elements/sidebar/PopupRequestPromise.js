import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import axios from 'axios';
import PubSub from 'pubsub-js';

class PendingPromise extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // acceptPromisesModal: false,
      loginUser: window.getLoginUser(),
      deniedPromises: [],
      proposeIdList: [],
    }
  }

  componentWillMount() {
    const {loginUser} = this.state;
    const proposeIdList = [];
    PubSub.subscribe('deniedPromise', (msg, data) => {
      // console.log(data);
      this.setState({ deniedPromises : data});

      data.filter(u => u.viewed !== true).map((item) =>{
        proposeIdList.push(item.proposeId);
        if(item.viewed !== true){
          this.popupPromises();
          axios.get(`/api/propose/viewed?id=${proposeIdList.join(';')}`);
        }
      })
    })
  }

  popupPromises = () => {
    setTimeout(() => {
      this.setState({ modal: true })
    }, 1500);
  }

  acceptPromises = () => {
    this.props.acceptPromisesModal();
  }
  
  deniedPromises = () => {
    this.props.deniedPromisesModal();
  }

  closePromisesModal = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }


  showRequestPromises = () =>{
    const {loginUser, deniedPromises} = this.state
    return(
      <Modal className="promise_popup" isOpen={this.state.modal} toggle={this.closePromisesModal} >
        <ModalHeader toggle={this.closePromisesModal}>Request Promises</ModalHeader>
        <ModalBody>
          {
            (deniedPromises && deniedPromises.length > 0) ? <div>
              {
                deniedPromises.map((item, index) =>{
                  return(
                    <div className="request__items" key={index} id={item.proposeId}>
                      <div className="request__items__avatar">
                        <img src={item.avatar} alt="" />
                      </div>
                      <div className="detail">
                        <button className="request__items__displayname"> {item.displayName} </button>
                        <div className="request__items__username">@{item.username}</div>
                        { (loginUser === item.receiver) && <div className="request__items__btn">
                            <button type="button" className="request__items__btn__accept" onClick={ this.acceptPromises }>Accept</button>
                            <button type="button" className="request__items__btn__delete" onClick={ this.deniedPromises }>Denied</button>
                          </div> }
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