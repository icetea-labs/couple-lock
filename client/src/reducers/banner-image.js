import axios from 'axios';
import { resolve } from 'url';

const initBanner = {
    proposeId: null,
    img_sender: null,
    img_receiver: null,
    sender: null,
    receiver: null,
}

axios.get('/api/propose/list?username=' + localStorage.getItem('username'))
    .then((instance) => {
        if (instance.data.data.length > 0) {
            initBanner.proposeId = instance.data.data[0].id;
            if (instance.data.data[0].r_attachments.length !== 0) {
                initBanner.img_sender = instance.data.data[0].s_attachments[0].url;
            }

            if (instance.data.data[0].s_attachments.length !== 0) {
                initBanner.img_receiver = instance.data.data[0].r_attachments[0].url;
            }
            initBanner.sender = instance.data.data[0].sender;
            initBanner.receiver = instance.data.data[0].receiver;
        }

        // console.log(instance);
    }).catch((err) => {
        throw err;
        // console.log(err);
    })

console.log('test is', initBanner);



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