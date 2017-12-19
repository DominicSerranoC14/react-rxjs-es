import React from 'react';

// State handler (reducer stream)
import { handler } from './store';

// Components
import { Counter } from './components/Counter.js';
import { TodoApp } from './components/TodoApp.js';

// Styles
import './App.css';

const App = ({ count, input, todos }) => (
    <div className="App">
        <TodoApp input={input} handler={handler} todos={todos} />
        
        <Counter count={count} handler={handler} />
    </div>
);

export default App;
