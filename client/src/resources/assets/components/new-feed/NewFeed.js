import React, { Component } from 'react';

class NewFeed extends Component {
    render() {
        return (
            <div className="newfeed">
                <div className="left-navigator demo"></div>
                <div className="post-memory ">
                    <div className="new-post demo"></div>
                    <div className="friend-propose demo"></div>
                </div>
                <div className="right-navigator"></div>
            </div>
        );
    }
}

export default NewFeed;