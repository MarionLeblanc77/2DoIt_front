/* eslint-disable no-plusplus */
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
import updateSectionsPositions from "../middlewares/updateSectionsPositions";

interface ITaskState {
  sections: ISection[];
}

export const taskInitialState: ITaskState = {
  sections: [
    {
      id: 0,
      title: "",
      tasks: [],
      position: 0,
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
}>("task/CHANGE_SECTION_INFO");

export const actionChangeSectionOrder = createAction<{
  sectionId: number;
  arrivalPosition: number;
  initialPosition: number;
}>("task/CHANGE_SECTION_ORDER");

export const actionResetTaskState = createAction("task/RESET");

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
    .addCase(actionChangeSectionOrder, (state, action) => {
      if (action.payload.arrivalPosition === action.payload.initialPosition) {
        return;
      }
      const sectionToMove = state.sections.find(
        (s) => s.id === action.payload.sectionId
      );
      if (!sectionToMove) return;

      const currentPosition = sectionToMove.position;

      if (action.payload.arrivalPosition > currentPosition) {
        state.sections.forEach((section) => {
          if (
            section.position > currentPosition &&
            section.position <= action.payload.arrivalPosition
          ) {
            section.position -= 1;
          }
        });
      } else if (action.payload.arrivalPosition < currentPosition) {
        state.sections.forEach((section) => {
          if (
            section.position < currentPosition &&
            section.position >= action.payload.arrivalPosition
          ) {
            section.position += 1;
          }
        });
      }
      sectionToMove.position = action.payload.arrivalPosition;
    })
    .addCase(getUserSections.fulfilled, (state, action) => {
      state.sections.push(...action.payload);
      state.sections.find((section) => section.id === 0)!.position =
        state.sections.length - 1;
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
    .addCase(updateSectionsPositions.fulfilled, (state, action) => {
      state.sections = action.payload.push(state.sections.slice(0, 1));
    })
    .addCase(updateSectionsPositions.pending, () => {})
    .addCase(updateSectionsPositions.rejected, () => {})
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
          section.position = state.sections.length - 1;
          return section;
        }
        return section;
      });
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
    .addCase(deleteContactFromTask.rejected, () => {})
    .addCase(actionResetTaskState, (state) => {
      state.sections = [
        {
          id: 0,
          title: "",
          tasks: [],
          position: 0,
          lastUpdatedDate: "",
        },
      ];
    });
});

export default taskReducer;
