export function addBanner(proposeId, img_sender, img_receiver, sender, receiver){
    return {
        type: 'ADD_BANNER',
        proposeId,
        img_sender,
        img_receiver,
        sender,
        receiver,
    }
}