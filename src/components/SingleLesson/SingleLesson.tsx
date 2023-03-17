import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  List,
  ListItem,
  ListItemText,
  Rating,
  Typography,
} from "@mui/material";
import { CourseFromListType } from "../../types/lesson";

interface ILesson {
  data?: CourseFromListType;
}

const SingleLesson: React.FC<ILesson> = ({ data }) => {
  const navigate = useNavigate();
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const handleLessonClick = () => {
    navigate(`${data?.id}`);
  };

  return (
    <>
      <Card
        sx={{
          maxWidth: "455px",
          margin: "50px auto",
          paddingBottom: "20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          transition: "box-shadow 0.3s ease-in-out",
          cursor: "pointer",
          "&:hover": {
            boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
          },
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleLessonClick}
      >
        <Box>
          <CardMedia
            sx={{ height: "170px" }}
            image={`${data?.previewImageLink}/cover.webp`}
            title={data?.title}
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
        <Box
          sx={{
            "& > legend": { mt: 2 },
          }}
        >
          <Typography component='legend'>{`Rating: ${data?.rating}`}</Typography>
          <Rating
            name='half-rating-read'
            defaultValue={data?.rating}
            precision={0.5}
            readOnly
          />
        </Box>
      </Card>
    </>
  );
};

export default SingleLesson;
