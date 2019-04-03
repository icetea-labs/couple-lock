export function addMessage(roomName, message ) {
    return {
        type: 'ADD_MESSAGE',
        roomName,
        message
    }
}