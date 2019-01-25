import React, { Component } from 'react';
import { Grid, Col } from 'react-bootstrap';
import Web3 from 'web3';
import bip39 from 'bip39';
import { string } from 'prop-types';

class Seed extends Component {

    constructor(props) {
        super(props)

        this.state = {
            seed1: '',
            seed2: '',
            seed3: '',
            seed4: '',
            seed5: '',
            seed6: '',
            seed7: '',
            seed8: '',
            seed9: '',
            seed10: '',
            seed11: '',
            seed12: '',
            seedphase: '',
        }
        this.renderSeedPhase = this.renderSeedPhase.bind(this);
    }

    /**
     * @param createSeed get value of seed to create seedphase
     */

    createSeed1 = (event) => {
        this.setState({
            seed1: event.target.value
        })
    }

    createSeed2 = (event) => {
        this.setState({
            seed2: event.target.value
        })
    }

    createSeed3 = (event) => {
        this.setState({
            seed3: event.target.value
        })
    }

    createSeed4 = (event) => {
        this.setState({
            seed4: event.target.value
        })
    }
    createSeed5 = (event) => {
        this.setState({
            seed5: event.target.value
        })
    }
    createSeed6 = (event) => {
        this.setState({
            seed6: event.target.value
        })
    }
    createSeed7 = (event) => {
        this.setState({
            seed7: event.target.value
        })
    }
    createSeed8 = (event) => {
        this.setState({
            seed8: event.target.value
        })
    }
    createSeed9 = (event) => {
        this.setState({
            seed9: event.target.value
        })
    }

    createSeed10 = (event) => {
        this.setState({
            seed10: event.target.value
        })
    }

    createSeed11 = (event) => {
        this.setState({
            seed11: event.target.value
        })
    }

    createSeed12 = (event) => {
        this.setState({
            seed12: event.target.value
        })
    }

    /**
     * @param renderSeedPhase create SeedPhase
     */

    renderSeedPhase() {
        this.setState({
            seedphase: this.state.seed1 + ' '
                + this.state.seed2 + ' '
                + this.state.seed3 + ' '
                + this.state.seed4 + ' '
                + this.state.seed5 + ' '
                + this.state.seed6 + ' '
                + this.state.seed7 + ' '
                + this.state.seed8 + ' '
                + this.state.seed9 + ' '
                + this.state.seed10 + ' '
                + this.state.seed11 + ' '
                + this.state.seed12
        })
    }

    render() {
        return (
            <Grid>
                <h1>
                    Fill your Seed
                </h1>
                <Col>
                    <input placeholder="1" onChange={this.createSeed1} />
                    <input placeholder="2" onChange={this.createSeed2} />
                    <input placeholder="3" onChange={this.createSeed3} />
                </Col>
                <Col>
                    <input placeholder="4" onChange={this.createSeed4} />
                    <input placeholder="5" onChange={this.createSeed5} />
                    <input placeholder="6" onChange={this.createSeed6} />
                </Col>
                <Col>
                    <input placeholder="7" onChange={this.createSeed7} />
                    <input placeholder="8" onChange={this.createSeed8} />
                    <input placeholder="9" onChange={this.createSeed9} />
                </Col>
                <Col>
                    <input placeholder="10" onChange={this.createSeed10} />
                    <input placeholder="11" onChange={this.createSeed11} />
                    <input placeholder="12" onChange={this.createSeed12} />
                </Col>
                <Col>
                    <button onClick={this.renderSeedPhase}>Submit</button>

                </Col>
                <input placeholder="SeedPhase" value={this.state.seedphase} style={{width: 500}} />
            </Grid>
        )
    }
}

export default Seed;
