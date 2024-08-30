import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const weatherInfo = createAsyncThunk(
  "weather",
  async ({ city }: { city: string }, { rejectWithValue }) => {
    try {
      const resp = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${
          city ? city : "kathmandu"
        }&units=metric&appid=${import.meta.env.VITE_WEATHER_API}`
      );
      return resp.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
