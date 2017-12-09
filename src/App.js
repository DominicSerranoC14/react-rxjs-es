import React, { Component } from 'react';
import myObservable from './observable.js';
import './App.css';

const state = {
    count: 0,
    input: '',
};

const Counter = ({ count, increment, obs }) => (
    <div>
        <p>{count}</p>
        {/* <button onClick={increment}>Increment</button> */}
        <button onClick={() => obs.next(1)}>Increment</button>
        <button onClick={() => obs.next(-1)}>Decrement</button>

        <p><input  /></p>
    </div>
);

class App extends Component {
    constructor(props) {
        super(props);
        this.state = state;
        this.obs = myObservable;
    }

    componentDidMount() {
        this.obs.subscribe(val => this.setState({ count: this.state.count + val }));
    }

    componentWillUnmount() {
        this.obs.unsubscribe();
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
                <Counter count={this.state.count} obs={this.obs}/>
            </div>
        );
    }
};

export default App;
