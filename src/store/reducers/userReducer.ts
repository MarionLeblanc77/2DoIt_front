import { createReducer, createAction } from "@reduxjs/toolkit";
import { IUser } from "../../@types/user";
import login from "../middlewares/login";
import register from "../middlewares/register";
import getUserContacts from "../middlewares/getUserContacts";
import addContact from "../middlewares/addContact";
import deleteContact from "../middlewares/deleteContact";

interface IUserState {
  logged: boolean;
  connectedUser: IUser;
  messages: string[];
}

export const userInitialState: IUserState = {
  logged: false,
  connectedUser: {
    id: 0,
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    contacts: [],
  },
  messages: [],
};
export const actionChangeUserStateInfo = createAction<{
  newValue: string;
  fieldName: "lastName" | "firstName" | "email" | "password";
}>("user/CHANGE_USERINFO");
export const actionEmptyMessages = createAction("user/EMPTY_MESSAGES");
export const actionLogout = createAction("user/LOGOUT");

const userReducer = createReducer(userInitialState, (builder) => {
  builder
    .addCase(actionChangeUserStateInfo, (state, action) => {
      state.connectedUser[action.payload.fieldName] = action.payload.newValue;
    })
    .addCase(actionEmptyMessages, (state) => {
      state.messages = [];
    })
    .addCase(register.fulfilled, () => {})
    .addCase(register.pending, (state) => {
      state.messages = [];
    })
    .addCase(register.rejected, (state, action) => {
      if (action.payload) {
        if (typeof action.payload === "string") {
          state.messages.push(action.payload);
        } else {
          state.messages.push(...(action.payload as string[]));
        }
      } else {
        state.messages.push("Sorry, something went wrong.");
      }
    })
    .addCase(login.fulfilled, (state, action) => {
      state.connectedUser.id = action.payload.id;
      state.connectedUser.email = action.payload.email;
      state.connectedUser.firstName = action.payload.firstName;
      state.connectedUser.lastName = action.payload.lastName;
      state.connectedUser.password = "";
      state.logged = true;
    })
    .addCase(login.pending, (state) => {
      state.messages = [];
    })
    .addCase(login.rejected, (state, action) => {
      if (action.payload) {
        state.messages.push(action.payload as string);
      } else {
        state.messages.push("Sorry, something went wrong.");
      }
    })
    .addCase(getUserContacts.fulfilled, (state, action) => {
      state.connectedUser.contacts = action.payload;
    })
    .addCase(getUserContacts.pending, () => {})
    .addCase(getUserContacts.rejected, () => {})
    .addCase(addContact.fulfilled, (state, action) => {
      state.connectedUser.contacts = action.payload.userContacts;
    })
    .addCase(addContact.pending, () => {})
    .addCase(addContact.rejected, () => {})
    .addCase(deleteContact.fulfilled, (state, action) => {
      state.connectedUser.contacts = state.connectedUser.contacts?.filter(
        (contact) => contact.id !== action.payload.id
      );
    })
    .addCase(deleteContact.pending, () => {})
    .addCase(deleteContact.rejected, () => {})
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
