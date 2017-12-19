import { BehaviorSubject, Subject  } from 'rxjs-es';
import allReducers from './reducers.js';

// Initial state of app
const initialState = { 
    count: 0,
    input: '',
    todos: [],
};

// BehaviorSubject observer that holds initial app state and sends updated to the React.render function
const stateStream = new BehaviorSubject(initialState);

// Handler subject observable incharge of passing actions to all reducers
const handler = new Subject();

// Helper function that passes the handler action to each reducer
const subscribeAllReducers = (action) =>
    allReducers.forEach(reducer => reducer(stateStream, stateStream.getValue(), action));

handler.subscribe(subscribeAllReducers);

export {
    stateStream,
    handler
};