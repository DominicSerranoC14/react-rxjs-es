import React from 'react';

import { addTodo, updateInput } from './../store/actions.js';

const Todo = ({ todo }) => (
    <div>
        <p>{todo.text}</p>

    </div>
);

export const TodoApp = ({ handler, input, todos }) => {
    const saveTodo = () => {
        handler.next(addTodo(input));
        handler.next(updateInput(''));
    };

    return (
        <div>
            <p>
                <input type="text" value={input} 
                    onChange={e => handler.next(updateInput(e.target.value))} />
            </p>

            <p>
                <button onClick={saveTodo}>Save Todo</button>
            </p>

            <div>
                {todos.map((todo, i) => <Todo todo={todo} key={i} />)}
            </div>
        </div>
    )
};