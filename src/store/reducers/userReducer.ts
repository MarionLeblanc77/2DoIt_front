import { createReducer, createAction } from "@reduxjs/toolkit";

interface IUserState {
  content: string;
}

export const userInitialState: IUserState = {
  content: "",
};
const myFirstActionCreator = createAction("FIRST_ACTION");

const userReducer = createReducer(userInitialState, (builder) => {
  builder.addCase(myFirstActionCreator, () => {
    // action
  });
});

export default userReducer;
