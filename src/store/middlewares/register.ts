import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../types";
import { axiosInstance } from "../../utils/axios";
import login from "./login";

const register = createAsyncThunk(
  "user/REGISTER",
  async (isRememberMe: boolean, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const { email, password, firstName, lastName } =
      state.userReducer.connectedUser;
    try {
      await axiosInstance.post("/register", {
        email,
        password,
        firstName,
        lastName,
      });
      return await thunkAPI.dispatch(login(isRememberMe));
    } catch (err: any) {
      const result: string | string[] = err.response.data.errors;
      return thunkAPI.rejectWithValue(result);
    }
  }
);
export default register;
