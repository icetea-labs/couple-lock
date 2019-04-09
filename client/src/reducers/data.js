var data = null;

export default function handleData (state = data, action){
    switch ((action.type) ) {
        case 'ADD_DATA':
            return{
                ...state,
                data: action.data,
            }
    
        default:
            return{
                state
            }
    } 
}