import React, { Component } from 'react';

class ChatBox extends Component {

    constructor(props) {
        super(props);
        this.state = {
            seechat: true,
            hidden: true,
        }
        this.hiddenMessage = this.hiddenMessage.bind(this);
        this.hiddenChat = this.hiddenChat.bind(this);
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

    render() {
        return (
            <div className="chat_box" style={{ display: this.state.hidden ? 'block' : 'none' }}>
                <div className="header__box" onClick={this.hiddenMessage} >
                    <label>Sotatek</label>
                    <button className="btn_close" onClick={this.hiddenChat}>x</button>
                </div>
                <div className="chat__content" style={{ display: this.state.seechat ? 'block' : 'none' }}>tính năng đang phát triển</div>
            </div>
        )
    }
}

export default ChatBox;