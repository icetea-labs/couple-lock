const initMessage = {
    roomName: ['paulra_sotatek'],
    messages: []
}

export default function handleMesssage(state = initMessage, action) {
    switch (action.type) {
        case 'ADD_MESSAGE':
            var handleMessage = {...state};

            // check chatroom is exist 
            var is_exist = false;
            
            for (let i = 0 ; i < handleMessage.roomName.length; i ++){
                if (action.roomName === handleMessage.roomName[i]){
                    is_exist = true;
                    break;
                }
            }

            if( is_exist ===  true){
                handleMessage.roomName.push(action.roomName);
                handleMessage.messages.push(action.message);
            }

            return {...handleMessage} ;

        default:
            return state;
    }
}