export function addFriend(username, roomName, displayChat){
    return {
        type: 'ADD_FRIEND',
        username,
        roomName,
        displayChat
    }

}

export function deleteFriend(username){
    return {
        type: 'DELETE_FRIEND',
        username
    }
}