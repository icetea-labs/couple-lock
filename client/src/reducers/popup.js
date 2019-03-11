const initPopup = {
    open: false,
    data: null,
}

export default function handlePopup(state = initPopup, action) {
    switch (action.type) {
        case 'OPEN_POPUP':
            return {
                ...state,
                open: true,
                data: action.data,
            }
            
        case 'CLOSE_POPUP':
            return {
                ...state,
                open: false,
                data: null,
            }

        default:
            return {
                ...state
            };
    }
}