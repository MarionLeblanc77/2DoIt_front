import { createAsyncThunk } from "@reduxjs/toolkit";

import { axiosInstance } from "../../utils/axios";

interface Props {
  id: number;
  sectionId: number;
}

const toggleActive = createAsyncThunk(
  "task/TOOGLE_ACTIVE",
  async (payload: Props, thunkAPI) => {
    try {
      const result = await axiosInstance.put(`/task/${payload.id}/toggle`);
      return { data: result.data, sectionId: payload.sectionId };
    } catch (err: any) {
      const result: string | string[] = err.response.data.errors;
      return thunkAPI.rejectWithValue(result);
    }
  }
);

export default toggleActive;

