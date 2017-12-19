import React from 'react';

export const Counter = ({ count, handler }) => (
    <div>
        <p>{count}</p>

        <p className="button">
            <button onClick={() => handler.next({ type: 'COUNTER', value: 1 })}>Increment</button>
        </p>

        <p className="button">
            <button onClick={() => handler.next({ type: 'COUNTER', value: -1 })}>Decrement</button>
        </p>
    </div>
);