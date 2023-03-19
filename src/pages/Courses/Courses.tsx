import React, { useEffect, useMemo, useState } from "react";
import {
  Container,
  Stack,
  Pagination,
  CircularProgress,
  Alert,
  AlertTitle,
} from "@mui/material";
import SingleLesson from "../../components/SingleLesson/SingleLesson";

import {
  getAllCourses,
  getAllCoursesLoadingStatus,
} from "../../redux/courses/selectors";
import { useAppSelector } from "../../hooks/useSelector";
import { useAppDispatch } from "../../hooks/useDispatch";
import { fetchAllCourses } from "../../redux/courses/thunks";
import { actions as coursesActions } from "../../redux/courses/slice";

import { CourseFromListType } from "../../types/lesson";
import { LoadingResultsT } from "../../types/loading";
import { StyledBox } from "./styles";

const Courses: React.FC = () => {
  const dispatch = useAppDispatch();
  const coursesList = useAppSelector((state) => getAllCourses(state));
  const loadingStatus = useAppSelector((state) =>
    getAllCoursesLoadingStatus(state)
  );
  const [currentPageNumber, setCurrentPageNumber] = useState<number>(1);
  const coursesListLength = Number(coursesList?.length);
  const totalPageCount = Math.ceil(coursesListLength / 10);

  useEffect(() => {
    dispatch(fetchAllCourses());
    return () => {
      dispatch(coursesActions.resetCourses());
    };
  }, [dispatch]);

  const allCurses = useMemo(() => {
    if (coursesList) {
      const lastPageIndex = currentPageNumber * 10;
      const firstPageIndex = lastPageIndex - 10;

      return coursesList.slice(firstPageIndex, lastPageIndex);
    }

    return [];
  }, [currentPageNumber, coursesList]);

  const onPageChange = (pageNumber: number) => {
    setCurrentPageNumber(pageNumber);
  };

  return (
    <>
      <Stack spacing={2}>
        {loadingStatus === LoadingResultsT.PENDING && (
          <StyledBox>
            <CircularProgress />
          </StyledBox>
        )}
        {loadingStatus === LoadingResultsT.FAILED && (
          <Alert severity='error'>
            <AlertTitle>Error</AlertTitle>
            Something went wrong, please, try again later!
          </Alert>
        )}
        {!!coursesListLength && (
          <Pagination
            count={totalPageCount}
            page={currentPageNumber}
            onChange={(_, num) => onPageChange(num)}
            sx={{ margin: "20px auto" }}
          />
        )}
        <Container sx={{ display: "flex", flexWrap: "wrap" }}>
          {allCurses &&
            allCurses?.map((lesson: CourseFromListType) => (
              <SingleLesson key={lesson.id} data={lesson} />
            ))}
        </Container>
      </Stack>
    </>
  );
};

export default Courses;
