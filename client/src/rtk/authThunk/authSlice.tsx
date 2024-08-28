import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserData, UserInfo } from "../../interface/authInterface";
import { LoginThunk, RegisterThunk } from "./authThunk";

const initialState: UserData = {
  user: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(LoginThunk.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
    });

    builder.addCase(
      LoginThunk.fulfilled,
      (state, { payload }: PayloadAction<UserInfo>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = payload;
        localStorage.setItem("token", payload.token);
      }
    );

    builder.addCase(LoginThunk.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });

    builder.addCase(RegisterThunk.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
    });

    builder.addCase(RegisterThunk.fulfilled, (state) => {
      state.isLoading = false;
      state.isSuccess = true;
    });

    builder.addCase(RegisterThunk.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
  },
});

export default authSlice.reducer;
