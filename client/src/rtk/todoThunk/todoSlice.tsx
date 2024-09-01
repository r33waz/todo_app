import { createSlice } from "@reduxjs/toolkit";
import { CreateTodo, GetAllTodo } from "./toodoThunk";
import { TodoInterface } from "../../interface/todoInterface";

const initialState: TodoInterface = {
  loading: false,
  error: false,
  data: {
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
  },
});

export default todoSlice.reducer;