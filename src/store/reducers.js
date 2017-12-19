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
        
        case 'TOGGLE_TODO': {
            const todo = state.todos[action.index];
            const todos = state.todos.filter((todo, i) => i !== action.index);
        
            return stream.next({ ...state, 
                todos: [ ...todos, { ...todo, completed: !todo.completed }]
            });
        }
        
        case 'DELETE_TODO': {
            const todos = state.todos.filter((todo, i) => i !== action.index);
            return stream.next({ ...state, todos: [ ...todos ] });
        }
        
        default:
            break;
    }
};

// Export all reducers here, sort of like index for reducers
export default [ countReducer, todoReducer ];