export function addFriend(id){
    return {
        type: 'ADD_FRIEND',
        id
    }

}

export function deleteFriend(id){
    return {
        type: 'DELETE_FRIEND',
        id
    }
}