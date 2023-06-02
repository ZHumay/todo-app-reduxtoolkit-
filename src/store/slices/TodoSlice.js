import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  todos: [],
};

export const getAllData = createAsyncThunk("fetch/todos", async () => {
  const res = await axios.get("http://localhost:3002/todos/api");
  return res.data;
});

export const postTodo = createAsyncThunk("post/todos", async (obj) => {
  const res = await axios.post("http://localhost:3002/todos/api", obj);
  return res.data;
});

export const deleteTodo = createAsyncThunk("delete/todo", async (id) => {
  const res = await axios.delete("http://localhost:3002/todos/api/" + id);
  return res.data;
});

export const handleCheckTodo = createAsyncThunk(
  "handleCheck/todo",
  async (payload) => {
    const res = await axios.put(
      "http://localhost:3002/todos/api/" + payload.id,
      payload.updatedObj
    );
    return res.data;
  }
);

export const deleteCompletedTodoAction = createAsyncThunk(
  "deleteCompleted/todos",
  async (completedTodos, { dispatch }) => {
    await axios
      .put("http://localhost:3002/todos/api/delete/completed", completedTodos)
      .then(() => dispatch(getAllData()));
  }
);

const todoSlice = createSlice({
  name: 'todoSlice',
  initialState,
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
    toggle: (state, action) => {
      state.todos = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllData.fulfilled, (state, action) => {
      state.todos = action.payload;
    });
    builder.addCase(postTodo.fulfilled, (state, action) => {
      state.todos.push(action.payload);
    });
    builder.addCase(deleteTodo.fulfilled, (state, action) => {
      state.todos = state.todos.filter(q => q.id !== action.payload);
    });
    builder.addCase(handleCheckTodo.fulfilled, (state, action) => {
      const updatedTodo = action.payload;
      state.todos = state.todos.map(todo => {
        if (todo.id === updatedTodo.id) {
          return updatedTodo;
        }
        return todo;
      });
    });
  },
});

export const { addToDo, removeToDo, empty, toggle } = todoSlice.actions;

export default todoSlice.reducer;
