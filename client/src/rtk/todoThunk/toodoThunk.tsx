import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  CompletedTaskInterface,
  CreateTodoInterface,
  FilterTodoInterface,
  ImportantTaskInterface,
  UmcomminginfoInterface,
  UpdateTodoInterface,
} from "../../interface/todoInterface";
import { main_url } from "../../service";
import { ErrorToast, SuccessToast } from "../../components/common/toast";
import { AxiosError } from "axios";

export const CreateTodo = createAsyncThunk(
  "create-todo",
  async ({ data, userId }: { data: CreateTodoInterface; userId: string }) => {
    console.log("create todo", data);
    try {
      const resp = await main_url.post("api/v1/createTodo", {
        ...data,
        userId,
      });
      console.log(resp.data.data);
      SuccessToast({ message: resp.data?.message });
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
        `api/v1/todos/search?userId=${userId}&title=${
          data?.title ? data?.title : ""
        }&completed=${data?.completed ? data?.completed : ""}&important=${
          data?.important ? data?.important : ""
        }&date=${data?.date ? data?.date : ""}`
      );
      console.log(resp.data.data);
      return resp.data.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log("error", error);
        
        // Check if error has a response
        if (error.response) {
          ErrorToast({ message: error.response.data?.json.message });
        } else {
          ErrorToast({ message: "An unexpected error occurred" });
        }

        return rejectWithValue(error.response?.data);
      } else {
        // For non-Axios errors, you can handle them separately
        ErrorToast({ message: "An unknown error occurred" });
        return rejectWithValue(error);
      }
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
        `completed-todo/search?userId=${userId}&title=${
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
        `/api/v1/important-todo/search?userId=${userId}&title=${
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
//togle important task
export const TogleImportant = createAsyncThunk(
  "togle/important",
  async ({ id }: { id: string }, { rejectWithValue }) => {
    try {
      const resp = await main_url.patch(`api/v1/toggle-todo/${id}`);
      SuccessToast({ message: resp?.data?.message });
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
      const resp = await main_url.delete(`api/v1/deleteTodo/${id}`);
      SuccessToast({ message: resp.data?.message });
      return resp.data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// upcomming task

export const UpcommingTodo = createAsyncThunk(
  "upcomming-todo",
  async (
    { id, data }: { id: string; data: UmcomminginfoInterface },
    { rejectWithValue }
  ) => {
    try {
      const resp = await main_url.get(
        `upcomming-task/search?userId=${id}&title=${
          data?.title ? data?.title : ""
        }&important=${data?.important ? data?.important : ""}&date=${
          data?.date ? data?.date : ""
        }`
      );
      console.log("first", resp.data.data);
      return resp.data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
// todays task

export const TodaysTodo = createAsyncThunk(
  "todays-todo",
  async (
    {
      id,
      data,
    }: {
      id: string;
      data: {
        title: string;
        completed: boolean;
      };
    },
    { rejectWithValue }
  ) => {
    try {
      const resp = await main_url.get(
        `api/v1/today-todo/search?userId=${id}&title=${
          data?.title ? data?.title : ""
        }&completed=${data?.completed ? data?.completed : ""}`
      );
      console.log("first", resp.data.data);
      return resp.data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
//update the task

export const UpdateTodo = createAsyncThunk(
  "update-todo",
  async (
    { id, data }: { id: string; data: UpdateTodoInterface },
    { rejectWithValue }
  ) => {
    try {
      const resp = await main_url.patch(`api/v1/update-todo/${id}`, data);
      SuccessToast({ message: resp?.data?.message });
      return resp.data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
