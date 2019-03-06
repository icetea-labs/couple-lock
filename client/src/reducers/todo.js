const inititalState = [{
    text: 'Use Redux',
    mark: false,
    id: 0
}]

/**
 * 
 * action creator
 */
export default function todos(state = inititalState, action) {
    // eslint-disable-next-line default-case
    switch (action.type) {
        case 'ADD_TODO':
            return [{
                id: (state.length === 0) ? 0 : state[0].id + 1,
                marked: false,
                text: action.text
            }, ...state];
            
        case 'DELETE_TODO':
            return state.filter((todo) => {
                todo.id = action.id;
            })

        case 'EDIT_TODO':
            return state.map((todo) => {
                // eslint-disable-next-line no-unused-expressions
                todo.id === action.id ? { ...todo, text: action.text } : todo
            })

        case 'MARK_TODO':
            return state.map((todo) => {
                // eslint-disable-next-line no-unused-expressions
                todo.id === action.id ? { ...todo, marked: !todo.marked } : todo
            })

        case 'MARK_ALL':
            return {
                type: 'MARK_ALL'
            }
    }

    return state
}