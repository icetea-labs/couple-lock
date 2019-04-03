export function addNewFeed(proposeId, sender, receiver, img_sender, img_receiver, data){
    return {
        type: 'ADD_NEWFEED',
        proposeId,
        sender,
        receiver,
        img_sender,
        img_receiver,
        data
    }
}