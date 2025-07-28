import { createAsyncThunk } from "@reduxjs/toolkit";

import { axiosInstance } from "../../utils/axios";

interface Props {
  id: number;
  title?: string;
}

const updateSection = createAsyncThunk(
  "task/UPDATE_SECTION",
  async (payload: Props, thunkAPI) => {
    try {
      const result = await axiosInstance.put(`/section/${payload.id}`, {
        title: payload.title,
      });
      return result.data;
    } catch (err: any) {
      const result: string | string[] = err.response.data.errors;
      return thunkAPI.rejectWithValue(result);
    }
  }
);

export default updateSection;

