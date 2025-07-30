/* eslint-disable no-console */
import { createAction, createReducer } from "@reduxjs/toolkit";
import { ISection } from "../../@types/task";
import getUserSections from "../middlewares/getUserSections";
import updateTask from "../middlewares/updateTask";
import addTask from "../middlewares/addTask";
import deleteTask from "../middlewares/deleteTask";
import updateSection from "../middlewares/updateSection";
import deleteSection from "../middlewares/deleteSection";
import addSection from "../middlewares/addSection";

interface ITaskState {
  sections: ISection[];
}

export const taskInitialState: ITaskState = {
  sections: [
    {
      id: 0,
      title: "",
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

export const actionChangeSectionStateInfo = createAction<{
  sectionId: number;
  newValue: string;
  fieldName: "title";
}>("task/CHANGE_SECTIONINFO");

const taskReducer = createReducer(taskInitialState, (builder) => {
  builder
    .addCase(actionChangeTaskStateInfo, (state, action) => {
      state.sections
        .find((section) => section.id === action.payload.sectionId)!
        .tasks.find((task) => task.id === action.payload.taskId)![
        action.payload.fieldName
      ] = action.payload.newValue;
    })
    .addCase(actionChangeSectionStateInfo, (state, action) => {
      state.sections.find(
        (section) => section.id === action.payload.sectionId
      )![action.payload.fieldName] = action.payload.newValue;
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
    .addCase(updateTask.fulfilled, (state, action) => {
      console.log("Action updateTask fullfilled");
      state.sections = state.sections.map((section) => {
        if (section.id === action.payload.sectionId) {
          section.tasks = section.tasks.map((task) => {
            if (task.id === action.payload.id) {
              return { ...task, content: action.payload.content };
            }
            return task;
          });
          return section;
        }
        return section;
      });
    })
    .addCase(updateTask.pending, () => {
      console.log("Action updateTask pending");
    })
    .addCase(updateTask.rejected, () => {
      console.log("Action updateTask rejected");
    })
    .addCase(updateSection.fulfilled, (state, action) => {
      console.log("Action updateSection fullfilled");
      state.sections = state.sections.map((section) => {
        if (section.id === action.payload.id) {
          section.title = action.payload.title;
          return section;
        }
        return section;
      });
    })
    .addCase(updateSection.pending, () => {
      console.log("Action updateSection pending");
    })
    .addCase(updateSection.rejected, () => {
      console.log("Action updateSection rejected");
    })
    .addCase(addTask.fulfilled, (state, action) => {
      const toUpdateSectionId = action.payload.sectionId ?? 0;

      state.sections = state.sections.map((section) => {
        if (section.id === toUpdateSectionId) {
          section.tasks.push(action.payload.result.task);
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
    .addCase(addSection.fulfilled, (state, action) => {
      state.sections.push(action.payload.result.section);
      state.sections = state.sections.map((section) => {
        if (section.id === 0) {
          section.title = "";
          return section;
        }
        return section;
      });
      state.sections.push(state.sections.splice(-2, 1)[0]);
    })
    .addCase(addSection.pending, () => {
      console.log("Action addSection pending");
    })
    .addCase(addSection.rejected, () => {
      console.log("Action addSection rejected");
    })
    .addCase(deleteTask.fulfilled, (state, action) => {
      const toUpdateSection = state.sections.find((section) =>
        section.tasks.find((task) => task.id === action.payload.id)
      );
      toUpdateSection!.tasks = toUpdateSection!.tasks.filter(
        (task) => task.id !== action.payload.id
      );
      state.sections = state.sections.map((section) => {
        if (section.id === toUpdateSection!.id) {
          return toUpdateSection!;
        }
        return section;
      });
      console.log("Action deleteTask fullfilled");
    })
    .addCase(deleteTask.pending, () => {
      console.log("Action deleteTask pending");
    })
    .addCase(deleteTask.rejected, () => {
      console.log("Action deleteTask rejected");
    })
    .addCase(deleteSection.fulfilled, (state, action) => {
      state.sections = state.sections.filter(
        (section) => section.id !== action.payload.id
      );
      console.log("Action deleteSection fullfilled");
    })
    .addCase(deleteSection.pending, () => {
      console.log("Action deleteSection pending");
    })
    .addCase(deleteSection.rejected, () => {
      console.log("Action deleteSection rejected");
    });
});

export default taskReducer;
