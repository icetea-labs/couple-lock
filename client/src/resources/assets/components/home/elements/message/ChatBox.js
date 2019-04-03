import React, { Component } from 'react';
import firebase from 'firebase';
import Config from '../firebase/Config';
import Message from './Message';
import PubSub from 'pubsub-js';
import { connect } from 'react-redux';
// import { number, string, object } from 'prop-types';
import MaterialIcon from 'material-icons-react';
import * as chatsocket from '../../../../../../socket/chatsocket';
import * as socketClientIO from 'socket.io-client';
import { addMessage } from '../../../../../../reducers/actions/message';


firebase.initializeApp(Config);
// Initialize Cloud Firestore through Firebase

const mapStateToProps = (state) => ({ ...state.initListFriend, ...state.handleMessage });

const mapDispatchToProps = (dispatch) => ({
    closeThis: (username) => dispatch({
        type: 'DELETE_FRIEND',
        username,
    }),

    addChat: (username) => dispatch({
        type: 'ADD_FRIEND',
        // eslint-disable-next-line no-undef
        usename,
    }),

    addMessage: (roomName, message) => dispatch({
        type: 'ADD_MESSAGE',
        roomName,
        message
    })
})

const socket = socketClientIO('localhost:5000');

class ChatBox extends Component {
    constructor() {
        super();
        this.state = {
            user: localStorage.getItem("user_name"),
            userName_item: null,
            message_item: null,
            see_chat: false,
            is_hidden: true,
            message_input: 'hello',
            avatarURL: localStorage.getItem("img_url"),
            id: localStorage.getItem("U_I"),
            ramdom_id_message: "",
            messages: [],
            list_message: [],

            // Redux test

        }
        this.displayChat = [];
    }

    // TODO: feaching data and handle message
    fetchMessageData() {

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps !== this.props) {

        }
    }

    componentDidMount() {
        socket.on("receiveMessage", (message, roomName, receiver) => {
            if (window.getLoginUser() === receiver) {
                this.props.addMessage(roomName, message);
                // alert('ok');
            }
        })
    }

    hiddenMessage = () => {
        this.setState({
            see_chat: !this.state.see_chat
        })
    }

    hiddenChat = () => {
        this.setState({
            is_hidden: false
        })
    }

    handleSend = () => {
        this.setState({
            message_input: ''
        })
    }

    handleChange = (e) => {
        this.setState({
            message_input: e.target.value
        })
    }

    sendMessage = (e) => {
        // for (let i = 0; i < 20; i++) {
        //     this.state.random_id_message += this.state.possible.charAt(Math.floor(Math.random() * 20));
        // }
        var mesage = {
            id: 1,
            username: window.getLoginUser(),
            timestamp: Date.now(),
            content: e.target.value,
            roomName: 'paulra_sotatek'
        }

        if (e.key === 'Enter') {
            // console.log(this.state.message_input);
            var roomName = 'paulra_sotatek';
            var receiver = 'paulra';

            chatsocket.sendMessage(mesage, roomName, receiver);
            this.setState({
                message_input: null
            })
        }
    }

    render() {
        return (
            <div className="display_chatbox " style={{ display: this.state.is_hidden ? 'block' : 'none', width: this.state.see_chat ? '300px' : '200px' }}>
                <div className="chat_box" style={{ width: this.state.see_chat ? '300px' : '200px' }}>
                    <div className="header__box" onClick={this.hiddenMessage} >
                        <label>{window.getLoginUser() }</label>
                        <MaterialIcon icon="phone" />
                        <button className="btn_close" onClick={this.hiddenChat}>x</button>
                    </div>
                    <div className="chat__content" style={{ display: this.state.see_chat ? 'block' : 'none' }}>
                        <div>
                        </div>
                        <div className="inside_message">
                            <img src={this.state.avatarURL} />
                            <div className="content_message"><label id="friend_message" >Chào người anh em</label></div>
                        </div>
                        <div className="content_message">
                            <Message owner={window.getLoginUser()} messages={this.props.messages} roomName='paulra_sotatek' />
                        </div>
                    </div>
                    <div className="chat__send" style={{ display: this.state.see_chat ? 'block' : 'none' }} >
                        <textarea className="chat__input" placeholder="Type Message" onKeyPress={this.sendMessage} value={this.state.message_input} onChange={this.handleChange} >
                            {/* {this.state.message_input} */}
                        </textarea>

                        <div className="icon">
                            <MaterialIcon icon="photo" />
                            <MaterialIcon icon="face" />
                            <MaterialIcon icon="settings_voice" />
                            <MaterialIcon icon="play_for_work" />
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatBox);