import { createAsyncThunk } from "@reduxjs/toolkit";

import { axiosInstance } from "../../utils/axios";

interface Props {
  contactEmail: string;
}

const addContact = createAsyncThunk(
  "user/ADD_CONTACT",
  async (payload: Props, thunkAPI) => {
    try {
      const result = await axiosInstance.post(
        `/user/${payload.contactEmail}/contact`
      );
      return result.data;
    } catch (err: any) {
      const result: string | string[] = err.response.data.errors;
      return thunkAPI.rejectWithValue(result);
    }
  }
);

export default addContact;
