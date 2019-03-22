import React, { Component } from 'react';
import axios from 'axios';
import socketIOClient from 'socket.io-client';
import * as aesjs from 'aes-js';
import decryptMessage from '../../../../../../../private/decrypt';



const socket = socketIOClient('localhost:5000');

class Content extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name_noti: [
                'đã tạo một hẹn ước mới với ',
                'đã nhận được hẹn ước từ ',
                'đã thêm một kỉ niệm mới với',
            ],
            text: '',
            loading: true,
            avatar: '',
            total_noti: 0,
            list_noti: [],
        }

        this.showNoti = [];
    }

    componentDidMount() {
        this.getNoti();

        socket.on('receiveNoti', data => {
            if (data === window.getLoginUser()) {
                alert('có thông báo mới')
                this.getNoti();
            }
        })
        // console.log(this.showNoti);

    }

    getNoti = () => {
        Promise.all(
            [axios.get('/api/noti/list?username=' + localStorage.getItem('username'))]
        ).then(([data]) => {
            this.setState({
                total_noti: data.data.data.length,
            })
            // console.log('data is:', data);
            this.state.list_noti = data.data.data.map((item) => {
                return item;
            })
            // console.log(this.state.list_noti);
            this.addNotification();
        });
    }

    isView = (data) => {
        if ('viewed' in data) {
            return true
        }
        return false;
    }

    addNotification = () => {
        for (let i = this.state.total_noti - 1; i >= 0; i--) {
            let item = this.state.list_noti[i];
            // console.log(this.state.list_noti[i]);
            Promise.all([axios.get('/api/user/details?username=' + item.eventData.sender)])
                // eslint-disable-next-line no-loop-func
                .then(([intance]) => {
                    // console.log(intance);

                    // console.log(item.eventData.visibility)

                    this.inforNoti = this.addContent(item.event, item.eventData);
                    this.image = this.inforNoti.img;
                    var s_key = this.inforNoti.s_key;
                    var r_key = this.inforNoti.r_key;

                    console.log(s_key, r_key)

                    // Check visibility is private
                    if (item.eventData.visibility === '2') {

                        // decode message
                        var messageDeCoded = decryptMessage(this.inforNoti.message, s_key).messageEncrypt;

                        console.log(messageDeCoded);
                    }

                    this.text = this.inforNoti.text;
                    this.have_img = this.inforNoti.have_img;
                    this.avatar = intance.data.data.avatar;

                    this.showNoti.push(
                        <div key={i} className={this.isView(item) ? 'li_noti' : 'li_noti viewed'} >
                            <img className="sender_img" src={this.avatar} alt="avatar sender" />
                            <div className="noti_content">
                                {item.eventData.sender === item.username ? 'Bạn' : item.eventData.sender}
                                {' ' + this.text} {item.eventData.sender !== item.username ? 'bạn' : item.eventData.receiver}
                                {messageDeCoded === '' ? '' : ':' + messageDeCoded}
                            </div>
                            <img style={{ display: this.have_img ? 'block' : 'none' }} src={this.image} className="img_receiver" alt="img" />
                        </div>
                    )
                }).catch((err) => { console.log(err) })
        }
    }

    componentWillUnmount() {
    }

    addContent = (event, eventData) => {

        if (eventData.s_key !== '') {
            var s_key = eventData.s_key;
        }

        if (eventData.r_key !== '') {
            var r_key = eventData.r_key;
        }
        // eslint-disable-next-line default-case
        switch (event) {
            case "propose.request":
                if (eventData.s_attachments.length !== 0) {

                    return {
                        img: eventData.s_attachments[0].url,
                        message: eventData.s_message,
                        text: this.state.name_noti[0],
                        have_img: true,
                        s_key,
                        r_key
                    }
                } else
                    return {
                        img: '',
                        message: eventData.s_message,
                        text: this.state.name_noti[0],
                        have_img: false,
                        s_key,
                        r_key
                    };

            case "propose.reply":
                if (eventData.r_attachments.length !== 0) {
                    return {
                        img: eventData.r_attachments[0].url,
                        message: eventData.r_message,
                        text: this.state.name_noti[1],
                        have_img: true,
                        s_key,
                        r_key,
                    }
                } else
                    return {
                        img: '',
                        message: eventData.r_message,
                        text: this.state.name_noti[1],
                        have_img: false,
                        s_key,
                        r_key
                    };

            case "memory.new":
                if (eventData.attachments.length !== 0) {
                    return {
                        img: eventData.attachments[0].url,
                        message: eventData.message,
                        text: this.state.name_noti[2],
                        have_img: true,
                        s_key,
                        r_key
                    }
                } else
                    return {
                        img: '',
                        message: eventData.message,
                        text: this.state.name_noti[2],
                        have_img: false,
                        s_key,
                        r_key
                    }
        }
    }

    render() {
        return (
            <div className="all__content" >
                {this.showNoti}
            </div>
        );
    }
}



export default Content;