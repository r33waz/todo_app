import { createSlice } from "@reduxjs/toolkit";
import {
  CompletedTodo,
  CreateTodo,
  DeleteTodo,
  GetAllTodo,
  ImportantTodo,
} from "./toodoThunk";
import { TodoInterface } from "../../interface/todoInterface";

const initialState: TodoInterface = {
  loading: false,
  error: false,
  data: {
    list: [],
  },
  completed: {
    list: [],
  },
  //important task
  important: {
    list: [],
  },
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(CreateTodo.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(CreateTodo.fulfilled, (state) => {
      state.loading = false;
      state.error = false;
    });
    builder.addCase(CreateTodo.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });

    // Get all todos
    builder.addCase(GetAllTodo.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(GetAllTodo.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.error = false;
      state.data.list = payload;
    });
    builder.addCase(GetAllTodo.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
    //delete task
    builder.addCase(DeleteTodo.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(DeleteTodo.fulfilled, (state) => {
      state.loading = false;
      state.error = false;
    });
    builder.addCase(DeleteTodo.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
    //completed task
    builder.addCase(CompletedTodo.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(CompletedTodo.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.completed.list = payload;
      state.error = false;
    });
    builder.addCase(CompletedTodo.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
    //important task
    builder.addCase(ImportantTodo.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(ImportantTodo.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.important.list = payload;
      state.error = false;
    });
    builder.addCase(ImportantTodo.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export default todoSlice.reducer;
