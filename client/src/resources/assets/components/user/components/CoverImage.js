import React, { Component } from 'react';

class CoverImage extends Component {

    constructor(props) {
        super(props)

        this.state ={
            image: localStorage.getItem('img_url')
        }
    }

    render() {
        return (
            <div className= "layer_common cover_image " >
                <img src={this.state.image} />
            </div>
        )
    }
}

export default CoverImage;