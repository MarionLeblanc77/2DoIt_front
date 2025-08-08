import { createAsyncThunk } from "@reduxjs/toolkit";

import { axiosInstance } from "../../utils/axios";

interface Props {
  id: number;
}

const deleteContact = createAsyncThunk(
  "user/DELETE_CONTACT",
  async (payload: Props, thunkAPI) => {
    try {
      const result = await axiosInstance.delete(`/user/${payload.id}/contacts`);
      return { data: result.data, id: payload.id };
    } catch (err: any) {
      const result: string | string[] = err.response.data.errors;
      return thunkAPI.rejectWithValue(result);
    }
  }
);

export default deleteContact;
