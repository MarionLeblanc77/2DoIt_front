import { createReducer, createAction } from "@reduxjs/toolkit";
import { IUser } from "../../@types/user";
import login from "../middlewares/login";
import register from "../middlewares/register";

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
    firstName: "",
    lastName: "",
  },
};
export const actionChangeUserStateInfo = createAction<{
  newValue: string;
  fieldName: "lastName" | "firstName" | "email" | "password";
}>("user/CHANGE_USERINFO");

export const actionLogout = createAction("user/LOGOUT");

const userReducer = createReducer(userInitialState, (builder) => {
  builder
    .addCase(actionChangeUserStateInfo, (state, action) => {
      state.connectedUser[action.payload.fieldName] = action.payload.newValue;
    })
    .addCase(login.fulfilled, (state, action) => {
      console.log("Action login fullfilled");
      state.connectedUser.id = action.payload.id;
      state.connectedUser.firstName = action.payload.firstName;
      state.connectedUser.lastName = action.payload.lastName;
      state.connectedUser.password = "";
      state.logged = true;
    })
    .addCase(login.pending, () => {
      console.log("Action login pending");
    })
    .addCase(login.rejected, () => {
      console.log("Action login rejected");
    })
    .addCase(register.fulfilled, () => {
      console.log("Action register fullfilled");
    })
    .addCase(register.pending, () => {
      console.log("Action register pending");
    })
    .addCase(register.rejected, () => {
      console.log("Action register rejected");
    })
    .addCase(actionLogout, (state) => {
      state.logged = false;
      state.connectedUser.id = 0;
      state.connectedUser.email = "";
      state.connectedUser.password = "";
      state.connectedUser.firstName = "";
      state.connectedUser.lastName = "";
    });
});

export default userReducer;
