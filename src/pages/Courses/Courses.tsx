import React, { useEffect, useMemo, useState } from "react";
import {
  Container,
  Stack,
  Pagination,
  Box,
  CircularProgress,
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

const Courses: React.FC = (props) => {
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "50px",
            }}
          >
            <CircularProgress />
          </Box>
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
