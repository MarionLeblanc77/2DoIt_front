import { createAsyncThunk } from "@reduxjs/toolkit";

import { axiosInstance } from "../../utils/axios";

interface Props {
  newPositions: { id: number; position: number }[];
}

const updateSectionsPositions = createAsyncThunk(
  "task/UPDATE_SECTIONS_POSITIONS",
  async (payload: Props, thunkAPI) => {
    try {
      const result = await axiosInstance.put(
        `/sections/positions`,
        payload.newPositions
      );
      return result.data;
    } catch (err: any) {
      const result: string | string[] = err.response.data.errors;
      return thunkAPI.rejectWithValue(result);
    }
  }
);

export default updateSectionsPositions;

