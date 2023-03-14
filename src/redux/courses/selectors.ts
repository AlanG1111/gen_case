import { RootState } from "../store";

export const getAllCourses = (state: RootState): any =>
  state.coursesList.courses;
