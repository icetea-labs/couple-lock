import React, { Component } from 'react';
import axios from 'axios';
import PubSub from 'pubsub-js';
import md5 from 'md5';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import MaterialIcon from 'material-icons-react';
import LocationSearchInput from '../memory/Places';
import socketIOClient from 'socket.io-client';
import * as aesjs from 'aes-js';
// import textEncoding from 'text-encoding';
import encryptMessage from '../../../../../../private/encrypt';

class AddPropose extends Component {

    constructor(props) {
        super(props);
        this.state = {
            avatarUrl: localStorage.getItem("I_U"),
            show_friend: false,
            show_promise: false,
            show_option: false,
            list_user: [],
            receiver: "",
            items: {},
            person_infor: [],
            person_filter: [],
            username: [],
            avatar_target: [],
            isPlace: false,
            location: '',
            url: '',
            sender: window.getLoginUser(),
            message: '',
            s_attachments: [],
            selectFile: {
                imgPreview: '',
                imgUpload: ''
            },
            host: 'localhost:5000',
            choseThis: 'Public',
            possible: "abcdefghijklmnopqrstuvwxyz0123456789",
            visibility: 0,
            messageHex: '',
            isTyping: false,
        }

        this.choseThis = 'Public'
    }
    componentWillMount() {
        this.filterData();
        this.fetchDataSender();
    }

    choseOption = (id) => {

        this.setState({
            choseThis: id
        })

        // eslint-disable-next-line default-case
        switch (id) {
            case 'Public':
                this.setState({
                    visibility: 0
                });
                break;

            case 'Unlisted':
                this.setState({
                    visibility: 1
                })

                break;

            case 'Private':
                this.setState({
                    visibility: 2
                })

                break
        }

        this.handleOption();
    }

    handleOption = () => {
        this.setState({
            show_option: !this.state.show_option
        })
    }

    showInputPlaces = () => {
        this.setState(prevState => ({
            isPlace: !prevState.isPlace
        }));
    }

    getLocation = add => {
        this.setState({ location: add });
    }

    filterData = () => {
        Promise.all([
            axios.get("/api/user/all")
        ]).then(([user]) => {

            var data_size = user.data.data.length
            for (let i = 0; i < data_size; i++) {
                this.state.list_user.push(user.data.data[i]);
                this.state.person_infor.push(
                    <li className="label__search" key={i} onClick={this.handleChosePerson.bind(this, this.state.list_user[i])}>{this.state.list_user[i].username}
                        <img src={this.state.list_user[i].avatar} className="filter_img" alt="Friend" />
                    </li>)
                this.state.username[i] = this.state.list_user[i].username;
                // console.log(this.state.list_user[i]);
            }
        })
    }

    fetchDataSender = () => {
        Promise.all([axios.get(`/api/user/details?username=${this.props.sender}`)])
            .then(([dataSender]) => {
                this.setState({
                    sender: dataSender.data.data.username,
                    s_address: dataSender.data.data.publickey,
                    s_timestamp: Date.now(),
                    s_receiverCanChangeVisibility: 1,
                })
            })
    }

    handleChosePerson = (result) => {
        this.setState({
            avatar_target: result.avatar,
            receiver: result.username,
            r_address: result.publickey,
        })
    }

    handleSearch = (e) => {
        this.state.person_filter = [];
        if (e.target.value === '') {
            this.setState({
                person_filter: []
            })
        }

        this.setState({
            receiver: e.target.value
        })

        for (let i = 0; i < this.state.username.length; i++) {
            if (this.state.username[i].search(e.target.value) !== -1) {
                this.state.person_filter.push(this.state.person_infor[i]);
            }
        }

        this.setState({
            isTyping: true
        })
    }

    handleShowListFriend = () => {
        this.setState({
            show_friend: true
        })
    }

    handleComeback = () => {
        this.setState({
            show_promise: false
        })
    }

    handleUploadImg = (event) => {
        let selectFile = Object.assign({}, this.state.selectFile);
        selectFile.imgUpload = event.target.files[0];
        selectFile.imgPreview = URL.createObjectURL(event.target.files[0]);

        this.setState({
            selectFile
        })
    }

    handleClose = () => {
        this.setState({
            show_promise: false,
            show_friend: false,
            person_filter: [],
        })
    }

    handleMessage = (event) => {
        this.setState({
            message: event.target.value
        })
    }

    handleShowToProMise = () => {
        this.setState({
            show_promise: true
        })
    }

