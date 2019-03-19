import axios from 'axios';

const initBanner = {
    proposeId: 0,
    img_sender: null,
    img_receiver: null,
    sender: null,
    receiver: null,
}

export default function handleBanner(state = initBanner, action) {
    switch (action.type) {
        case 'ADD_BANNER':
            return {
                ...state,
                proposeId: action.proposeId,
                img_sender: action.img_sender,
                img_receiver: action.img_receiver,
                sender: action.sender,
                receiver: action.receiver,
            }

        default:
            return state;
    }
}