import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import taskReducer from "./reducers/taskReducer";
import appReducer from "./reducers/appReducer";

const store = configureStore({
  reducer: {
    userReducer,
    taskReducer,
    appReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
