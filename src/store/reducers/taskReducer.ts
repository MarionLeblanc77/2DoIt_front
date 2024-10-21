import { createReducer, createAction } from "@reduxjs/toolkit";

interface ITaskState {
  content: string;
}

export const taskInitialState: ITaskState = {
  content: "",
};
const myFirstActionCreator = createAction("FIRST_ACTION");

const taskReducer = createReducer(taskInitialState, (builder) => {
  builder.addCase(myFirstActionCreator, () => {
    // action
  });
});

export default taskReducer;
