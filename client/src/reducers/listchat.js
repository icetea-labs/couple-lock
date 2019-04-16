import * as _ from 'lodash';
// import axios from 'axios';

const initListChat = [{username: '', avatar: '', roomName :'' }];

export default function handleListChat(state = initListChat, action) {
    var handleListChat = [...state];
    // eslint-disable-next-line default-case
    switch (action.type) {
        case 'ADD_CHAT':
            let username = action.username;
            handleListChat.forEach((item) => {
                if (item.username === username) {
                    return handleListChat;
                }
            })

            return [...state, { username: action.username, roomName: action.roomName, avatar: action.displayChat }];


        case 'DELETE_CHAT':

            return _.remove(handleListChat, function (item) {
                return item.username === action.username;
            })

        default:
            return state;
    }
}