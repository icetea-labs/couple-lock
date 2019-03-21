import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import axios from 'axios';
import PubSub from 'pubsub-js';

class PendingPromise extends Component {
  constructor(props) {
    super(props);
    this.state = {
      receiverPromiseList: [],
      proposeIdList: [],
    }
  }

  componentWillMount() {
    const proposeIdList = []; 
    PubSub.subscribe('deniedPromise', (msg, data) => {
      this.setState({ receiverPromiseList : data});

      if(data.find(u => u.viewed !== true)){
        data.map((item) =>{
          proposeIdList.push(item.proposeId);
          if(item.viewed !== true){
            this.popupPromises();
            axios.get(`/api/propose/viewed?id=${proposeIdList.join()}`);
          }
        })
      }
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
    const {receiverPromiseList} = this.state
    return(
      <Modal className="promise_popup" isOpen={this.state.modal} toggle={this.closePromisesModal} >
        <ModalHeader toggle={this.closePromisesModal}>Request Promises</ModalHeader>
        <ModalBody>
          {
            (receiverPromiseList && receiverPromiseList.length > 0) ? <div>
              {
                receiverPromiseList.map((item, index) =>{
                  if(item.viewed !== true){
                    return(
                      <div className="request__items" key={index}>
                        <div className="detail_user">
                          <img className="avatar" src={item.avatar} alt="" />
                          <div>
                            <button className="displayname"> {item.displayName} </button>
                            <div className="username">@{item.username}</div>
                          </div>
                        </div>
                        <div className="content">
                          <div className="message">Message: {item.s_message}</div>
                          {(item.s_attachments.length > 0) && <div className="img_attachment"><img src={item.s_attachments[0].url} alt="" /></div>}
                        </div>
                        <div className="action">
                            <div className="request__items__btn">
                              <button type="button" className="request__items__btn__accept" onClick={ this.acceptPromises }>Accept</button>
                              <button type="button" className="request__items__btn__delete" onClick={ this.deniedPromises }>Deny</button>
                            </div>
                        </div>
                      </div>
                    )
                  }
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