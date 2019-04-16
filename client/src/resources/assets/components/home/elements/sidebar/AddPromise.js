import React, { Component } from 'react';
import axios from 'axios';
import PubSub from 'pubsub-js';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import MaterialIcon from 'material-icons-react';
import LocationSearchInput from '../memory/Places';
import socketIOClient from 'socket.io-client';
// import textEncoding from 'text-encoding';
import encryptMessage from '../../../../../../private/encrypt';

class Addpromise extends Component {

    constructor(props) {
        super(props);
        this.state = {
            avatarUrl: localStorage.getItem("I_U"),
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
            tag: '',
            search_people: ''
        }

        this.choseThis = 'Public';
        this.is_typing = false
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
                    <li className="label__search" key={i} onClick={this.handleChosePerson.bind(this, this.state.list_user[i])}>
                        <img src={this.state.list_user[i].avatar} className="filter_img" alt="Friend" />
                        <div>
                            <label id="display_name">
                                {this.state.list_user[i].displayName}
                            </label>
                            <span id="user_name">
                                {'@' + this.state.list_user[i].username}
                            </span>
                        </div>
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
            search_people: '@' + result.username,
            receiver: result.username,
            r_address: result.publickey,
        })

        this.is_typing = false

        console.log(result);
    }

    handleSearch = (event) => {
        this.state.person_filter = [];
        this.setState({
            search_people: event.target.value
        })

        if (this.state.search_people === '') {
            this.setState({
                person_filter: [],
            })
        }

        if (event.target.value.length === 0) {
            this.is_typing = false
        } else {
            this.is_typing = true
        }

        for (let i = 0; i < this.state.username.length; i++) {
            if (this.state.username[i].search(event.target.value) !== -1) {
                this.state.person_filter.push(this.state.person_infor[i]);
            }
        }

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
            person_filter: [],
        })
    }

    handleMessage = (event) => {
        this.setState({
            message: event.target.value
        })
    }

    handleShowProMise = () => {
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
                <button type="button" className="btn_add_promise" onClick={this.handleShowProMise}><span className="icon-ic-add"></span>Add Promise</button>
                <Modal className="add_friend" isOpen={this.state.show_promise} toggle={this.toggle} >
                    <ModalHeader >
                        <div className="propose_header">Promise <button className="btn_close" onClick={this.handleClose}>x</button>
                        </div>
                    </ModalHeader>
                    <ModalBody>
                        <div className="search-filter">
                            <span id="tag-friend" >Tag your partner to promise</span>
                            <input placeholder="@d" value={this.state.search_people} onChange={this.handleSearch} />
                            <ul style={{ display: this.is_typing ? 'block' : 'none' }}>
                                {this.state.person_filter}
                            </ul>
                        </div>
                        <div className="content-promise">
                            <span id="your-promise">
                                Your promise
                            </span>
                            <textarea name="" id="" placeholder="your memory..." onChange={this.handleMessage} value={this.state.message}></textarea>
                        </div>
                        <div className="img-infor">
                            <div style={{ color: "red", fontSize: "12px" }} >
                                {this.state.location}
                            </div>
                            <img src={this.state.selectFile.imgPreview} alt="" width="100px" height="100px" />
                        </div>
                        <div className="tag-value">
                            <div className="content-value">
                                <span >TAGS:</span>
                                <input type="text" className="input-tag" placeholder="    #honeymoon #travel" />
                            </div>

                            {/* information */}
                            <div className="information">
                                <div className="more-infor">
                                    <label htmlFor="upload" >
                                        <span className="icon-photo"></span>
                                    </label>
                                    <input type="file" id="upload" accept="img, mp4" onChange={this.handleUploadImg} style={{ display: "none" }} />
                                </div>
                                <div className="more-infor" >
                                    <span className="icon-location" onClick={this.showInputPlaces} ></span>
                                    <div>
                                        {
                                            this.state.isPlace && <LocationSearchInput getLocation={this.getLocation} />
                                        }
                                    </div>
                                </div>
                                <div className="more-infor">
                                    <span className="icon-today"></span>
                                </div>

                                <div className="more-infor" onClick={this.handleOption}>
                                    <MaterialIcon icon="arrow_drop_down" />
                                    <span id="chose-option">
                                        {this.state.choseThis}
                                    </span>
                                    <div className="option" style={{ display: this.state.show_option ? 'block' : 'none' }} >
                                        <ul>
                                            <li id='Public' onClick={(e) => { this.choseOption(e.target.id) }}>Public</li>
                                            <li id='Private' onClick={(e) => { this.choseOption(e.target.id) }}>Private</li>
                                            <li id='Unlisted' onClick={(e) => { this.choseOption(e.target.id) }}>Unlisted</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            {/* end-infomation */}
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <button className="button-send" onClick={this.handleSendPromise}>Send</button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default Addpromise;