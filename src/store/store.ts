import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import taskReducer from "./reducers/taskReducer";

const store = configureStore({
  reducer: {
    userReducer,
    taskReducer,
  },
});

export default store;
