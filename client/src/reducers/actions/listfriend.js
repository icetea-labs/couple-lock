export function addFriend(username){
    return {
        type: 'ADD_FRIEND',
        username
    }

}

export function deleteFriend(username){
    return {
        type: 'DELETE_FRIEND',
        username
    }
}