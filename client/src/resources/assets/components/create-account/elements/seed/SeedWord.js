import React, { Component } from 'react';
import bip39 from 'bip39';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import array from 'prop-types';
import md5 from 'md5';
import aesjs from 'aes-js';
import Web3 from 'web3';

class SeedWord extends Component {

    constructor(props) {
        super(props);
        this.state = {
            seedphase: [],
            seed_phase: array[12],
            copied: false,
            linkto: "/",
            mnemonic: ''
        }
        this.createAccount = this.createAccount.bind(this);
    }

    componentWillMount() {

        var mnemonic = bip39.generateMnemonic();
        var seedword = mnemonic.split(" ");
        this.setState({
            seedphase: seedword,
            seed_phase: mnemonic
        })
    }

    test = () => {
        var web3 = new Web3(
            new Web3.providers.WebsocketProvider("ws://127.0.0.1:7545")
        )
        console.log(web3.eth.accounts.create(this.state.seed_phase));
    }

    createAccount = () => {

        var web3 = new Web3(
            new Web3.providers.WebsocketProvider("ws://127.0.0.1:7545")
        )
        
        // get password and tran to bytes
        var passwordAes = aesjs.utils.utf8.toBytes(md5(localStorage.getItem("P_W")));

        // get seed and tran to bytes
        var seedphaseAes = aesjs.utils.utf8.toBytes(md5(this.state.seed_phase));

        // create new key  from pw bytes
        var aesCbs = new aesjs.ModeOfOperation.cbc(passwordAes);

        // encryte seed  to Bytes.
        var encryptedBytes = aesCbs.encrypt(seedphaseAes);

        // encryte seed byte to  hexstring and save in localstorage
        var encryptHex = aesjs.utils.hex.fromBytes(encryptedBytes);
        localStorage.setItem("S_H", encryptHex);

        console.log(web3.eth.accounts.create(this.state.seed_phase));
        console.log(this.state.seed_phase);
    }

    render() {

        return (
            <div className="create_seed">
                <div className="seed_word">
                    <div className="word"><span className="">1:</span>{this.state.seedphase[0]}</div>
                    <div className="word"><span>2:</span>{this.state.seedphase[1]}</div>
                    <div className="word"><span>3:</span>{this.state.seedphase[2]}</div>
                    <div className="word"><span>4:</span>{this.state.seedphase[3]}</div>
                </div>
                <div className="seed_word">
                    <div className="word"><span>5:</span>{this.state.seedphase[4]}</div>
                    <div className="word"><span>6:</span>{this.state.seedphase[5]}</div>
                    <div className="word"><span>7:</span>{this.state.seedphase[6]}</div>
                    <div className="word"><span>8:</span>{this.state.seedphase[7]}</div>
                </div>
                <div className="seed_word">
                    <div className="word"><span>9:</span>{this.state.seedphase[8]}</div>
                    <div className="word"><span>10:</span>{this.state.seedphase[9]}</div>
                    <div className="word"><span>11:</span>{this.state.seedphase[10]}</div>
                    <div className="word"><span>12:</span>{this.state.seedphase[11]}</div>
                </div>
                <p> Seed là phương pháp duy nhất để lấy lại mật khẩu. Hãy ghi lại ở đâu đó nhé!</p>
                <div className="seed_phase">
                    <textarea defaultValue={this.state.seed_phase} texttest='1' readOnly></textarea>
                    <CopyToClipboard text={this.state.seed_phase}
                        onCopy={() => this.setState({ copied: true })}>
                        <button className="btn_seed">Copy seed</button>
                    </CopyToClipboard>
                </div>
                {this.state.copied ? <span style={{ background: 'black', color: 'white' }}>Copied!</span> : null}
                <button className="btn_next" onClick={this.createAccount}><a href='/'>next</a></button>
                <button onClick={this.test}>test</button>
            </div>
        )
    }
}

export default SeedWord;
