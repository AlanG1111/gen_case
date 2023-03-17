import { createSlice } from "@reduxjs/toolkit";
import { SingleCourseType } from "../../types/lesson";
import { LoadingResultsT } from "../../types/loading";

import { fetchLesson } from "./thunks";

interface ICoursesState {
  lesson: SingleCourseType | null;
  loading:
    | LoadingResultsT.IDLE
    | LoadingResultsT.PENDING
    | LoadingResultsT.SUCCEEDED
    | LoadingResultsT.FAILED;
  error?: string | null;
}

const initialState: ICoursesState = {
  lesson: null,
  loading: LoadingResultsT.IDLE,
  error: null,
};

const getLessonSlice = createSlice({
  name: "lesson",
  initialState,
  reducers: {
    resetLoading: (state) => {
      state.loading = LoadingResultsT.IDLE;
    },
    resetLesson: (state) => {
      state.lesson = null;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchLesson.pending, (state) => {
        state.loading = LoadingResultsT.PENDING;
      })
      .addCase(fetchLesson.fulfilled, (state, { payload }) => {
        state.loading = LoadingResultsT.SUCCEEDED;
        state.lesson = payload as SingleCourseType;
      })
      .addCase(fetchLesson.rejected, (state, { payload }) => {
        state.loading = LoadingResultsT.FAILED;
        state.error = payload as string;
      }),
});

export const { actions } = getLessonSlice;
export default getLessonSlice;
