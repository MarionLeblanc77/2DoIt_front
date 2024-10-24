import { createAsyncThunk } from "@reduxjs/toolkit";
// import type { RootState } from "../store";
import { axiosInstance } from "../../utils/axios";
// import { actionChangeUserStateInfo } from "../reducers/userReducer";

const googleLogin = createAsyncThunk(
  "user/GOOGLE_LOGIN",

  async (newValue: string, thunkAPI) => {
    console.log(newValue);
    // try {
    //   await thunkAPI.dispatch(
    //     actionChangeUserStateInfo({ newValue, fieldName: "email" })
    //   );
    // } catch (error) {
    //   console.log(error);
    // }
    // const state = thunkAPI.getState() as RootState;
    // const { email } = state.userReducer.connectedUser;
    try {
      const result = await axiosInstance.post("/googleLogin", {
        email: newValue,
      });
      return result.data.user;
    } catch (err: any) {
      const result: string | string[] = err.response.data.errors;
      return thunkAPI.rejectWithValue(result);
    }
  }
);

export default googleLogin;
