import { createReducer } from "@reduxjs/toolkit";
import { ISection } from "../../@types/task";
import getUserSections from "../middlewares/getUserSections";

interface ITaskState {
  sections: ISection[];
}

export const taskInitialState: ITaskState = {
  sections: [
    {
      id: 0,
      title: "Add a section...",
      tasks: [
        {
          id: 0,
          content: "Add a task...",
          users: [],
        },
      ],
      lastUpdatedDate: "",
    },
  ],
};

const taskReducer = createReducer(taskInitialState, (builder) => {
  builder
    .addCase(getUserSections.fulfilled, (state, action) => {
      console.log("Action getUserSections fullfilled");
      if (action.payload.length > 0) {
        state.sections.unshift(...action.payload);
      }
    })
    .addCase(getUserSections.pending, () => {
      console.log("Action getUserSections pending");
    })
    .addCase(getUserSections.rejected, () => {
      console.log("Action getUserSections rejected");
    });
});

export default taskReducer;
