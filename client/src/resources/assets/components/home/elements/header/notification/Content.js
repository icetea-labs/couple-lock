import React, { Component } from 'react';
import axios from 'axios';

class Content extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name_noti: [
                'đã tạo một hẹn ước mới với ',
                'đã được chấp nhận hẹn ước từ ',
                'đã thêm một kỉ niệm mới với',
            ],
            text: '',
            loading: true,
            avatar: '',
        }

        this.showNoti = [];

    }

    componentDidMount() {
        demoAsyncCall().then(() => this.setState({ loading: false }));

        Promise.all(
            [axios.get('/api/noti/list?username=' + localStorage.getItem('sender'))]
        ).then(([data]) => {
            this.setState({
                total_noti: data.data.data.length,
            })

            this.state.list_noti = data.data.data.map((item) => {
                return item;
            })

            this.addNotification();
        })
    }

    isView = (data) => {
        if ('viewed' in data) {
            return true
        }
        return false;
    }

    async addNotification() {
        for (let index = this.state.list_noti.length - 1; index >= 0; index--) {
            let item = this.state.list_noti[index];
            Promise.all([axios.get('/api/user/details?username=' + item.eventData.sender)])
                .then(([intance]) => {
                    try {
                        this.inforNoti = this.addContent(item.event, item.eventData);
                        this.image = this.inforNoti.img;
                        this.message = this.inforNoti.message;
                        this.text = this.inforNoti.text;
                        this.have_img = this.inforNoti.have_img;
                        this.avatar = intance.data.data.avatar;
                    } catch (err) { 
                        console.log(err);
                        throw err;
                    };
                    this.showNoti.push(
                        <div key={index} className={this.isView(item) ? 'li_noti' : 'li_noti viewed'} >
                            <img className="sender_img" src={this.avatar} alt="avatar sender" />
                            <div className="noti_content">
                                {item.eventData.sender === item.username ? 'Bạn' : item.eventData.sender}
                                {' ' + this.text} {item.eventData.sender !== item.username ? 'bạn' : item.eventData.receiver}
                                {':' + this.message}
                            </div>
                            <img style={{ display: this.have_img ? 'block' : 'none' }} src={this.image} className="img_receiver" alt="img" />
                        </div>
                    )
                }).catch((err) => { console.log(err) })
        }
    }

    addContent = (event, eventData) => {
        // eslint-disable-next-line default-case
        switch (event) {
            case "propose.request":
                return { img: eventData.s_attachments[0].url, message: eventData.s_message, text: this.state.name_noti[0], have_img: true };

            case "propose.reply":
                return { img: eventData.s_attachments[0].url, message: eventData.s_message, text: this.state.name_noti[1], have_img: true };

            case "memory.new":
                try {
                    if (eventData.attachments.length !== 0) {
                        return { img: eventData.attachments[0].url, message: eventData.message, text: this.state.name_noti[2], have_img: true }
                    } else
                        return { img: '', message: eventData.message, text: this.state.name_noti[2], have_img: false }
                } catch (err) {
                    console.log(err);
                }
        }
    }

    render() {

        const loading = this.state.loading;

        if (loading) { // if your component doesn't have to wait for an async action, remove this block 
            return (
                <div>loading...</div>
            )
        }

        return (
            <div className="all__content" >
                {this.showNoti}
            </div>
        );
    }
}

function demoAsyncCall() {
    return new Promise((resolve) => setTimeout(() => resolve(), 2500));
}


export default Content;