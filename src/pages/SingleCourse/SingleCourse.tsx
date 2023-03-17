import React, { useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Container,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../hooks/useDispatch";
import { useAppSelector } from "../../hooks/useSelector";
import {
  getLesson,
  getLessonLoadingStatus,
} from "../../redux/lesson/selectors";
import { fetchLesson } from "../../redux/lesson/thunks";
import { actions as lessonActions } from "../../redux/lesson/slice";
import { LoadingResultsT } from "../../types/loading";
import { LessonFromCourse } from "../../types/lesson";
import LessonListItem from "../../components/LessonListItem/LessonListItem";

const SingleCourse: React.FC = () => {
  const { lessonId } = useParams();
  const dispatch = useAppDispatch();
  const courseInfo = useAppSelector((state) => getLesson(state));
  const loadingStatus = useAppSelector((state) =>
    getLessonLoadingStatus(state)
  );

  useEffect(() => {
    if (lessonId) {
      dispatch(fetchLesson(lessonId));
    }
    return () => {
      dispatch(lessonActions.resetLesson());
    };
  }, [dispatch, lessonId]);

  return (
    <Container>
      {loadingStatus === LoadingResultsT.PENDING && !courseInfo && (
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
      {courseInfo && (
        <Card
          sx={{
            maxWidth: "455px",
            margin: "50px auto",
            paddingBottom: "20px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <CardContent>
              <Typography gutterBottom variant='h5' component='div'>
                {courseInfo?.title}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                {courseInfo?.description}
              </Typography>
            </CardContent>
            <CardMedia
              sx={{ height: "170px" }}
              image={`${courseInfo?.previewImageLink}/cover.webp`}
              title={courseInfo?.title}
            />
            <List>
              <ListItem>
                <ListItemText primary='Lessons:' />
              </ListItem>
              {courseInfo?.lessons?.map((lesson: LessonFromCourse) => (
                <LessonListItem key={lesson.id} lesson={lesson} />
              ))}
            </List>
          </Box>
        </Card>
      )}
    </Container>
  );
};

export default SingleCourse;
