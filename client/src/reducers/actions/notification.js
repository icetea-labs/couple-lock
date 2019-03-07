export function addToDo(value) {
    return {
        type: 'ADD_NOTI',
        value
    }
}

export function deleteToDo(id){
    return {
        type: 'DELETE_TODO',
        id
    }
}

export function editToDo(id, value) {
    return {
        type: 'EDIT_TODO',
        id,
        value
    }
}

export function markToDO(id, text){
    return {
        type: 'MAP_TODO',
        id,
        text
    }
}

export function makrAll() {
    return {
        type: 'MARK_ALL'
    }
}

export function clearMark() {
    return {
        type: 'CLEAR_MARK'
    }
    
}