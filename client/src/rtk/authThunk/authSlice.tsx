import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserData, UserInfo } from "../../interface/authInterface";
import { LoginThunk, RegisterThunk, SingleUser, UpdateUser } from "./authThunk";

const initialState: UserData = {
  user: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
  // single user
  singleUserLoading: false,
  singleUserError: false,
  updateLoading: false,
  updateError: false,
  updateSuccess: false,
  sessionExpired: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isSuccess = false;
      state.user = null;
      state.sessionExpired = false;
      localStorage.removeItem("token");
    },
    setSessionExpired: (state, action: PayloadAction<boolean>) => {
      state.sessionExpired = action.payload;
      state.isSuccess = false;
      state.user = null;
      localStorage.removeItem("token");
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(LoginThunk.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.sessionExpired = false;
    });

    builder.addCase(LoginThunk.fulfilled, (state, { payload }: PayloadAction<UserInfo>) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = payload;
      localStorage.setItem("token", payload.token);
      state.sessionExpired = false;
    });

    builder.addCase(LoginThunk.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.user = null;
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

    builder.addCase(SingleUser.pending, (state) => {
      state.singleUserLoading = true;
    });

    builder.addCase(SingleUser.fulfilled, (state, { payload }: PayloadAction<UserInfo>) => {
      state.singleUserLoading = false;
      state.user = payload;
      state.singleUserError = false;
    });

    builder.addCase(SingleUser.rejected, (state) => {
      state.singleUserLoading = false;
      state.singleUserError = true;
    });

    builder.addCase(UpdateUser.pending, (state) => {
      state.updateLoading = true;
    });

    builder.addCase(UpdateUser.fulfilled, (state) => {
      state.updateLoading = false;
      state.updateSuccess = true;
    });

    builder.addCase(UpdateUser.rejected, (state) => {
      state.updateLoading = false;
      state.updateError = true;
    });
  },
});

export const { logout, setSessionExpired } = authSlice.actions;
export default authSlice.reducer;
