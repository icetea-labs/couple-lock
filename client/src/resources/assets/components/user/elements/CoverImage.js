import React, { Component } from 'react';

class CoverImage extends Component {

    constructor(props) {
        super(props)

        this.state ={
        }
    }

    render() {
        return (
            <div className= "layer_common cover_image " >
                <img src='./images/banner.jpg' />
            </div>
        )
    }
}

export default CoverImage;