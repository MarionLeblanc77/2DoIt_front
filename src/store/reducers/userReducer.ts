import { createAction, createReducer } from "@reduxjs/toolkit";
import { IUser } from "../../@types/user";
import googleLogin from "../middlewares/googleLogin";
import { addTokenToAxiosInstance } from "../../utils/axios";

interface IUserState {
  logged: boolean;
  connectedUser: IUser;
}

export const userInitialState: IUserState = {
  logged: false,
  connectedUser: {
    id: 0,
    email: "",
    password: "",
    first_name: "",
    last_name: "",
  },
};

export const actionChangeUserStateInfo = createAction<{
  newValue: string;
  fieldName: "last_name" | "first_name" | "email" | "password";
}>("user/CHANGE_USERINFO");

export const actionGoogleLogin = createAction<{
  jwt: string;
}>("user/LOGIN_GOOGLE");

const userReducer = createReducer(userInitialState, (builder) => {
  builder
    .addCase(actionChangeUserStateInfo, (state, action) => {
      state.connectedUser[action.payload.fieldName] = action.payload.newValue;
    })
    .addCase(actionGoogleLogin, (state, action) => {
      addTokenToAxiosInstance(action.payload.jwt);
      state.logged = true;
    });
  // .addCase(googleLogin.fulfilled, (state, action) => {
  //   console.log("googleLogin fulfilled");
  //   state.connectedUser.id = action.payload.id;
  //   state.connectedUser.first_name = action.payload.first_name;
  //   state.connectedUser.last_name = action.payload.last_name;
  //   state.logged = true;
  // })
  // .addCase(googleLogin.pending, () => {
  //   console.log("googleLogin pending");
  // })
  // .addCase(googleLogin.rejected, () => {
  //   console.log("googleLogin rejected");
  // });
});

export default userReducer;
