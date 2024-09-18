import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  LoginInterface,
  RegisterInterface,
  UpdateData,
} from "../../interface/authInterface";
import { main_url } from "../../service";
import { ErrorToast, SuccessToast } from "../../components/common/toast";
import { AxiosError } from "axios";

export const LoginThunk = createAsyncThunk(
  "user/login",
  async ({ email, password }: LoginInterface, { rejectWithValue }) => {
    try {
      const resp = await main_url.post("/api/v1/login", {
        email,
        password,
      });

      SuccessToast({ message: resp?.data?.message });
      return resp.data.data;
    } catch (error) {
      // Ensure the error is of type AxiosError
      if (error instanceof AxiosError) {
        console.log("error", error);
        
        // Check if error has a response
        if (error.response) {
          ErrorToast({ message: error.response.data?.message });
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
export const RegisterThunk = createAsyncThunk(
  "user/register",
  async (
    { username, email, confirmPassword }: RegisterInterface,
    { rejectWithValue }
  ) => {
    try {
      const resp = await main_url.post("/api/v1/signup", {
        username,
        email,
        password: confirmPassword,
      });
      return resp.data.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log("error", error);
        
        // Check if error has a response
        if (error.response) {
          ErrorToast({ message: error.response.data?.message });
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

export const SingleUser = createAsyncThunk(
  "single/user",
  async (id: string, { rejectWithValue }) => {
    try {
      const resp = await main_url.get(`/api/v1/user/${id}`);
      return resp.data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// update user thunk

export const UpdateUser = createAsyncThunk(
  "update/user",
  async (
    { id, data }: { id: string; data: UpdateData },
    { rejectWithValue }
  ) => {
    try {
      const resp = await main_url.patch(`/api/v1/update-user/${id}`, data);
      SuccessToast({ message: resp?.data?.message });
      return resp.data.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log("error", error);
        
        // Check if error has a response
        if (error.response) {
          ErrorToast({ message: error.response.data?.message });
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

//forget password

export const ForgetPassword = createAsyncThunk(
  "forget/password",
  async (email: string, { rejectWithValue }) => {
    try {
      const resp = await main_url.post("/api/v1/forget-password", { email });
      SuccessToast({ message: resp?.data?.message });
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log("error", error);
        
        // Check if error has a response
        if (error.response) {
          ErrorToast({ message: error.response.data?.message });
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

//resetpassowrd

export const Resetpassword = createAsyncThunk(
  "reset/password",
  async (
    {
      data,
      id,
      token,
    }: {
      data: {
        confirmPassword: string;
        createpassword: string;
      };
      id: string;
      token: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const resp = await main_url.post(`/api/v1/reset-password/${id}/${token}`, {
        password: data?.createpassword,
      });
      SuccessToast({ message: resp?.data?.message });
      return resp.data.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log("error", error);
        
        // Check if error has a response
        if (error.response) {
          ErrorToast({ message: error.response.data?.message });
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
