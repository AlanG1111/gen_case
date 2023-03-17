import { SingleLessonType } from "../../types/lesson";
import { LoadingResultsT } from "../../types/loading";
import { RootState } from "../store";

export const getAllCourses = (
  state: RootState
): SingleLessonType[] | undefined => state.coursesList.courses?.courses;

export const getAllCoursesLoadingStatus = (state: RootState): LoadingResultsT =>
  state.coursesList.loading;
