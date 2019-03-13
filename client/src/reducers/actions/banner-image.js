export function addBanner(proposeId, sender, receiver){
    return {
        type: 'ADD_BANNER',
        proposeId,
        sender,
        receiver,
    }
}