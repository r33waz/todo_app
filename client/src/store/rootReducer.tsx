import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import weatherSlice from "../rtk/weatherThunk/wratherSlice";
import authSlice from "../rtk/authThunk/authSlice";

const persistConfig = {
  key: "root",
  storage: storage,
};

const rootReducer = combineReducers({
  weather: weatherSlice,
  //auth reducer persist
  auth: persistReducer(persistConfig, authSlice),
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
