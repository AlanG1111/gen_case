import React, { useEffect } from "react";
import { Container } from "@mui/material";
import { getAllCourses } from "../../redux/courses/selectors";
import { useAppSelector } from "../../hooks/useSelector";
import { useAppDispatch } from "../../hooks/useDispatch";
import { fetchAllCourses } from "../../redux/courses/thunks";
import { actions as coursesActions } from "../../redux/courses/slice";
import SingleLesson from "../../components/SingleLesson/SingleLesson";
import { SingleLessonType } from "../../types/lesson";

const Courses: React.FC = () => {
  const dispatch = useAppDispatch();
  const coursesList = useAppSelector((state) => getAllCourses(state));

  useEffect(() => {
    dispatch(fetchAllCourses());
    return () => {
      dispatch(coursesActions.resetCourses());
    };
  }, [dispatch]);

  return (
    <Container sx={{ display: "flex", flexWrap: "wrap" }}>
      {coursesList &&
        coursesList.courses.map((lesson: SingleLessonType) => (
          <SingleLesson key={lesson.id} data={lesson} />
        ))}
    </Container>
  );
};

export default Courses;
