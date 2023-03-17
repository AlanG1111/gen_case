import { configureStore, combineReducers } from "@reduxjs/toolkit";

import getCoursesListSlice from "./courses/slice";
import getLessonSlice from "./lesson/slice";

const rootReducer = combineReducers({
  coursesList: getCoursesListSlice.reducer,
  lesson: getLessonSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
