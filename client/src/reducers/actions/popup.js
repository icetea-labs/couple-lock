export function openPopup (open, image, proposeId, sender, receiver){
    return {
        type: 'OPEN_POPUP',
        open,
        image,
        proposeId,
        sender,
        receiver,
    }
}

export function closePopup (open, data){
    return {
        type: 'CLOSE_POPUP',
        open,
        data
    }
}