import React, { Component } from 'react';
import { currentInput, counter } from './observable.js';
import './App.css';

const state = {
    count: 0,
    input: '',
};

const Counter = ({ count, increment, counter }) => (
    <div>
        <p>{count}</p>
        {/* <button onClick={increment}>Increment</button> */}
        <button onClick={() => counter.next(1)}>Increment</button>
        <button onClick={() => counter.next(-1)}>Decrement</button>
    </div>
);

const TodoApp = ({ input, currentInput }) => (
    <div>
        <p><input value={input} onChange={e => currentInput.next(e.target.value)} /></p>
    </div>
);

class App extends Component {
    constructor(props) {
        super(props);
        this.state = state;
    }

    componentDidMount() {
        counter.subscribe(val => this.setState({ count: this.state.count + val }));

        currentInput.subscribe(val => this.setState({ input: val }));
    }

    componentWillUnmount() {
        counter.unsubscribe();
    }

    // Public class syntax to avoid binding this
    increment = () => {
        this.setState({ count: this.state.count + 1 });
    };

    render() {
        return (
            <div className="App">
                {/* increment with React handler binding */}
                {/* <Counter count={this.state.count} increment={this.increment}/> */}

                {/* Increment with observable */}
                <Counter count={this.state.count} counter={counter}/>

                <TodoApp currentInput={currentInput} />
            </div>
        );
    }
};

export default App;
