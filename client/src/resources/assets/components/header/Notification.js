import React, { Component } from 'react';
import MaterialIcon, { mail } from 'material-icons-react';
import axios from 'axios';
import { number } from 'prop-types';

class Notification extends Component {

    constructor(props) {
        super(props)

        this.state = {
            see_noti: false,
            total_noti: 0,
            list_noti: [],
            name_noti: [
                'đã tạo một hẹn ước mới vói bạn',
                'đã chấp nhận hẹn ước từ bạn',
                'đã thêm một kỉ niệm mới',
            ],
            text: '',
        }

        this.showNoti = [];
    }

    componentWillMount() {
        Promise.all(
            [axios.get('/api/noti/list?username=' + localStorage.getItem('sender'))]
        ).then(([data]) => {
            console.log(data);
            this.setState({
                total_noti: data.data.data.length,
            })

            let all_noti = data.data.data.map((item) => {
                return item;
            })

            all_noti.forEach(element => {
                this.state.list_noti.push(element);
            });
            this.addNotification();
        })

        console.log('noti is', this.state.list_noti)

    }

    addNotification = () => {
        for (let i = 0; i < this.state.total_noti; i++) {
            Promise.all([axios.get('/api/user/details?username=' + this.state.list_noti[i].eventData.sender)])
                .then(([data]) => {
                    this.text = this.choseName(this.state.list_noti[i].event);
                    console.log(data.data.data.avatar)
                    let have_img = false;
                    this.showNoti.push(
                        <div key={i} className="li_noti">
                            <img className="sender_img" src={data.data.data.avatar} alt="avatar sender" />
                            <div className="noti_content">
                                {this.state.list_noti[i].eventData.sender === this.state.list_noti[i].username ? 'Bạn' : this.state.list_noti[i].eventData.sender}
                                {' ' + this.text}
                            </div>
                            <img style={{display: true ? 'block' : 'none' }} src = "" className="img_receiver" alt="img" />
                        </div>
                    )
                })
        }
    }

    choseName = (event) => {
        // eslint-disable-next-line default-case
        switch (event) {
            case "propose.request":
                return this.state.name_noti[0];
                break;

            case "propose.reply":
                return this.state.name_noti[1];
                break;

            case "memory.new":
                return this.state.name_noti[2];
        }
    }

    seeNotification = () => {
        this.setState({
            see_noti: !this.state.see_noti
        })
    }

    render() {
        return (
            <div className="notification" onClick={this.seeNotification} >
                <MaterialIcon icon="mail" color="white" />
                <div className="number_notification">
                    <span style={{}}>
                        {this.state.total_noti}
                    </span>
                </div>
                <div className="pointed" style={{ display: this.state.see_noti ? 'block' : 'none' }}></div>
                <div className="list_notification" style={{ display: this.state.see_noti ? 'block' : 'none' }}>
                    <div className="all__content">
                        {this.showNoti}
                    </div>
                </div>
            </div>
        );
    }
}

export default Notification;