import { Subject } from 'rxjs-es';

const counter = new Subject();
const createTodo = new Subject();
const currentInput = new Subject();
const deleteTodo = new Subject();
const updateTodo = new Subject();

export {
    counter,
    createTodo,
    currentInput,
    deleteTodo,
    updateTodo
};
