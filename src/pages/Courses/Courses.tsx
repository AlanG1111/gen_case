import React, { useEffect } from "react";
import { Container } from "@mui/material";
import { getAllCourses } from "../../redux/courses/selectors";
import { useAppSelector } from "../../hooks/useSelector";
import { useAppDispatch } from "../../hooks/useDispatch";
import { fetchAllCourses } from "../../redux/courses/thunks";
import { actions as coursesActions } from "../../redux/courses/slice";

const Courses: React.FC = () => {
  const dispatch = useAppDispatch();
  const coursesList = useAppSelector((state) => getAllCourses(state));

  useEffect(() => {
    dispatch(fetchAllCourses({}));
  }, []);

  return <Container>Courses</Container>;
};

export default Courses;
