/* eslint-disable no-console */
import { createAction, createReducer } from "@reduxjs/toolkit";
import { ISection } from "../../@types/task";
import getUserSections from "../middlewares/getUserSections";
import updateTask from "../middlewares/updateTask";
import addTask from "../middlewares/addTask";
import deleteTask from "../middlewares/deleteTask";

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
  taskId?: number;
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
    })
    .addCase(updateTask.pending, () => {
      console.log("Action updateTask pending");
    })
    .addCase(updateTask.rejected, () => {
      console.log("Action updateTask rejected");
    })
    .addCase(addTask.fulfilled, (state, action) => {
      console.log("action.payload.sectionId", action.payload.sectionId);
      const toUpdateSectionId = action.payload.sectionId ?? 0;

      state.sections = state.sections.map((section) => {
        if (section.id === toUpdateSectionId) {
          section.tasks.push(action.payload.result.task);
          section.lastUpdatedDate = new Date().toISOString();
          return section;
        }
        return section;
      });

      console.log("Action addTask fullfilled");
    })
    .addCase(addTask.pending, () => {
      console.log("Action addTask pending");
    })
    .addCase(addTask.rejected, () => {
      console.log("Action addTask rejected");
    })
    .addCase(deleteTask.fulfilled, (state, action) => {
      const toUpdateSection = state.sections.find((section) =>
        section.tasks.find((task) => task.id === action.payload.id)
      );
      toUpdateSection!.tasks = toUpdateSection!.tasks.filter(
        (task) => task.id !== action.payload.id
      );
      console.log("Action deleteTask fullfilled");
    })
    .addCase(deleteTask.pending, () => {
      console.log("Action deleteTask pending");
    })
    .addCase(deleteTask.rejected, () => {
      console.log("Action deleteTask rejected");
    });
});

export default taskReducer;
