import React, { Component } from 'react';
import Web3 from 'web3';
import bip39 from 'bip39';
import md5 from 'md5';
import aesjs from 'aes-js';
import * as firebase from 'firebase';
import MaterialIcon, { photo } from 'material-icons-react';


class FormLogin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user_name: null,
            display_name: localStorage.getItem("name"),
            img_url: localStorage.getItem("img_url"),
            email: localStorage.getItem("email"),
            file: 'null',
            account: [],
            address: [],
            privatekey: [],
            seedphase: [],
            password: [],
            show: false,
            hidden: true,
            user: null,
            brand: true,
        }

        this.handleChange = this.handleChange.bind(this);
        this.usnChange = this.usnChange.bind(this);
        this.dnChange = this.dnChange.bind(this);
        this.createAccounts = this.createAccounts.bind(this);
        this.confirmPassWord = this.confirmPassWord.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }


    /**
     * 
     * @param handle handle profile user 
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
            display_name: event.target.value
        })
    }

    imgChange() {
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

        this.setState({
            show: true
        })

        localStorage.setItem("U_N", this.state.user_name);
        localStorage.setItem("P_W", this.state.password);
        localStorage.setItem("I_U", this.state.img_url);
        localStorage.setItem("D_N", this.state.display_name);

        if( this.state.user_name !== null && this.state.display_name !== null ){
            this.setState({
                brand: false
            })
        }
        this.props.history.push('/login/seed');
    }

    handleClose = (e) => {
        this.setState({
            show: false,
        })
    }

    /**
     * @param user firebase setup
     */
    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            this.setState({ user: localStorage.getItem('user_name') });
        });
    }

    handleSignIn() {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider);
    }

    handleLogOut() {
        firebase.auth().signOut();
    }

    brandCreate = () => {
        if( this.state.user_name !== null && this.state.display_name !== null ){
            this.setState({
                brand: false
            })
        }

        return this.state.brand;
    }

    render() {
        return (
            <div className="profile_form">
                <form action="" method="" className="form_control">
                    <div className="avatar_profile">
                        <div className="avatar" id="user_avatar">
                            <img src={this.state.img_url} id="avatar_login" width="120" height="120" alt="" />
                        </div>
                        <div className="chose_file">
                            <label htmlFor="upload">
                                <span className="label__file"><span className="icon-photo" ></span>Chọn ảnh</span>
                                <input type="file" id="upload" accept="img, mp4" onChange={this.handleChange} style={{ display: "none" }} />
                            </label>
                        </div>
                    </div>
                    <div className="infor_profile">
                        <h2>Thay đổi thông tin của bạn</h2>
                        <p className="infor__label">Tên tài khoản: </p>
                        <input placeholder="User Name" value={this.state.user_name} onChange={this.usnChange} name="username" autoComplete="on" />
                        <div>
                            <p className="infor__label">Tên của bạn: </p>
                            <input placeholder=" Display Name" value={this.state.name} onChange={this.dnChange} autoComplete="on" />
                        </div>
                        <div>
                            <p className="infor__label">Email: </p>
                            <input placeholder=" Email" defaultValue={this.state.email} autoComplete="on" />
                        </div>
                        <div>
                            <p className="infor__label">Mật Khẩu :</p>
                            <input type={this.state.hidden ? "password" : "text"} placeholder="Password" value={this.state.password} onChange={this.confirmPassWord} autoComplete="on" />
                        </div>
                        <button className="btn__profile" onClick={this.createAccounts} disabled={this.brandCreate}>Đăng kí</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default FormLogin;