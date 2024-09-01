import { createAsyncThunk } from "@reduxjs/toolkit";
import { CreateTodoInterface } from "../../interface/todoInterface";
import { main_url } from "../../service";

export const CreateTodo = createAsyncThunk(
  "create-todo",
  async ({ data, userId }: { data: CreateTodoInterface; userId: string }) => {
    try {
      const resp = await main_url.post("/createTodo", {
        ...data,
        userId,
      });
      console.log(resp.data.data);
      return resp.data.data;
    } catch (error) {
      console.log(error);
    }
  }
);

//get all todo

export const GetAllTodo = createAsyncThunk(
  "get-all-todo",
  async ({ userId, data }: { userId: string }, { rejectWithValue }) => {
    try {
      const resp = await main_url.get(`/all_todo/${userId}`, {
        data,
      });

      return resp.data.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);
