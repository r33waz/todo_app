import { createSlice } from "@reduxjs/toolkit";
import { weatherInterface } from "../../interface/weatherInterface";
import { weatherInfo } from "./weatherThunk";

const initialState: weatherInterface = {
  weatherLoading: false,
  error: false,
  data: null,
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(weatherInfo.pending, (state) => {
      state.weatherLoading = true;
    });
    builder.addCase(weatherInfo.fulfilled, (state, action) => {
      state.data = action.payload;
      state.weatherLoading = false;
      state.error = false;
    });
    builder.addCase(weatherInfo.rejected, (state) => {
      state.weatherLoading = false;
      state.error = true;
    });
  },
});

export default weatherSlice.reducer;
