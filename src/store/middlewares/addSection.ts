import { createAsyncThunk } from "@reduxjs/toolkit";

import { axiosInstance } from "../../utils/axios";

interface Props {
  title: string;
}

const addSection = createAsyncThunk(
  "task/ADD_SECTION",
  async (payload: Props, thunkAPI) => {
    try {
      const result = await axiosInstance.post(`/section`, {
        title: payload.title,
      });
      return { result: result.data };
    } catch (err: any) {
      const result: string | string[] = err.response.data.errors;
      return thunkAPI.rejectWithValue(result);
    }
  }
);

export default addSection;

