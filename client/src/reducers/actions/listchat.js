export function addChat(username, roomName, displayChat){
    return {
        type: 'ADD_CHAT',
        username,
        roomName,
        displayChat
    }

}

export function deleteFriend(username){
    return {
        type: 'DELETE_CHAT',
        username
    }
}