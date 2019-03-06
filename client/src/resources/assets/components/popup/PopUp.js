import React, { Component } from 'react';
import  { Modal, ModalHeader, ModalBody, ModalFooter }  from 'reactstrap';
import { connect } from 'react-redux';

function mapStateToProps(state){

  return {
  }
}

function mapDispatchToProps(dispatch){
  return {
  }
}

class PopUp extends Component {
  constructor(props){
    super(props)

    this.state ={
      open_popup: this.props.isOpen
    }
  }

  closePopup = () => {
    this.setState({
      open_popup: false
    })

    return this.state.open_popup;
  }


  render() {
    return (
      <Modal isOpen = {false} >
        <ModalHeader>
          OK man
          <button onClick = {this.closePopup} >Close</button>
        </ModalHeader>
        <ModalBody>
          Hi
        </ModalBody>
        <ModalFooter>
          end
        </ModalFooter>
      </Modal>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PopUp);