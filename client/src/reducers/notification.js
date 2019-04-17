import axios from 'axios';

var initNoti = [];

axios.get('/api/noti/list?username=' + localStorage.getItem('username'))
    .then(results => {
        for (let i = 0; i < results.data.data.length; i++) {
            initNoti.push(results.data.data[i]);
        }
    });

export default function handleNoti(state = initNoti, action) {
    // eslint-disable-next-line default-case
    switch (action.type) {
        case 'ADD_NOTI':
            return [{
                id: (state.length === 0) ? 0 : state[0].id + 1,
                marked: false,
                text: action.text
            }, ...state];

        default:
            return state;
    }
}