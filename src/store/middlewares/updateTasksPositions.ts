import { createAsyncThunk } from "@reduxjs/toolkit";

import { axiosInstance } from "../../utils/axios";
import { RootState } from "../types";

interface Props {
  previousSectionId: number;
  previousPosition: number;
  newSectionId: number;
  newPosition: number;
}

const updateTasksPositions = createAsyncThunk(
  "task/UPDATE_TASKS_POSITIONS",
  async (payload: Props, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const previousSection = state.taskReducer.sections.find(
      (section) => section.id === payload.previousSectionId
    );
    if (!previousSection) {
      return thunkAPI.rejectWithValue("Previous section not found");
    }
    let previousSectionNewPositions: { id: number; position: number }[] = [];
    let newSectionNewPositions: { id: number; position: number }[] = [];
    if (payload.previousSectionId === payload.newSectionId) {
      // Move within the same section
      previousSectionNewPositions = previousSection.tasks
        .map((task) => ({
          id: task.id,
          position: task.position,
        }))
        .filter(
          (task) =>
            task.id !== 0 &&
            (payload.previousPosition < payload.newPosition
              ? task.position >= payload.previousPosition &&
                task.position <= payload.newPosition!
              : task.position <= payload.previousPosition &&
                task.position >= payload.newPosition!)
        );
    } else {
      // Move to a different section
      const newSection = state.taskReducer.sections.find(
        (section) => section.id === payload.newSectionId
      );
      if (!newSection) {
        return thunkAPI.rejectWithValue("New section not found");
      }
      previousSectionNewPositions = previousSection.tasks
        .map((task) => ({
          id: task.id,
          position: task.position,
        }))
        .filter(
          (task) => task.id !== 0 && task.position >= payload.previousPosition
        );
      newSectionNewPositions = newSection.tasks
        .map((task) => ({
          id: task.id,
          position: task.position,
        }))
        .filter(
          (task) => task.id !== 0 && task.position >= payload.newPosition
        );
    }

    try {
      const result = await axiosInstance.put(`/tasks/positions`, [
        {
          previousSectionId: payload.previousSectionId,
          positions: previousSectionNewPositions,
        },
        {
          newSectionId: payload.newSectionId ?? payload.previousSectionId,
          positions: newSectionNewPositions,
        },
      ]);
      return result.data;
    } catch (err: any) {
      const result: string | string[] = err.response.data.errors;
      return thunkAPI.rejectWithValue(result);
    }
  }
);

export default updateTasksPositions;
