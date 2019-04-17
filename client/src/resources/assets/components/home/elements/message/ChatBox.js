import React, { Component } from 'react';
import Message from './Message';
import { connect } from 'react-redux';
import MaterialIcon from 'material-icons-react';
import * as chatsocket from '../../../../../../socket/chatsocket';
import * as socketClientIO from 'socket.io-client';

const mapStateToProps = (state) => ({ ...state.handleListChat, ...state.handleMessage });

const mapDispatchToProps = (dispatch) => ({
    closeThis: (username) => dispatch({
        type: 'DELETE_CHAT',
        username,
    }),

    addChat: (username) => dispatch({
        type: 'ADD_CHAT',
        // eslint-disable-next-line no-undef
        usename,
    }),

    addMessage: (roomName, message) => dispatch({
        type: 'ADD_MESSAGE',
        roomName,
        message
    })
})

const socket = socketClientIO(process.env.develop_mode);

class ChatBox extends Component {
    constructor() {
        super();
        this.state = {
            user: localStorage.getItem("user_name"),
            userName_item: null,
            message_item: null,
            see_chat: false,
            is_hidden: true,
            message_input: '',
            avatarURL: localStorage.getItem("img_url"),
            id: localStorage.getItem("U_I"),
            ramdom_id_message: "",
            messages: [],
            list_message: [],
            possible: "abcdefghijklmnopqrstuvwxyz0123456789",
            receiver: [],
            avatar: '',
            sender: localStorage.getItem('username'),
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
            for (let i = 0; i < receiver.length; i++) {
                if ( this.state.sender === receiver[i].username) {
                    this.props.addMessage(roomName, message);
                    this.setState({
                        avatar: receiver[i].avatar
                    })
                } 
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
        if (e.key === 'Enter') {
            // console.log(this.state.message_input);
            e.preventDefault();

            var roomName = 'paulra_sotatek';
            let random_id_message = ''
            for (let i = 0; i < 16; i++) {
                random_id_message += this.state.possible.charAt(Math.floor(Math.random() * this.state.possible.length));
            }

            var message = {
                id: random_id_message,
                username: window.getLoginUser(),
                timestamp: Date.now(),
                content: e.target.value,
                roomName: 'paulra_sotatek'
            }

            this.props.addMessage(roomName, message);

            chatsocket.sendMessage(message, roomName, this.state.sender);
            this.setState({
                message_input: null
            })

            e.target.value = null;
        }
    }

    render() {
        return (
            <div className="display_chatbox " style={{ display: this.state.is_hidden ? 'block' : 'none', width: this.state.see_chat ? '300px' : '200px' }}>
                <div className="chat_box" style={{ width: this.state.see_chat ? '300px' : '200px' }}>
                    <div className="header__box" onClick={this.hiddenMessage} >
                        <label>{window.getLoginUser()}</label>
                        <MaterialIcon icon="phone" />
                        <button className="btn_close" onClick={this.hiddenChat}>x</button>
                    </div>
                    <div className="chat__content" style={{ display: this.state.see_chat ? 'block' : 'none' }}>
                        <div>
                        </div>
                        <div className="content_message">
                            <Message owner={window.getLoginUser()} messages={this.props.messages} roomName='paulra_sotatek' avatar={this.state.avatar} />
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