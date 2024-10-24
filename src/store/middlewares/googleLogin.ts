import { createAsyncThunk } from "@reduxjs/toolkit";
// import type { RootState } from "../store";
import { addTokenToAxiosInstance, axiosInstance } from "../../utils/axios";
// import { actionChangeUserStateInfo } from "../reducers/userReducer";

const googleLogin = createAsyncThunk(
  "user/GOOGLE_LOGIN",

  async (jwt: string, thunkAPI) => {
    try {
      addTokenToAxiosInstance(jwt);
    } catch (err: any) {
      const result: string | string[] = err.response.data.errors;
      return thunkAPI.rejectWithValue(result);
    }
  }
);

export default googleLogin;
