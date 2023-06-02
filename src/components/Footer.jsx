import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { empty, removeToDo, toggle } from '../store/slices/TodoSlice';

const Footer = () => {
  const { todoReducer } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [filter, setFilter] = useState('all');

  const removeToDos = () => {
    dispatch(empty());
  };

  const changeList = () => {
    const activeTodos = todoReducer.todos.filter((item) => item.active);
    dispatch(toggle(activeTodos));
    setFilter('active');
  };

  const allList = () => {
    dispatch(toggle(todoReducer.todos));
    setFilter('all');
  };

  const completedList = () => {
    const completedTodos = todoReducer.todos.filter((item) => !item.active);
    dispatch(toggle(completedTodos));
    setFilter('completed');
  };

  const isActive = filter === 'active' ? 'selected' : '';
  const isCompleted = filter === 'completed' ? 'selected' : '';
  const isAll = filter === 'all' ? 'selected' : '';

  let filteredTodos = todoReducer.todos;
  if (filter === 'active') {
    filteredTodos = todoReducer.todos.filter((item) => item.active);
  } else if (filter === 'completed') {
    filteredTodos = todoReducer.todos.filter((item) => !item.active);
  }

  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{filteredTodos.filter((item) => !item.active).length}</strong> items left
      </span>

      <ul className="filters">
        <li>
          <a onClick={allList} href="#" className={isAll}>
            All
          </a>
        </li>
        <li>
          <a onClick={changeList} href="#" className={isActive}>
            Active
          </a>
        </li>
        <li>
          <a onClick={completedList} href="#" className={isCompleted}>
            Completed
          </a>
        </li>
      </ul>

      <button className="clear-completed" onClick={removeToDos}>
        Clear completed
      </button>
    </footer>
  );
};

export default Footer;