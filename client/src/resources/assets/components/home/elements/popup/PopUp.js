import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { connect } from 'react-redux';
import MaterialIcon, { exit } from 'material-icons-react';

const  mapStateToProps = (state) => {
  return {
    ...state.handlePopup
  }
}

const mapDispatchToProps = (dispatch) => ({
  toClose: (data) => dispatch({
    type: 'CLOSE_POPUP',
    data,
  })
})

class PopUp extends Component {
  constructor() {
    super()

    this.state = {
      open_popup: false,
      comment: [
        { id: "21", avatar: "https://picsum.photos/200/200", timestamp: 1433741, content: "haha" }
      ]
    }

    this.allComment = []

    this.closePopup = event => (this.props.toClose(event));
  }

  componentWillMount = () => {
    for (let i = 0; i < 20; i++) {
      this.allComment.push(
        <div key={i}>
          <img src={this.state.comment[0].avatar} alt="" />
          <label>{this.state.comment[0].content}</label>
        </div>
      )
    }
  }

  render() {
    return (
      <Modal isOpen={this.props.open} className="pop_up" >
        <span className="out" onClick={this.closePopup}>
          x
        </span>
        <div className="left_popup">
          <div className="img_content">
            <img src={this.props.data} alt="display image" />
          </div>
        </div>
        <div className="right_popup">
          <div className="show_banner">
            <div className="sender">
              <img src="https://picsum.photos/200/200" alt="" />
              <div className="msg_sender">
                <label>No</label>
              </div>
            </div>
            <div className="receiver">
              <img src="https://picsum.photos/230/230" alt="" />
              <div className="msg_receiver">
                <label>Yes</label>
              </div>
            </div>
          </div>
          <div className="emoij">
            <span>
              <img src="/uploads/60eab78184bfaa366d9b648418abc98f" alt="" />
            </span>
          </div>
          <div className="show_comment">
            {this.allComment}
          </div>
        </div>
      </Modal>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PopUp);