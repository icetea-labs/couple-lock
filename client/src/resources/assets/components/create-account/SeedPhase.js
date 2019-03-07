import React, { Component } from 'react';
import Web3 from 'web3';
import bip39 from 'bip39';
import { array } from 'prop-types';

// import element
import SeedWord from './elements/seed/SeedWord';
import Header from './elements/seed/Header';

class Seed extends Component {

    constructor(props) {
        super(props)
        this.state = {
            seedphase: array[12],
        }
    }

    render() {
        return (
            <div className="seed_page">
                <Header></Header>
                <div className="backup_word">
                    <h2>Nhớ SeedPhase và bạn không bao giờ phải lo lắng vì quên mật khẩu nữa </h2>
                    <p>couple-lock cam kết không sử dụng thông tin cá nhân của bạn cho các mục đích xấu và không có bất cứ ai có thể xâm nhập dữ liệu của bạn</p>
                    <SeedWord test={this.state.test}></SeedWord>
                </div >
            </div>
        )
    }
}

export default Seed;
