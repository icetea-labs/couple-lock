import React, { Component } from 'react';
import MaterialIcon, { mail, settings } from 'material-icons-react';
import axios from 'axios';
import { number } from 'prop-types';
import ToolTip from '../../../helper/ToolTip';

class Notification extends Component {

    constructor(props) {
        super(props)

        this.state = {
            see_noti: false,
            total_noti: 0,
            list_noti: [],
            name_noti: [
                'đã tạo một hẹn ước mới với ',
                'đã được chấp nhận hẹn ước từ ',
                'đã thêm một kỉ niệm mới với',
            ],
            text: '',
        }

        this.showNoti = [];
    }

    componentWillMount() {
        Promise.all(
            [axios.get('/api/noti/list?username=' + localStorage.getItem('sender'))]
        ).then(([data]) => {
            this.setState({
                total_noti: data.data.data.length,
            })

            this.state.list_noti = data.data.data.map((item) => {
                return item;
            })
            this.checkNoticationView();
            this.addNotification();
        })
    }

    // componentWillUpdate() {
    //     Promise.all(
    //         setInterval([axios.get('/api/noti/list?username=' + localStorage.getItem('sender'))], 1000)
    //     ).then(([data]) => {
    //         this.setState({
    //             total_noti: data.data.data.length,
    //         })

    //         this.state.list_noti = data.data.data.map((item) => {
    //             return item;
    //         })
    //         this.checkNoticationView();
    //         this.addNotification();

    //         this.showNoti = [];
    //     })
    // }

    componentDidMount() {

    }

    checkNoticationView = () => {
        for (let i = 0; i < this.state.list_noti.length; i++) {
            if ('viewed' in this.state.list_noti[i]) {
                this.setState({
                    total_noti: this.state.total_noti - 1
                })
            }
        }
    }

    isView = (result) => {
        if ('viewed' in result) {
            return true;
        } return false;
    }

    addNotification = () => {
        for (let i = this.state.list_noti.length - 1; i >= 0; i--) {
            Promise.all([axios.get('/api/user/details?username=' + this.state.list_noti[i].eventData.sender)])
                .then(([data]) => {
                    this.inforNoti = this.addContent(this.state.list_noti[i].event, this.state.list_noti[i].eventData);
                    this.image = this.inforNoti.img;
                    this.message = this.inforNoti.message;
                    this.text = this.inforNoti.text;
                    this.have_img = this.inforNoti.have_img;
                    this.showNoti.push(
                        <div key={i} className={this.isView(this.state.list_noti[i]) ? 'li_noti' : 'li_noti viewed'} >
                            <img className="sender_img" src={data.data.data.avatar} alt="avatar sender" />
                            <div className="noti_content">
                                {this.state.list_noti[i].eventData.sender === this.state.list_noti[i].username ? 'Bạn' : this.state.list_noti[i].eventData.sender}
                                {' ' + this.text} {this.state.list_noti[i].eventData.sender !== this.state.list_noti[i].username ? 'bạn' : this.state.list_noti[i].eventData.receiver}
                                {':' + this.message}
                            </div>
                            <img style={{ display: this.have_img ? 'block' : 'none' }} src={this.image} className="img_receiver" alt="img" />
                        </div>
                    )
                })
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

    seeNotification = () => {
        this.setState({
            see_noti: !this.state.see_noti
        })
    }

    checkAll = () => {
        this.setState({
            total_noti: 0
        })
    }

    render() {
        return (
            <div className="notification" onClick={this.seeNotification} >
                <span className="icon_noti" onClick={this.checkAll}>
                    <MaterialIcon icon="mail" color="white" />
                    <div className="number_notification" style={{ display: this.state.total_noti === 0 ? 'none' : 'block' }}>
                        <span >
                            {this.state.total_noti}
                        </span>
                    </div>
                    <ToolTip name="thông báo" />
                </span>
                <div className="pointed" style={{ display: this.state.see_noti ? 'block' : 'none' }}></div>
                <div className="list_notification" style={{ display: this.state.see_noti ? 'block' : 'none' }}>
                    <div className="noti_header">
                        <label>Thông báo</label>
                        <span>Đánh dấu tất cả là đã đọc</span>
                    </div>
                    <div className="all__content" >
                        {this.showNoti}
                    </div>
                    <div className="noti_footer">
                        <button className="btn_settings"  >
                            <MaterialIcon icon="settings" />
                            Cài đặt
                        </button>
                        <span>
                            <a href="/notification">
                                Xem tất cả các thông báo
                            </a>
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}

export default Notification;