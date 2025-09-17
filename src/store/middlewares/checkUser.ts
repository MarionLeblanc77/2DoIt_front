import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../utils/axios";

const checkUser = createAsyncThunk(
  "user/CHECK",

  async (_, thunkAPI) => {
    try {
      const result = await axiosInstance.get("/user_check");
      return result.data.user;
    } catch (err: any) {
      const result: string | string[] = err.response.data.errors;
      return thunkAPI.rejectWithValue(result);
    }
  }
);

export default checkUser;

