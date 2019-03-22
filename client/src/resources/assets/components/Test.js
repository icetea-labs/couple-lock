import React, { Component } from 'react';
import encryptMessage from '../../../private/encrypt';
import decryptMessage from '../../../private/decrypt';
import axios from 'axios';
import { connect } from 'react-redux';


const mapStateToProps = (state) =>({...state.handleData});

const mapDispatchToProps = (dispatch) => ({
    changeData: (data) => {
        dispatch({
            type: 'ADD_DATA',
            data,
        });
    }
});

class Test extends Component {

    constructor() {
        super();


        this.state = {
            key: '',
            message: '',
            encryptMessage: '',
            decryptMessage: '',
            Error: '',
            size: 0,
            show_option: false,
            choseThis: 'GET',
            data: '',
            // host: 'http://localhost:5000',
            api: '',
        }
    }

    handleChangeKey = (e) => {
        this.setState({
            key: e.target.value,
            size: this.state.key.length + 1
        })
    }

    handleChangeMessage = (e) => {
        this.setState({
            message: e.target.value
        })
    }

    handleChangeEncrypt = (e) => {
        this.setState({
            encryptMessage: e.target.value
        })
    }

    encrypt = () => {
        this.setState({
            encryptMessage: encryptMessage(this.state.message, this.state.key).messageHex
        })
    }

    decrypt = () => {
        this.setState({
            decryptMessage: decryptMessage(this.state.message, this.state.key).messageEncrypt
        })
    }

    choseOption = (value) => {
        this.setState({
            choseThis: value,
            show_option: false
        })
    }

    handleOption = () => {
        this.setState({
            show_option: !this.state.show_option
        })
    }

    handleRequest = (event) => {
        if (event.key === 'Enter') {
            this.requestData();
        }
    }

    requestData = () => {
        try {
            switch (this.state.choseThis) {
                case 'GET':
                    axios.get(this.state.api)
                        .then((res) => {
                            this.props.changeData(res.data);
                        });
                    break;
                case 'POST':
                    axios.post(this.state.api)
                        .then((res) => {  
                            this.props.changeData(res.data);

                        });

                    break;
                case 'PUT':
                    axios.put(this.state.api)
                        .then((res) => {
                            this.props.changeData(res.data);
                        });

                    break;

                default:
                    break;
            }
        } catch (err) {
            console.log(err);
        }
    }

    changeData (data) {
        this.props.changeData(data);
    }

    changeAPI = (event) => {
        this.setState({
            api: event.target.value
        })
    }

    render() {
        return (
            <div>
                <div className='encode'>
                    <ul>
                        <li  >key</li>
                        <input value={this.state.key} placeholder="key" onChange={this.handleChangeKey} />
                        <li>Size is: {this.state.size}</li>
                        <li >message</li>
                        <input value={this.state.message} placeholder="message" onChange={this.handleChangeMessage} />
                        <li>
                            <button onClick={this.encrypt} className='btn_common' >Encrypt</button>
                            <button onClick={this.decrypt} className='btn_common'>Decrypt</button>
                        </li>
                        <li>
                            <input value={this.state.encryptMessage} placeholder="encrypt message" readOnly />
                        </li>
                        <li>
                            <input value={this.state.decryptMessage} placeholder="decrypt message" readOnly ></input>
                        </li>
                    </ul>

                    <div className="test">
                        <label className="demo" onClick={this.handleOption}>
                            {this.state.choseThis}
                        </label>
                        <input placeholder="API" value={this.state.api} onChange={this.changeAPI} onKeyPress={this.handleRequest} />
                        <button className="btn_common" onClick={this.requestData}>Implement</button>
                        <div className="demo" style={{ display: this.state.show_option ? 'block' : 'none' }} >
                            <ul>
                                <li id='GET' onClick={(e) => { this.choseOption(e.target.id) }}>GET</li>
                                <li id='POST' onClick={(e) => { this.choseOption(e.target.id) }}>POST</li>
                                <li id='PUT' onClick={(e) => { this.choseOption(e.target.id) }}>PUtT</li>
                            </ul>
                        </div>
                    </div>

                    <div className="data">
                    </div>

                </div>
            </div >
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Test);