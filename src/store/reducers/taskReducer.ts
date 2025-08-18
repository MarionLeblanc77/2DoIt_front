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
import deleteContactFromTask from "../middlewares/deleteContactFromTask";
import addContactToTask from "../middlewares/addContactToTask";
import toggleActive from "../middlewares/toggleActive";

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
      if (state.sections.length === 1) {
        state.sections.unshift(...action.payload);
      } else if (state.sections.length > 1) {
        state.sections = action.payload.push(state.sections.slice(-1));
      }
    })
    .addCase(getUserSections.pending, () => {})
    .addCase(getUserSections.rejected, () => {})
    .addCase(updateTask.fulfilled, (state, action) => {
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
    .addCase(updateTask.pending, () => {})
    .addCase(updateTask.rejected, () => {})
    .addCase(toggleActive.fulfilled, (state, action) => {
      state.sections = state.sections.map((section) => {
        if (section.id === action.payload.sectionId) {
          section.tasks = section.tasks.map((task) => {
            if (task.id === action.payload.data.task.id) {
              return { ...task, active: action.payload.data.task.active };
            }
            return task;
          });
          return section;
        }
        return section;
      });
    })
    .addCase(toggleActive.pending, () => {})
    .addCase(toggleActive.rejected, () => {})
    .addCase(updateSection.fulfilled, (state, action) => {
      state.sections = state.sections.map((section) => {
        if (section.id === action.payload.id) {
          section.title = action.payload.title;
          return section;
        }
        return section;
      });
    })
    .addCase(updateSection.pending, () => {})
    .addCase(updateSection.rejected, () => {})
    .addCase(addTask.fulfilled, (state, action) => {
      const toUpdateSectionId = action.payload.sectionId ?? 0;

      state.sections = state.sections.map((section) => {
        if (section.id === toUpdateSectionId) {
          section.tasks.push(action.payload.result.task);
          return section;
        }
        return section;
      });
    })
    .addCase(addTask.pending, () => {})
    .addCase(addTask.rejected, () => {})
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
    .addCase(addSection.pending, () => {})
    .addCase(addSection.rejected, () => {})
    .addCase(deleteTask.fulfilled, (state, action) => {
      const sectionToUpdate = state.sections.find((section) =>
        section.tasks.find((task) => task.id === action.payload.id)
      );
      if (sectionToUpdate) {
        sectionToUpdate!.tasks = sectionToUpdate!.tasks.filter(
          (task) => task.id !== action.payload.id
        );
      }
    })
    .addCase(deleteTask.pending, () => {})
    .addCase(deleteTask.rejected, () => {})
    .addCase(deleteSection.fulfilled, (state, action) => {
      state.sections = state.sections.filter(
        (section) => section.id !== action.payload.id
      );
    })
    .addCase(deleteSection.pending, () => {})
    .addCase(deleteSection.rejected, () => {})
    .addCase(addContactToTask.fulfilled, (state, action) => {
      const sectionToUpdate = state.sections.find((section) =>
        section.tasks.find((task) => task.id === action.payload.taskId)
      );

      if (sectionToUpdate) {
        const taskToUpdate = sectionToUpdate.tasks.find(
          (task) => task.id === action.payload.taskId
        );

        if (taskToUpdate) {
          taskToUpdate.users.push(action.payload.user!);
        }
      }
    })
    .addCase(addContactToTask.pending, () => {})
    .addCase(addContactToTask.rejected, () => {})
    .addCase(deleteContactFromTask.fulfilled, (state, action) => {
      const sectionToUpdate = state.sections.find((section) =>
        section.tasks.find((task) => task.id === action.payload.ids.taskId)
      );

      if (sectionToUpdate) {
        const taskToUpdate = sectionToUpdate.tasks.find(
          (task) => task.id === action.payload.ids.taskId
        );

        if (taskToUpdate) {
          taskToUpdate.users = taskToUpdate.users.filter(
            (user) => user.id !== action.payload.ids.userId
          );
        }
      }
    })
    .addCase(deleteContactFromTask.pending, () => {})
    .addCase(deleteContactFromTask.rejected, () => {});
});

export default taskReducer;
