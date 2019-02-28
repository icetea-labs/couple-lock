import * as redux from 'redux';


var defaultState = {
    todo: {
        items: []
    }
};

// TODO : cretate new state for chatbox

function createChat(data) {
    return {
        type: 'CREATE_CHAT',
        username: '',
        form: data.form,
        location: data.state,
        status: {
            see_chat: data.status.see_chat,
            is_hidden: data.status.is_hidden
        },
        receiver: data.receiver,
    }

}

// TODO : remove chat

function remove(data) {
    return {
        type: 'REMOVE',
        message: 'deleted'
    }
}

function initRedux(data){
    return {
        type: 'INIT',
        message: 'init the redux'
    }
}
  


var ReduxAction = redux.createStore(initRedux ,defaultState);

export default ReduxAction;