import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  LoginInterface,
  RegisterInterface,
  UpdateData,
} from "../../interface/authInterface";
import { main_url } from "../../service";
import { ErrorToast, SuccessToast } from "../../components/common/toast";

export const LoginThunk = createAsyncThunk(
  "user/login",
  async ({ email, password }: LoginInterface, { rejectWithValue }) => {
    try {
      const resp = await main_url.post("/login", {
        email,
        password,
      });

      SuccessToast({ message: resp?.data?.message });
      return resp.data.data;
    } catch (error) {
      if (error instanceof Error) {
        ErrorToast({ message: error?.response?.data?.message });
        return rejectWithValue(error);
      } else {
        return rejectWithValue(error);
      }
    }
  }
);

export const RegisterThunk = createAsyncThunk(
  "user/register",
  async (
    { username, email, confirmPassword }: RegisterInterface,
    { rejectWithValue }
  ) => {
    try {
      const resp = await main_url.post("/signup", {
        username,
        email,
        password: confirmPassword,
      });
      return resp.data.data;
    } catch (error) {
      if (error instanceof Error) {
        ErrorToast({ message: error?.response?.data?.message });
        return rejectWithValue(error);
      } else {
        return rejectWithValue(error);
      }
    }
  }
);

export const SingleUser = createAsyncThunk(
  "single/user",
  async (id: string, { rejectWithValue }) => {
    try {
      const resp = await main_url.get(`/user/${id}`);
      return resp.data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);


// update user thunk

export const UpdateUser = createAsyncThunk(
  "update/user",
  async ({ id, data }: { id: string; data: UpdateData },{rejectWithValue}) => {
    try {
      const resp = await main_url.patch(`/update-user/${id}`, data);
      SuccessToast({ message: resp?.data?.message });
      return resp.data.data;
    } catch (error) {
      ErrorToast({ message: error?.response?.data?.message });
      return rejectWithValue(error);
    }
  }
);
