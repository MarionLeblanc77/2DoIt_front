import { createAsyncThunk } from "@reduxjs/toolkit";

import { axiosInstance } from "../../utils/axios";

interface Props {
  content?: string;
  sectionId: number;
}

const addTask = createAsyncThunk(
  "task/ADD_TASK",
  async (payload: Props, thunkAPI) => {
    try {
      const result = await axiosInstance.post(
        `/task/section/${payload.sectionId}`,
        {
          content: payload.content,
        }
      );
      return { result: result.data, sectionId: payload.sectionId };
    } catch (err: any) {
      const result: string | string[] = err.response.data.errors;
      return thunkAPI.rejectWithValue(result);
    }
  }
);

export default addTask;
