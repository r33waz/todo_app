import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import weatherSlice from "../rtk/weatherThunk/wratherSlice";

// const persistConfig = {
//   key: "root",
//   storage: storage,
// };

const rootReducer = combineReducers({
  weather: weatherSlice,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
