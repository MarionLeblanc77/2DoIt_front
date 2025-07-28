import { createAsyncThunk } from "@reduxjs/toolkit";

import { axiosInstance } from "../../utils/axios";

interface Props {
  id: number;
}

const deleteSection = createAsyncThunk(
  "task/DELETE_SECTION",
  async (payload: Props, thunkAPI) => {
    try {
      const result = await axiosInstance.delete(`/section/${payload.id}`);
      return { data: result.data, id: payload.id };
    } catch (err: any) {
      const result: string | string[] = err.response.data.errors;
      return thunkAPI.rejectWithValue(result);
    }
  }
);

export default deleteSection;

