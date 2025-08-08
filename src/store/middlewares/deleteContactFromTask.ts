import { createAsyncThunk } from "@reduxjs/toolkit";

import { axiosInstance } from "../../utils/axios";

interface Props {
  userId: number;
  taskId: number;
}

const deleteContactFromTask = createAsyncThunk(
  "task/DELETE_CONTACT_FROM_TASK",
  async (payload: Props, thunkAPI) => {
    try {
      const result = await axiosInstance.delete(
        `/task/${payload.taskId}/user/${payload.userId}`
      );
      return { data: result.data, ids: payload };
    } catch (err: any) {
      const result: string | string[] = err.response.data.errors;
      return thunkAPI.rejectWithValue(result);
    }
  }
);

export default deleteContactFromTask;
