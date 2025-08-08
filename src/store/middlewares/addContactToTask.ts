import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../utils/axios";
import { RootState } from "../types";

interface Props {
  userId: number;
  taskId: number;
}

const addContactToTask = createAsyncThunk(
  "task/ADD_CONTACT_TO_TASK",
  async (payload: Props, thunkAPI) => {
    try {
      const result = await axiosInstance.post(
        `/task/${payload.taskId}/user/${payload.userId}`
      );
      const state = thunkAPI.getState() as RootState;

      const user = state.userReducer.connectedUser.contacts?.find(
        (contact) => contact.id === payload.userId
      );
      return { data: result.data, taskId: payload.taskId, user };
    } catch (err: any) {
      const result: string | string[] = err.response.data.errors;
      return thunkAPI.rejectWithValue(result);
    }
  }
);

export default addContactToTask;
