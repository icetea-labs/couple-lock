export function openPopup (open, data){
    return {
        type: 'OPEN_POPUP',
        open,
        data
    }
}

export function closePopup (open, data){
    return {
        type: 'CLOSE_POPUP',
        open,
        data
    }
}