// Redux calls these action creators
export const updateInput = value => ({ type: 'UPDATE_INPUT', value });

export const addTodo = input => ({ type: 'ADD_TODO', value: { text: input, completed: false }});
