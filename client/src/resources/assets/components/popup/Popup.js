import React, { component } from 'react';
import { Grid, Row, Modal } from 'react-bootstrap';

class Popup extends component {

    constructor(props) {
        super(props);

        this.state = {
            show: false,
        }
    }
    render() {
        return (
            <Modal show={this.state.show} >
                <Modal.Header> Modal healing</Modal.Header>
                <Modal.Body>OK</Modal.Body>
                <Modal.Footer>
                    <button onClick={this.handleClose}></button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default Popup;