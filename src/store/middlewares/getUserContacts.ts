import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../utils/axios";

const getUserContacts = createAsyncThunk(
  "user/GET_USER_CONTACTS",
  async (_, thunkAPI) => {
    try {
      const result = await axiosInstance.get("/user/contacts");
      return result.data;
    } catch (err: any) {
      const result: string | string[] = err.response.data.errors;
      return thunkAPI.rejectWithValue(result);
    }
  }
);

export default getUserContacts;
