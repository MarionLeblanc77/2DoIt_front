import { createAsyncThunk } from "@reduxjs/toolkit";import type { RootState } from "../store";
import { axiosInstance, addTokenToAxiosInstance } from "../../utils/axios";

const login = createAsyncThunk(
  "user/LOGIN",

  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const { email, password } = state.userReducer.connectedUser;
    try {
      const result = await axiosInstance.post("/login", {
        email,
        password,
      });
      addTokenToAxiosInstance(result.data.token);

      const result2 = await axiosInstance.post("/login_check", {
        email,
        password,
      });
      return result.data.user;
    } catch (err: any) {
      const result: string | string[] = err.response.data.errors;
      return thunkAPI.rejectWithValue(result);
    }
  }
);

export default login;
