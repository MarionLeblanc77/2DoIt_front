import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../utils/axios";

const getTasks = createAsyncThunk("GET_TASKS", async () => {
  const result = await axiosInstance.get("/tasks");
  return result.data;
});

export default getTasks;
