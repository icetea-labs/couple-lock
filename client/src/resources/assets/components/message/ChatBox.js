import React, { Component } from 'react';
import firebase from 'firebase';
import Config from '../firebase/Config';
import Message from './Message';
import PubSub from 'pubsub-js';
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
            list: [
                { item: 1, index: "test1" },
                { item: 2, index: "test2" }
            ],
            message_input: '',
            avatarURL: localStorage.getItem("img_url"),
            db: firebase.firestore().collection("chat_data_bases").doc("couple").collection("chat_rooms"),
            id: localStorage.getItem("U_I"),
            messageRef: '',
            load_message: [],
            ramdom_id_message: "",
            possible: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
            messages: [],
        }
        this.displayChat = [];
        this.hiddenMessage = this.hiddenMessage.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }

    componentWillMount() {
        this.messageRef = this.state.db.doc("chat_room_1").collection("messages");
        // this.messageRef.get().then(snapShot => {
        //     console.log(snapShot.data())
        // }).catch(error => {
        //     console.log(error);
        // })

        this.messageRef.get()
            .then(querySnapDocument => {
                querySnapDocument.forEach((doc) => {
                    this.state.messages = doc.data();
                    // console.log(this.state.messages);
                    this.displayChat.push(<div key={doc.data().id} id="my_message"><span>{this.state.messages.content}</span></div>);
                })
            });
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

        this.messageRef.doc(this.state.ramdom_id_message).set({
            content: this.state.message_input,
            owner: this.state.id,
            timestamp: Date.now(),
            id: this.state.ramdom_id_message,
        });

        this.state.messages = [];
        
        this.messageRef.get()
            .then((querySnapDocument) => {
                this.displayChat = [];
                querySnapDocument.forEach(
                    (doc) => {
                        this.state.messages = doc.data();
                        this.displayChat.push(<div key={doc.data().id} id="my_message"><span>{this.state.messages.content}</span></div>);
                    })
            });
        this.setState({
            message_input: ''
        })
    }

    render() {
        return (
            <div className="chat_box" style={{ display: this.state.hidden ? 'block' : 'none' }}>

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
                        {this.displayChat}
                    </div>


                </div>

                <div className="chat__send" style={{ display: this.state.seechat ? 'block' : 'none' }} >
                    <hr></hr>
                    <textarea className="chat__input" placeholder="Type Message" onChange={this.handleChange} value={this.state.message_input} ></textarea>
                    <button type="submit" className="btn_send" onClick={this.handleSend}>Send</button>
                </div>
            </div>
        )
    }
}

export default ChatBox;