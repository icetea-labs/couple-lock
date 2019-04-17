import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import axios from 'axios';
import PubSub from 'pubsub-js';
import decryptMessage from '../../../../../../private/decrypt';

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

      if(data.find(u => u.viewed === true)){
        data.map((item) =>{
          proposeIdList.push(item.proposeId);
          if(item.viewed === true){
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
        <ModalHeader toggle={this.closePromisesModal}>Promise Alert</ModalHeader>
        <ModalBody>
          {
            (receiverPromiseList && receiverPromiseList.length > 0) ? <div>
              {
                receiverPromiseList.filter(viewed => viewed !== true).map((item, index) =>{
                  const s_message = (item.visibility === '2') ? decryptMessage(item.s_message ,item.s_key).messageEncrypt : item.s_message;
                  return(
                    <div className="request__items" key={index}>
                      <div className="detail_user">
                        <div className="user_send">{item.displayName} send you a promise</div>
                      </div>
                      <div className="content">
                        {(item.s_attachments.length > 0) && <div className="img_attachment"><img src={item.s_attachments[0].url} alt="" /></div>}
                        <div className="message">{s_message}</div>
                      </div>
                      <div className="action">
                          <div className="request__items__btn btn_promise_pop">
                            <button type="button" className="btn_pop btn_border request__items__btn__delete" onClick={ this.deniedPromises }>Deny</button>
                            <button type="button" className="btn_pop btn_background request__items__btn__accept" onClick={ this.acceptPromises }>Accept</button>
                          </div>
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