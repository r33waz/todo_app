import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  CompletedTaskInterface,
  CreateTodoInterface,
  FilterTodoInterface,
  ImportantTaskInterface,
} from "../../interface/todoInterface";
import { main_url } from "../../service";
import { SuccessToast } from "../../components/common/toast";

export const CreateTodo = createAsyncThunk(
  "create-todo",
  async ({ data, userId }: { data: CreateTodoInterface; userId: string }) => {
    console.log("create todo", data);
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
  async (
    { userId, data }: { userId: string; data: FilterTodoInterface },
    { rejectWithValue }
  ) => {
    try {
      const resp = await main_url.get(
        `/todos/search?userId=${userId}&title=${
          data?.title ? data?.title : ""
        }&completed=${data?.completed ? data?.completed : ""}&important=${
          data?.important ? data?.important : ""
        }&date=${data?.date ? data?.date : ""}`
      );
      console.log(resp.data.data);
      return resp.data.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

// first get all the completed task of the use by the id and then filter
// the complered task according to the params like title,date,important
export const CompletedTodo = createAsyncThunk(
  "filter/complete/todo",
  async (
    { userId, data }: { userId: string; data: CompletedTaskInterface },
    { rejectWithValue }
  ) => {
    try {
      const resp = await main_url.get(
        `/completed-todo/search?userId=${userId}&title=${
          data?.title ? data?.title : ""
        }&important=${data?.important ? data?.important : ""}&date=${
          data?.date ? data?.date : ""
        }`
      );
      console.log(resp.data.data);
      return resp.data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// first get all the important task of the use by the id and then filter
// the complered task according to the params like title,date,completed
export const ImportantTodo = createAsyncThunk(
  "filter/important/todo",
  async (
    { userId, data }: { userId: string; data: ImportantTaskInterface },
    { rejectWithValue }
  ) => {
    try {
      const resp = await main_url.get(
        `/important-todo/search?userId=${userId}&title=${
          data?.title ? data?.title : ""
        }&completed=${data?.completed ? data?.completed : ""}&date=${
          data?.date ? data?.date : ""
        }`
      );
      console.log(resp.data.data);
      return resp.data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// delete todo
export const DeleteTodo = createAsyncThunk(
  "delete-todo",
  async ({ id }: { id: string }, { rejectWithValue }) => {
    try {
      const resp = await main_url.delete(`/deleteTodo/${id}`);
      SuccessToast({ message: resp.data?.message });
      return resp.data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
