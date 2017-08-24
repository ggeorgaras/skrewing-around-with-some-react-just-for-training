import React from 'react';

/** A simplw to do list
 *
 * @constructor
 *
 */
const TodoHeader = () => (
    <div className="todo-header">
        <h1 />
        <form>
            <AddTodo />
        </form>
    </div>
);

const AddTodo = () => (
    let input;
);

const TodoItem = () => (
    <li onClick={props.action}>
        {props.title}
    </li>
);

const TodoList = () => (
    <ul>
        <TodoItem />
    </ul>
);

const ToDo = () => (
    <div className="todo">
        <TodoHeader />
        <TodoList />
    </div>
);

export default ToDo