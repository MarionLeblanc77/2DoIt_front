import { createReducer } from "@reduxjs/toolkit";
import getTasks from "../middlewares/getTasks";

interface ITaskState {
  content: string;
}

export const taskInitialState: ITaskState = {
  content: "",
};

const taskReducer = createReducer(taskInitialState, (builder) => {
  builder.addCase(getTasks.fulfilled, (state, action) => {
    console.log(action.payload);
  });
});

export default taskReducer;
