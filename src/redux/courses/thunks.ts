import { createAsyncThunk } from "@reduxjs/toolkit";
import ApiService from "../middleware/api";
import { API_CONFIG } from "../middleware/config";

export const fetchAllCourses = createAsyncThunk(
  "courses/fetchAllCourses",
  async (requestData: any, { rejectWithValue }) => {
    try {
      const { data } = await ApiService.apiCall({
        baseURL: API_CONFIG.BASE_URL,
        endpoint: "/preview-courses",
        method: "GET",
        headers: {},
        query: requestData,
      });
      console.log(data, "data");
      return data;
    } catch (error) {
      const errorT = error as string;
      return rejectWithValue(errorT);
    }
  }
);
