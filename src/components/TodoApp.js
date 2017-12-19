import React from 'react';
import './TodoApp.css';

import { addTodo, deleteTodo, toggleTodo, updateInput } from './../store/actions.js';

const Todo = ({ destroy, index, todo, toggle }) =>
    <div>
        <p>
            <span className={`push-right ${todo.completed ? 'completed': ''}`}>{todo.text}</span>
            
            <button className="push-right" onClick={() => toggle(index)}>
                {(todo.completed) ? 'Undo' : 'Completed'}
            </button>

            <button className="delete-button" onClick={() => destroy(index)}>X</button>
        </p>
    </div>

const TodoList = ({ destroy, title, todos, toggle }) => {
    if (!todos.length) return null;
    
    return (
        <div className="push-up">
            <p>{ title }</p>

            {todos.map((todo, i) =>
                <Todo todo={todo} index={i} key={i} destroy={destroy} toggle={toggle} />
            )}
        </div>
    );
};

export const TodoApp = ({ handler, input, todos }) => {
    const save = () => {
        handler.next(addTodo(input));
        handler.next(updateInput(''));
    };
    const toggle = (index) => handler.next(toggleTodo(index));
    const destroy = (index) => handler.next(deleteTodo(index));

    const completedTodos = todos.filter(({ completed }) => completed);
    const incompleteTodos = todos.filter(({ completed }) => !completed);

    return (
        <div>
            <p>
                <input type="text" value={input} className="push-right"
                    onChange={e => handler.next(updateInput(e.target.value))} />

                <button onClick={save}>Save Todo</button>
            </p>

            <TodoList destroy={destroy} toggle={toggle} todos={incompleteTodos} 
                title={'Todos'} /> 
            
            <TodoList destroy={destroy} toggle={toggle} todos={completedTodos} 
                title={'Completed Todos'} /> 
        </div>
    );
};