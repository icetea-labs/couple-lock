// create data on chat
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

export default createChat;