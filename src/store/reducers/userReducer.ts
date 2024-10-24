import { createReducer, createAction } from "@reduxjs/toolkit";
import { IUser } from "../../@types/user";
import login from "../middlewares/login";

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

const userReducer = createReducer(userInitialState, (builder) => {
  builder
    .addCase(actionChangeUserStateInfo, (state, action) => {
      state.connectedUser[action.payload.fieldName] = action.payload.newValue;
    })
    .addCase(login.fulfilled, (state, action) => {
      console.log("Action login fullfilled");
      state.connectedUser.id = action.payload.id;
      state.connectedUser.first_name = action.payload.first_name;
      state.connectedUser.last_name = action.payload.last_name;
      state.connectedUser.password = "";
      state.logged = true;
    })
    .addCase(login.pending, () => {
      console.log("Action login pending");
    })
    .addCase(login.rejected, () => {
      console.log("Action login rejected");
    });
});

export default userReducer;
