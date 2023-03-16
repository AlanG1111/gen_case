import React, { useState } from "react";
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
import { SingleLessonType } from "../../types/lesson";

interface ILesson {
  data?: SingleLessonType;
}

const SingleLesson: React.FC<ILesson> = ({ data }) => {
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };
  return (
    <>
      <Card
        sx={{
          maxWidth: 335,
          margin: "50px auto",
          paddingBottom: "20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Box>
          {" "}
          <CardMedia
            sx={{ height: 190 }}
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
