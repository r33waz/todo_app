import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  LoginInterface,
  RegisterInterface,
} from "../../interface/authInterface";
import { main_url } from "../../service";
import { ErrorToast } from "../../components/common/toast";

export const LoginThunk = createAsyncThunk(
  "user/login",
  async ({ email, password }: LoginInterface, { rejectWithValue }) => {
    try {
      const resp = await main_url.post("/login", {
        email,
        password,
      });

      console.log(resp.data);
      return resp.data.data;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error)
        ErrorToast({ message: error?.response?.data?.message });
        return rejectWithValue(error);
      } else {
        console.error('Unknown error:', error);
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
      console.log(resp.data);
      return resp.data.data;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error)
        ErrorToast({ message: error?.response?.data?.message });
        return rejectWithValue(error);
      } else {
        console.error('Unknown error:', error);
        return rejectWithValue(error);
      }
    }
  }
);
