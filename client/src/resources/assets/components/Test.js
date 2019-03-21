import React, { Component } from 'react';
import encryptMessage from '../../../private/encrypt';
import decryptMessage from '../../../private/decrypt';

class Test extends Component {

    constructor(props) {
        super(props);


        this.state = {
            key: '',
            message: '',
            encryptMessage: '',
            decryptMessage: '',
            Error: '',
            size: 0,
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
            decryptMessage: decryptMessage(this.state.message, this.state.key).messageDecoded
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
                </div>
            </div >
        );
    }
}

export default Test;