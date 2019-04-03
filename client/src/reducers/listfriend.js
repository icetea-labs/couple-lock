import * as _ from 'lodash';

const initListFriend = [
    { username: 'paula' , roomName: 'paulra_sotatek', displayChat : '' }
];


export default function handleListFriend(state = initListFriend, action) {
    // eslint-disable-next-line default-case
    switch (action.type) {
        case 'ADD_FRIEND':
            handleListFriend = [...state];
            let username = action.username;
            handleListFriend.forEach(( item ) => {
                if ( item.username === username) {
                    return handleListFriend;
                }
            })

            return [...state, { username: action.username , roomName : action.roomName, displayChat: action.displayChat }];


        case 'DELETE_FRIEND':
            var handleListFriend = [...state];

            return _.remove(handleListFriend, function (item) {
                return item.username === action.username;
            })


        default:
            return state;
    }
}