    handleSendPromise = (e) => {
        e.preventDefault();
        var formData = new FormData();
        var s_key = '';
        var message = this.state.message

        if (this.state.visibility === 2) {


            for (let i = 0; i < 16; i++) {
                s_key += this.state.possible.charAt(Math.floor(Math.random() * this.state.possible.length));
            }

            message = encryptMessage(this.state.message, s_key).messageHex;
        }

        this.state.s_attachments.push(this.state.url, this.state.location);
        formData.append('sender', this.state.sender);
        formData.append('s_attachments', this.state.s_attachments);
        formData.append('receiver', this.state.receiver);
        formData.append('r_address', this.state.publickey);
        formData.append('message', message);
        formData.append('attachment', this.state.selectFile.imgUpload);
        formData.append('visibility', this.state.visibility);
        formData.append('s_key', s_key);


        axios.post('/api/propose/request', formData)
            .then(res => {
                // console.log(res);
                // console.log(res.data);
                PubSub.publish('sendPromise');
            })

        axios.post('api/noti/create', formData);
        console.log(formData);

        const socket = socketIOClient(this.state.host);
        socket.emit('createNoti', this.state.receiver);

        this.setState({
            show_promise: !this.state.show_promise
        })
    }

    render() {
        return (
            <div>
                <button type="button" className="btn_add_promise" onClick={this.handleShowListFriend}><span className="icon-ic-add"></span>Add Promise</button>
                <Modal className="add_friend" isOpen={this.state.show_friend} toggle={this.toggle} >
                    <ModalHeader >
                        <div className="propose_header">Promise <button className="btn_close" onClick={this.handleClose}>x</button>
                        </div>
                    </ModalHeader>
                    <ModalBody>
                        <span>
                            Tag your partner to promise
                        </span>
                        <input placeholder="Search..." value={this.state.receiver} onChange={this.handleSearch} />
                        <ul style={{ display: this.state.isTyping ? 'block' : 'none' }}>
                            {this.state.person_filter}
                        </ul>
                        <div>
                            <span>
                                Your promise
                            </span>
                            <div>
                                <textarea name="" id="" rows="3" placeholder="Describe your Memory..." onChange={this.handleMessage} value={this.state.message}></textarea>
                            </div>
                            <div>
                                <div className="tag_friend">
                                    <div className="tag">
                                        <input type="text" className="input-tag" placeholder="TAGS:    #honeymoon #travel" />
                                    </div>
                                    <div className="to-avatar">
                                        <div className="friend-avatar">
                                            <img className="image_friend" src={this.state.avatar_target} alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </ModalBody>
                    <ModalFooter>
                        <Button className="button-send" onClick={this.handleSendPromise}>Send</Button>
                    </ModalFooter>
                </Modal>

                {/* Add propose */}
                <Modal className="add_promise" isOpen={this.state.show_promise} >
                    <ModalHeader >
                        <div className="header_add"><MaterialIcon icon="arrow_back" width="20px" height="20px" color="white" onClick={this.handleComeback} /><p>Add Memory</p>
                            <button className="btn_close" onClick={this.handleClose}>x</button>
                        </div>
                    </ModalHeader>
                    <ModalBody>
                        <div >
                            <div className="describe">
                                <div className="avatar">
                                    <div className="my-avatar">
                                        <img id="my_avatar" src={this.state.avatarUrl} />
                                    </div>
                                </div>
                                <div className="text_memory">
                                    <textarea name="" id="" rows="3" placeholder="Describe your Memory..." onChange={this.handleMessage} value={this.state.message}></textarea>
                                </div>
                            </div>
                        </div>
                        <div className="add_more">
                            <div className="more-infor" htmlFor="upload">
                                <span className="icon-photo"></span>
                                <label htmlFor="upload" >Photo</label>
                                <input type="file" id="upload" accept="img, mp4" onChange={this.handleUploadImg} style={{ display: "none" }} />
                            </div>

                            <div className="more-infor" onClick={this.showInputPlaces} >
                                <span className="icon-location" ></span>
                                <label>Check-in</label>
                            </div>

                            <div className="more-infor" onClick={this.handleOption}>
                                <MaterialIcon icon="arrow_drop_down" />
                                <label>
                                    {this.state.choseThis}
                                </label>

                                <div className="option" style={{ display: this.state.show_option ? 'block' : 'none' }} >
                                    <ul>
                                        <li id='Public' onClick={(e) => { this.choseOption(e.target.id) }}>Public</li>
                                        <li id='Private' onClick={(e) => { this.choseOption(e.target.id) }}>Private</li>
                                        <li id='Unlisted' onClick={(e) => { this.choseOption(e.target.id) }}>Unlisted</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        {
                            this.state.isPlace && <LocationSearchInput getLocation={this.getLocation} />
                        }
                        <div style={{ color: "red", fontSize: "12px" }} >
                            {this.state.location}
                        </div>
                        <div>
                            <img src={this.state.selectFile.imgPreview} alt="" width="100px" height="100px" />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                    </ModalFooter>
                </Modal >

                {/* End-add propose */}
            </div>
        )
    }
}

export default AddPropose;