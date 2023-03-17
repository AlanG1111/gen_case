import { SingleLessonType } from "../../types/lesson";
import { LoadingResultsT } from "../../types/loading";
import { RootState } from "../store";

export const getLesson = (state: RootState): SingleLessonType | null =>
  state.lesson.lesson;

export const getLessonLoadingStatus = (state: RootState): LoadingResultsT =>
  state.lesson.loading;
