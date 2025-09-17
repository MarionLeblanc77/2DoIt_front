import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../utils/axios";

const logout = createAsyncThunk(
  "user/LOGOUT",

  async (_, thunkAPI) => {
    try {
      const result = await axiosInstance.post("/logout");
      return result;
    } catch (err: any) {
      const result: string | string[] = err.response.data.errors;
      return thunkAPI.rejectWithValue(result);
    }
  }
);

export default logout;

