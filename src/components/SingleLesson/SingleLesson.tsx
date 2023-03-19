import React, { useEffect } from "react";
import Hls from "hls.js";
import { useNavigate } from "react-router-dom";
import {
  Box,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Rating,
  Typography,
} from "@mui/material";
import { CourseFromListType } from "../../types/lesson";
import { StyledCard } from "./styles";

interface ILesson {
  data: CourseFromListType;
}

const SingleLesson: React.FC<ILesson> = ({ data }) => {
  const navigate = useNavigate();
  const video = document.getElementById(data.id) as HTMLVideoElement;

  useEffect(() => {
    let hls: Hls | null = null;
    if (Hls.isSupported()) {
      hls = new Hls();
      hls.loadSource(`${data?.meta.courseVideoPreview?.link}`);
      hls.attachMedia(video);
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, [data?.meta.courseVideoPreview?.link, video]);

  const togglePlayVideo = (event: React.SyntheticEvent) => {
    event.stopPropagation();
    if (event.type === "mouseover" && video) {
      video.play();
    } else if (event.type === "mouseleave" && video) {
      video.pause();
    }
  };

  const handleLessonClick = () => {
    navigate(`${data?.id}`);
  };

  return (
    <>
      <StyledCard
        onMouseOver={togglePlayVideo}
        onMouseLeave={togglePlayVideo}
        onClick={handleLessonClick}
      >
        <Box>
          <video
            id={data.id}
            muted
            width='100%'
            poster={`${data?.previewImageLink}/cover.webp`}
          />
          <CardContent>
            <Typography gutterBottom variant='h5' component='div'>
              {data?.title}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              {data?.description}
            </Typography>
          </CardContent>
          <List>
            <ListItem>
              <ListItemText primary='Skills you gain:' />
            </ListItem>
            {data?.meta.skills?.map((skill, index) => (
              <ListItem key={index} sx={{ paddingTop: "0" }}>
                <ListItemText secondary={skill} />
              </ListItem>
            ))}
            <ListItem>
              <ListItemText
                sx={{ textDecoration: "underline" }}
                primary={`Includes ${data?.lessonsCount} lessons`}
              />
            </ListItem>
          </List>
        </Box>
        <Box>
          <Typography
            sx={{ mt: 2 }}
            component='legend'
          >{`Rating: ${data?.rating}`}</Typography>
          <Rating
            name='half-rating-read'
            defaultValue={data?.rating}
            precision={0.5}
            readOnly
          />
        </Box>
      </StyledCard>
    </>
  );
};

export default SingleLesson;
