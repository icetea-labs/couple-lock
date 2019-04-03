import React, { Component } from 'react';
import AllNewFeed from './elements/AllNewFeed';
import { connect } from 'react-redux';
import Header from '../home/elements/header/Header';

const mapStateToProps = (state) => ({
    ...state.handleData
})

const mapDispatchToProps = (dispatch) => ({
    test: () => dispatch({
        type: '',
    })
})

class NewFeed extends Component {
    render() {
        return (
            <div>
                <Header />
                <div className="newfeed">
                    <div className="left-navigator demo"></div>
                    <div className="post-memory ">
                        <div className="new-post demo"></div>
                        <div className="friend-propose demo">
                            <AllNewFeed />
                        </div>
                    </div>
                    <div className="right-navigator"></div>
                </div>
            </div>

        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewFeed);