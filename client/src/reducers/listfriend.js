
const init = [
    { id: '1', name: 'Viet', status: 'is working' },
    { id: '2', name: 'Trang', status: 'is walking with father' }
];

export default function handleListFriend(state = init, action) {
    // eslint-disable-next-line default-case
    switch (action.type) {
        case 'ADD_FRIEND':
            return [{...state}, action.id]

        case 'DELETE_FRIEND':
            return [{...state}];

        default:
            return state;
    }
}