import { createAsyncThunk } from "@reduxjs/toolkit";

import { axiosInstance } from "../../utils/axios";

interface Props {
  id: number;
  content: string;
  users: number[];
  active: boolean;
}

const updateTask = createAsyncThunk(
  "task/UPDATE_TASK",
  async (payload: Props, thunkAPI) => {
    console.log("updateTask payload", payload);
    try {
      const result = await axiosInstance.put(`/task/${payload.id}`, {
        content: payload.content,
        users: payload.users,
        active: payload.active,
      });
      return result.data;
    } catch (err: any) {
      const result: string | string[] = err.response.data.errors;
      return thunkAPI.rejectWithValue(result);
    }
  }
);

export default updateTask;

