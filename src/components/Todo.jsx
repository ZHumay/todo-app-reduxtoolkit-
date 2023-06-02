import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeToDo, toggle } from "../store/slices/TodoSlice";

const Todo = () => {
  let dispatch = useDispatch();
  let { todoReducer } = useSelector((state) => state);

  let changeStyle = (index) => {
    const newTodos = todoReducer.todos.map((todo, i) =>
      i === index ? { ...todo, active: !todo.active } : todo
    );
    dispatch(toggle(newTodos));
  };

  const removeToDos = (id) => {
    dispatch(removeToDo(id));
  };

  return (
    <ul className="todo-list">
      {todoReducer.todos &&
        todoReducer.todos.map((item, index) => (
          <li className={item.active ? "" : "completed"} key={index}>
            <div className="view">
              <input
                className="toggle"
                type="checkbox"
                onClick={() => changeStyle(index)}
              />
              <label>{item.todo}</label>
              <button className="destroy" onClick={() => removeToDos(item.id)}></button>
            </div>
          </li>
        ))}
    </ul>
  );
};

export default Todo;