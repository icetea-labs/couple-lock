import React, { Component } from 'react';
import Web3 from 'web3';
import bip39 from 'bip39';
import SeedWord from './seed/SeedWord';
import { array } from 'prop-types';
import Header from './seed/Header';

class Seed extends Component {

    constructor(props) {
        super(props)
        this.state = {
            seedphase: array[12]
        }

        this.renderSeedPhase = this.renderSeedPhase.bind(this);
    }
    
    /**
     * @param renderSeedPhase create SeedPhase
     */

    renderSeedPhase() {
    }

    render() {
        return (
            <div className="seed_page">
                <Header></Header>
                <div className="backup_word">
                    <h2>Nhớ SeedPhase và bạn không bao giờ phải lo lắng vì quên mật khẩu nữa </h2>
                    <SeedWord></SeedWord>
                </div >
            </div>
        )
    }
}

export default Seed;
