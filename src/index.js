import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { stateStream } from './store';

stateStream.subscribe(state =>    
    ReactDOM.render(<App {...state} />, document.getElementById('root'))
);

