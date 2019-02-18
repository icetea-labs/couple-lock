import React, { Component } from 'react';
import firebase from 'firebase';
import Config from '../firebase/Config';
import Message from './Message';
import { error } from 'util';

firebase.initializeApp(Config);
// Initialize Cloud Firestore through Firebase

class ChatBox extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: localStorage.getItem("user_name"),
            userName_item: null,
            message_item: null,
            useName: 'tranviet',
            seechat: true,
            hidden: true,
            list: [
                { item: 1, index: "test1" },
                { item: 2, index: "test2" }
            ],
            message_input: '',
            message: null,
            avatarURL: localStorage.getItem("img_url"),
            test: null,
            db : firebase.firestore().collection("chat_database").doc("couple").collection("chat_rooms")
        }

        this.listenMessages = this.listenMessages.bind(this);
        this.displayChat = []
        this.handleSend = this.handleSend.bind(this);
        this.hiddenMessage = this.hiddenMessage.bind(this);
        this.hiddenChat = this.hiddenChat.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillMount() {

        this.messageRef = this.state.db.doc("chat_room_1").collection("messages").get().then( snapShot => {
            console.log(snapShot)
        }).catch(error => {
            console.log(error);
        })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.user) {
            this.setState({
                userName: nextProps.user.displayName
            })
        }
    }

    hiddenMessage() {
        if (this.state.seechat) {
            this.setState({
                seechat: false
            })
        } else {
            this.setState({
                seechat: true
            })
        }

    }

    hiddenChat() {
        this.setState({
            hidden: false
        })
    }

    handleChange = (event) => {
        this.setState({
            message_input: event.target.value
        })
    }

    handleSend() {
        this.setState({
            userName: this.state.userName,
            message: this.state.message_input
        })

        var newItem = {
            userName_item: this.state.userName,
            message_item: this.state.message,
        }

        this.displayChat.push(<p id="lb_message">{this.state.message_input}</p>);
        this.messageRef.put(newItem);
        this.setState({
            message_input: ''
        })
    }

    listenMessages() {
        console.log(this.state.list)
    }

    render() {
        return (
            <div className="chat_box" style={{ display: this.state.hidden ? 'block' : 'none' }}>

                <div className="header__box" onClick={this.hiddenMessage} >
                    <label>Sotatek</label>
                    <button className="btn_close" onClick={this.hiddenChat}>x</button>
                </div>
                <div className="chat__content" style={{ display: this.state.seechat ? 'block' : 'none' }}>
                    <div>
                    </div>

                    <div className="inside_message">
                        <img src={this.state.avatarURL} />
                        <label> Chào người anh em </label>
                    </div>
                    <div className="chat-container">
                        {this.displayChat}
                    </div>
                </div>
                <hr></hr>
                <div className="chat__send" style={{ display: this.state.seechat ? 'block' : 'none' }} >
                    <textarea className="chat__input" placeholder="Type Message" onChange={this.handleChange} value={this.state.message_input} ></textarea>
                    <button type="submit" className="btn_send" onClick={this.handleSend}>Send</button>
                </div>
            </div>
        )
    }
}

export default ChatBox;