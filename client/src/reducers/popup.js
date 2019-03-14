const initPopup = {
    open: false,
    image: null,
    proposeId: null,
    sender: null,
    receiver: null,
}

export default function handlePopup(state = initPopup, action) {
    switch (action.type) {
        case 'OPEN_POPUP':
            return {
                ...state,
                open: true,
                image: action.image,
                proposeId: action.proposeId,
                sender: action.sender,
                receiver: action.receiver,
            }
            
        case 'CLOSE_POPUP':
            return {
                ...state,
                open: false,
                data: null,
                sender: null,
                receiver: null,
            }

        default:
            return {
                ...state
            };
    }
}