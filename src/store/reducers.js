const countReducer = (stream, state, action) => {
    switch (action.type) {
        case 'COUNTER':
            return stream.next({ ...state, count: state.count + action.value });
        default:
            break;
    };
};

const todoReducer = (stream, state, action) => {
    switch (action.type) {
        case 'UPDATE_INPUT':
            return stream.next({ ...state, input: action.value });
        case 'ADD_TODO':
            return stream.next({ ...state, todos: [ ...state.todos, action.value ]});
        default:
            break;
    }
};

// Export all reducers here, sort of like index for reducers
export default [ countReducer, todoReducer ];