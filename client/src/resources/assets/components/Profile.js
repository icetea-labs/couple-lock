import React, { Component } from 'react';
import { Grid, Col, Row } from 'react-bootstrap';
import Web3 from 'web3';
import bip39 from 'bip39';
import md5 from 'md5';
import aesjs from 'aes-js';


class FormLogin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user_name: 'OK',
            name: localStorage.getItem("name"),
            img_url: localStorage.getItem("img_url"),
            email: localStorage.getItem("email"),
            file: 'null',
            account: [],
            address: [],
            privatekey: [],
            seedphase: [],
            password: [],
            test: 0
        }
        this.handleChange = this.handleChange.bind(this);
        this.usnChange = this.usnChange.bind(this);
        this.dnChange = this.dnChange.bind(this);
        this.createAccounts = this.createAccounts.bind(this);
        this.confirmPassWord = this.confirmPassWord.bind(this);

    }

    /**
     * 
     * @param NOEVENT change infor for the login input profile
     */

    handleChange(event) {

        this.setState({
            img_url: URL.createObjectURL(event.target.files[0])
        })
    }

    usnChange(event) {
        this.setState({
            user_name: event.target.value
        })
    }

    dnChange(event) {
        this.setState({
            name: event.target.value
        })
    }

    setData() {
        this.setState({
            img_url: localStorage.getItem("img_url")
        })
    }

    confirmPassWord(event) {
        this.setState({
            password: event.target.value
        })
    }

    /**
     *  @param createAccounts Create account and 
     */

    createAccounts() {
        var web3 = new Web3(
            new Web3.providers.WebsocketProvider("ws://127.0.0.1:7545")
        )

        var test = bip39.generateMnemonic();

        this.setState({
            seedphase: test
        })

        var passwordAes = aesjs.utils.utf8.toBytes(md5(this.state.password));
        var seedphaseAes = aesjs.utils.utf8.toBytes(md5(test));
        var aesCbs = new aesjs.ModeOfOperation.cbc(passwordAes);
        var encryptedBytes = aesCbs.encrypt(seedphaseAes);
        var encryptHex = aesjs.utils.hex.fromBytes(encryptedBytes);

        localStorage.setItem("seed", encryptHex);
        // console.log(web3.eth.accounts.create(test));
    }

    render() {
        return (
            <Grid className="profile_form">

                {/* <form action="" method=""> */}
                <Col className="avatar_profile">
                    <div className="avatar">
                        <img src={this.state.img_url} id="avatar_login" width="120" height="120" alt="" />
                    </div>
                    <label for="upload" className="chose_file">
                        <span className="label__file">Chose your image</span>
                        <input type="file" id="upload" accept="img, mp4" onChange={this.handleChange} style={{ display: "none" }} />
                    </label>
                </Col>

                <Col className="infor_profile">
                    <h2> Change your information</h2>
                    <p className="infor__label">Username: </p>
                    <input placeholder="User Name" value={this.state.user_name} onChange={this.usnChange} autoComplete="on" />
                    <Col>
                        <p className="infor__label">Yourname: </p>
                        <input placeholder=" Display Name" value={this.state.name} onChange={this.dnChange} autoComplete="on" />
                    </Col>
                    <Col>
                        <p className="infor__label">Your mail : </p>
                        <input placeholder=" Email" value={this.state.email} readOnly />
                    </Col>
                    <Col>
                        <p className="infor__label">Password :</p>
                        <input type="" placeholder="Password" value={this.state.password} onChange={this.confirmPassWord} autoComplete="on" />
                    </Col>
                    <button className="btn__profile" type="submit" onClick={this.createAccounts}>Submit</button>
                </Col>
                {/* </form> */}
                <Col className="seed_phase">
                    <p>Save your seed seed phase if your forgot your password</p>
                    <textarea value={this.state.seedphase} height="60px" readOnly></textarea>
                </Col>

            </Grid>
        )
    }
}

export default FormLogin;