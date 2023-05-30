import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: 'todoSlice',
  initialState: {
    todos: []
  },
  reducers: {
    addToDo: (state, action) => {
      state.todos.push(action.payload);
    },
    removeToDo: (state, action) => {
      state.todos = state.todos.filter(q => q.id !== action.payload);
    },
    empty: (state) => {
      state.todos = [];
    },
    toggleTodo: (state, action) => {
      state.todos = action.payload;
    }
  }
});

export const { addToDo, removeToDo, empty, toggleTodo } = todoSlice.actions;

export default todoSlice.reducer;
