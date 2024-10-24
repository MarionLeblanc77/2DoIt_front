import { createReducer, createAction } from "@reduxjs/toolkit";
import { IUser } from "../../@types/user";

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
const myFirstActionCreator = createAction("FIRST_ACTION");

const userReducer = createReducer(userInitialState, (builder) => {
  builder.addCase(myFirstActionCreator, () => {
    // action
  });
});

export default userReducer;
