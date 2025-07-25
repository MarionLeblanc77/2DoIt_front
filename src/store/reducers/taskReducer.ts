import { createAction, createReducer } from "@reduxjs/toolkit";
import { ISection } from "../../@types/task";
import getUserSections from "../middlewares/getUserSections";
import updateTask from "../middlewares/updateTask";

interface ITaskState {
  sections: ISection[];
}

export const taskInitialState: ITaskState = {
  sections: [
    {
      id: 0,
      title: "Add a section...",
      tasks: [],
      lastUpdatedDate: "",
    },
  ],
};

export const actionChangeTaskStateInfo = createAction<{
  sectionId: number;
  taskId: number;
  newValue: string;
  fieldName: "content";
}>("task/CHANGE_TASKINFO");

const taskReducer = createReducer(taskInitialState, (builder) => {
  builder
    .addCase(actionChangeTaskStateInfo, (state, action) => {
      state.sections
        .find((section) => section.id === action.payload.sectionId)!
        .tasks.find((task) => task.id === action.payload.taskId)![
        action.payload.fieldName
      ] = action.payload.newValue;
    })
    .addCase(getUserSections.fulfilled, (state, action) => {
      console.log("Action getUserSections fullfilled");
      if (state.sections.length === 1) {
        state.sections.unshift(...action.payload);
      } else if (state.sections.length > 1) {
        state.sections = action.payload.push(state.sections.slice(-1));
      }
    })
    .addCase(getUserSections.pending, () => {
      console.log("Action getUserSections pending");
    })
    .addCase(getUserSections.rejected, () => {
      console.log("Action getUserSections rejected");
    })
    .addCase(updateTask.fulfilled, () => {
      console.log("Action updateTask fullfilled");
    });
});

export default taskReducer;
