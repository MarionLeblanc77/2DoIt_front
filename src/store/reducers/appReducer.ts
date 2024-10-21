import { createReducer, createAction } from "@reduxjs/toolkit";

interface IAppState {
  content: string;
}

export const appInitialState: IAppState = {
  content: "",
};
const myFirstActionCreator = createAction("FIRST_ACTION");

const appReducer = createReducer(appInitialState, (builder) => {
  builder.addCase(myFirstActionCreator, () => {
    // action
  });
});

export default appReducer;
