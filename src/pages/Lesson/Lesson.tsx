import React, { useEffect } from "react";
import { Container } from "@mui/material";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../hooks/useDispatch";
import { useAppSelector } from "../../hooks/useSelector";
import {
  getLesson,
  getLessonLoadingStatus,
} from "../../redux/lesson/selectors";
import { fetchLesson } from "../../redux/lesson/thunks";
import { actions as lessonActions } from "../../redux/lesson/slice";

const Lesson: React.FC = () => {
  const { lessonId } = useParams();
  const dispatch = useAppDispatch();
  const lessonInfo = useAppSelector((state) => getLesson(state));
  const loadingStatus = useAppSelector((state) =>
    getLessonLoadingStatus(state)
  );

  useEffect(() => {
    if (lessonId) {
      dispatch(fetchLesson(Number(lessonId)));
    }
    return () => {
      dispatch(lessonActions.resetLesson());
    };
  }, [dispatch]);
  return <Container>{lessonId}</Container>;
};

export default Lesson;
