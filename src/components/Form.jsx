import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addToDo } from '../store/slices/TodoSlice';

const Form = () => {
    const [todo, settodo ] = useState("");
    const dispatch = useDispatch();

    const addNewTodo = (e) => {
        let newTodo = {
            id: Math.floor(Math.random() * 10000),
            todo: todo,
            active: true
        };
    
        dispatch(addToDo(newTodo));
        settodo("");
        e.preventDefault();
    };
    
    return (
        <form onSubmit={addNewTodo}>
            <input
                className="new-todo"
                placeholder="What needs to be done?"
                autoFocus
                onChange={(e) => settodo(e.target.value)}
                value={todo}
            />
        </form>
    );
}

export default Form