import { persistStore } from "redux-persist";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";

const store = configureStore({
  reducer: rootReducer,
});
const persisit = persistStore(store);
export type AppDispatch = typeof store.dispatch;
export { store, persisit };
