const initBanner = {
    proposeId: 0,
    sender: localStorage.getItem('sender'),
    receiver: null,
}

export default function handleBanner (state = initBanner, action){
    switch (action.type) {
        case 'ADD_BANNER':
            return{
                ...state, proposeId:action.proposeId, sender: action.sender, receiver: action.receiver
            }
    
        default:
            return state;
    }
}