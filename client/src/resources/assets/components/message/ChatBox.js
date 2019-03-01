import React, { Component } from 'react';
import firebase from 'firebase';
import Config from '../firebase/Config';
import Message from './Message';
import PubSub from 'pubsub-js';
import { number, string, object } from 'prop-types';
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
            seechat: false,
            hidden: true,
            message_input: '',
            avatarURL: localStorage.getItem("img_url"),
            id: localStorage.getItem("U_I"),
            ramdom_id_message: "",
            messages: [],
            list_message: [],
        }
        this.displayChat = [];
        this.hiddenMessage = this.hiddenMessage.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.componentWillMount = this.componentWillMount.bind(this);

    }

    fetchMessageData() {

    }

    componentWillMount() {
        PubSub.subscribe('reload', this.fetchMessageData());
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

    hiddenChat = () => {
        this.setState({
            hidden: false
        })
    }

    handleChange = (event) => {
        this.setState({
            message_input: event.target.value
        })
    }

    handleSend = () => {

        for (let i = 0; i < 20; i++) {
            this.state.ramdom_id_message += this.state.possible.charAt(Math.floor(Math.random() * 20));
        }

        firebase.firestore()
            .collection("chat_data_bases")
            .doc("couple")
            .collection("chat_rooms")
            .doc("chat_room_1")
            .collection("messages")
            .doc(this.state.ramdom_id_message).set({
                content: this.state.message_input,
                owner: this.state.id,
                timestamp: Date.now(),
                id: this.state.ramdom_id_message,
            });
        // TODO: Reload database in message
        this.setState({
            message_input: ''
        })

        PubSub.publish('reload');
    }

    render() {
        return (
            <div className="display_chatbox div_tr" style={{ display: this.state.hidden ? 'block' : 'none', width: this.state.seechat ? '300px' : '200px'}}>
                <div className="chat_box" style= {{width: this.state.seechat ? '300px' : '200px'}}>
                    <div className="header__box" onClick={this.hiddenMessage} >
                        <label>Paulra</label>
                        <button className="btn_close" onClick={this.hiddenChat}>x</button>
                    </div>
                    <div className="chat__content" style={{ display: this.state.seechat ? 'block' : 'none' }}>
                        <div>
                        </div>
                        <div className="inside_message">
                            <img src={this.state.avatarURL} />
                            <div className="content_message"><label id="friend_message" >Chào người anh em</label></div>
                        </div>

                        <div className="content_message">
                            <Message owner={window.getLoginUser()} />
                        </div>
                    </div>
                    <div className="chat__send" style={{ display: this.state.seechat ? 'block' : 'none' }} >
                        <hr></hr>
                        <textarea className="chat__input" placeholder="Type Message" onChange={this.handleChange} value={this.state.message_input} ></textarea>
                        <button type="submit" className="btn_send" onClick={this.handleSend}>Send</button>
                    </div>
                </div>
            </div>

        )
    }
}

export default ChatBox;