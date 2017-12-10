import React, { Component } from 'react';
import { counter, currentInput, createTodo, deleteTodo, updateTodo } from './observable.js';
import './App.css';

const state = {
    count: 0,
    input: '',
    todos: [],
};

const Counter = ({ count, increment, counter }) => (
    <div>
        <p>{count}</p>
        {/* <button onClick={increment}>Increment</button> */}
        <button onClick={() => counter.next(-1)}>Decrement</button>
        <button onClick={() => counter.next(1)}>Increment</button>
    </div>
);

const TodoApp = ({ input, todos }) => (
    <div>
        <input value={input} className="push-right"
            onChange={e => currentInput.next(e.target.value)} />

        <button onClick={() => createTodo.next()}>Add Todo</button>

        <br />

        {todos.map(({ text, completed }, index) => (
            <div className="Todo" key={index}>
                <input type="checkbox" checked={completed}
                    onChange={() => updateTodo.next({ index, completed })} />
                <label>{text}</label>

                <button onClick={() => deleteTodo.next(index)}>X</button>
            </div>
        ))}
    </div>
);

class App extends Component {
    constructor(props) {
        super(props);
        this.state = state;
    }

    componentDidMount() {
        counter.subscribe(val => this.setState({ count: this.state.count + val }));
        createTodo.subscribe(this.addTodo);
        currentInput.subscribe(val => this.setState({ input: val }));
        deleteTodo.subscribe(this.deleteTodo);
        updateTodo.subscribe(this.updateTodo);
    }

    componentWillUnmount() {
        counter.unsubscribe();
        createTodo.unsubscribe();
        currentInput.unsubscribe();
        deleteTodo.unsubscribe();
        updateTodo.unsubscribe();
    }

    // Public class syntax to avoid binding this
    increment = () => {
        this.setState({ count: this.state.count + 1 });
    };

    addTodo = () => {
        this.setState(({ input, todos }) => ({
            todos: [ ...todos, { text: input, completed: false }],
            input: '',
        }));
    }

    deleteTodo = (index) => {
        this.setState(({ todos }) => ({
            todos: todos.filter((todo, i) => i !== index),
        }));
    }

    updateTodo = ({ index, completed }) => {
        const todo = this.state.todos[index];
        const todos = this.state.todos.filter((todo, i) => i !== index);
        this.setState({
            todos: [...todos, { ...todo, completed: !completed }],
        });
    }

    render() {
        return (
            <div className="App">
                {/* increment with React handler binding */}
                {/* <Counter count={this.state.count} increment={this.increment}/> */}

                {/* Increment with observable */}
                <Counter count={this.state.count} counter={counter}/>

                <TodoApp input={this.state.input} todos={this.state.todos} updateTodo={this.updateTodo} />
            </div>
        );
    }
};

export default App;
