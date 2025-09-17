import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../types";
import { axiosInstance } from "../../utils/axios";

const login = createAsyncThunk(
  "user/LOGIN",

  async (isRememberMe: boolean, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const { email, password } = state.userReducer.connectedUser;
    try {
      const result = await axiosInstance.post(
        "/login_check",
        {
          email,
          password,
          rememberMe: isRememberMe,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (isRememberMe) {
        localStorage.setItem("rememberMe", isRememberMe.toString());
      }
      return result.data.user;
    } catch (err: any) {
      const result: string | string[] = err.response.data.errors;
      return thunkAPI.rejectWithValue(result);
    }
  }
);

export default login;
