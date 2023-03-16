import { createSlice } from "@reduxjs/toolkit";
import { SingleLessonType } from "../../types/lesson";
import { LoadingResultsT } from "../../types/loading";

import { fetchAllCourses } from "./thunks";

interface IPayloadCourses {
  courses: SingleLessonType[];
}

interface ICoursesState {
  courses: IPayloadCourses | null;
  loading:
    | LoadingResultsT.IDLE
    | LoadingResultsT.PENDING
    | LoadingResultsT.SUCCEEDED
    | LoadingResultsT.FAILED;
  error?: string | null;
}

const initialState: ICoursesState = {
  courses: null,
  loading: LoadingResultsT.IDLE,
  error: null,
};

const getCoursesListSlice = createSlice({
  name: "coursesList",
  initialState,
  reducers: {
    resetLoading: (state) => {
      state.loading = LoadingResultsT.IDLE;
    },
    resetCourses: (state) => {
      state.courses = null;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchAllCourses.pending, (state) => {
        state.loading = LoadingResultsT.PENDING;
      })
      .addCase(fetchAllCourses.fulfilled, (state, { payload }) => {
        state.loading = LoadingResultsT.SUCCEEDED;
        state.courses = payload as IPayloadCourses;
      })
      .addCase(fetchAllCourses.rejected, (state, { payload }) => {
        state.loading = LoadingResultsT.FAILED;
        state.error = payload as string;
      }),
});

export const { actions } = getCoursesListSlice;
export default getCoursesListSlice;
