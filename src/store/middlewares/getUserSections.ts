import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../utils/axios";

const getUserSections = createAsyncThunk(
  "task/GET_USER_SECTIONS",
  async (_, thunkAPI) => {
    try {
      const result = await axiosInstance.get("/usersections");
      return result.data;
    } catch (err: any) {
      const result: string | string[] = err.response.data.errors;
      return thunkAPI.rejectWithValue(result);
    }
  }
);

export default getUserSections;

