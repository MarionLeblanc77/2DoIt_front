import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../utils/axios";

const getSection = createAsyncThunk(
  "task/GET_SECTION",
  async (sectionId: number, thunkAPI) => {
    try {
      const result = await axiosInstance.get("/section/{sectionId}");
      return result.data;
    } catch (err: any) {
      const result: string | string[] = err.response.data.errors;
      return thunkAPI.rejectWithValue(result);
    }
  }
);

export default getSection;
