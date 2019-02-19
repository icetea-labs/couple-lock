import React, { Component } from 'react';
import axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import MaterialIcon, { image, place, arrow_drop_down } from 'material-icons-react';

class AddPropose extends Component {

    constructor(props) {
        super(props);
        this.state = {
            avatarUrl: localStorage.getItem("I_U"),
            show_friend: true,
            show_promise: false,
        }
    }

    handleShowListFriend = () => {
        this.setState({
            show_friend: true
        })
    }

    handleComeback = () =>{
        this.setState({
            show_promise: false
        })
    }

    handleClose = () => {
        this.setState({
            show_promise: false,
            show_friend: false
        })
    }

    handleShowToProMise = () => {
        this.setState({
            show_promise: true
        })
    }

    render() {
        return (
            <div>
                <button type="button" className="btn_add_promise" onClick={this.handleShowListFriend}><span className="icon-ic-add"></span>Add Promise</button>
                <Modal className="add_friend" isOpen={this.state.show_friend} toggle={this.toggle} >
                    <ModalHeader >

                        <div className="propose_header">Propose <button className="btn_close" onClick={this.handleClose}>x</button>
                        </div>
                    </ModalHeader>
                    <ModalBody>
                        <input placeholder="Search..." />
                        <ul>
                            <li>

                            </li>
                        </ul>
                    </ModalBody>
                    <ModalFooter>
                        <Button className="btn_next" onClick={this.handleShowToProMise}>Next</Button>
                    </ModalFooter>
                </Modal>

                {/* Add propose */}
                <Modal className="add_promise" isOpen={this.state.show_promise} >
                    <ModalHeader >
                        <div className="header_add"><MaterialIcon icon="arrow_back" width="20px" height="20px" color="white" onClick={this.handleComeback} /><p>Add Memory</p>
                            <button className="btn_close" onClick={this.handleClose}>x</button>
                        </div>
                    </ModalHeader>
                    <ModalBody>
                        <div >
                            <div className="describe">
                                <div className="avatar">
                                    <div className="my-avatar">
                                        <img id="my_avatar" src={this.state.avatarUrl} />
                                    </div>
                                </div>
                                <div className="text_memory">
                                    <textarea name="" id="" rows="3" placeholder="Describe your Memory..."></textarea>
                                </div>
                            </div>
                            <div className="tag_friend">
                                <div className="tag">
                                    <input type="text" className="input-tag" placeholder="TAGS:    #honeymoon #travel" />
                                </div>
                                <div className="to-avatar">
                                    <div className="friend-avatar">
                                        <img className="image_friend" src="http://pluspng.com/img-png/github-octocat-logo-vector-png--896.jpg" alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="add_more">
                            <span className="more-infor">
                                <MaterialIcon icon="image" width="10px" />
                                <p>Photo</p>
                            </span>
                            <span className="more-infor">
                                <MaterialIcon icon="place" />
                                <p>Check-in</p>
                            </span>
                            <span className="more-infor">
                                <MaterialIcon icon="arrow_drop_down" />
                                <p>Public</p>
                            </span>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button className="button-send" onClick={this.handleClose}>send</Button>
                    </ModalFooter>
                </Modal >
            </div>
        )
    }
}

export default AddPropose;