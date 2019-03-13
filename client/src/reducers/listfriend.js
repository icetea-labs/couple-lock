
const initListFriend = [
    { username: 'paulra', name: 'Viet', status: true },
    { username: 'sotatek', name: 'Trang', status: false },
];


export default function handleListFriend(state = initListFriend, action) {
    // eslint-disable-next-line default-case
    switch (action.type) {
        case 'ADD_FRIEND':
            return {
                friends: [...state, { id: 2, name: action.username, status: true }]
            }

        case 'DELETE_FRIEND':
            return {
                friends: [...state]
            };

        default:
            return state;
    }
}