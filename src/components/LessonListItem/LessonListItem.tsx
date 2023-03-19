import React, { useState } from "react";
import { ListItem, ListItemButton, ListItemText } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

import { LessonFromCourse } from "../../types/lesson";
import VideoPlayer from "../VideoPlayer/VideoPlayer";

interface IProps {
  lesson: LessonFromCourse;
  index: number;
}

const LessonListItem: React.FC<IProps> = ({ lesson, index }) => {
  // Always show 1st lesson
  const is1stVideoUnlocked = () => index === 0 && lesson.status !== "locked";
  const [isShowVideo, setIsShowVideo] = useState(is1stVideoUnlocked());

  return (
    <>
      <ListItem
        sx={{
          paddingTop: "0",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <ListItemButton
          onClick={() => setIsShowVideo(!isShowVideo)}
          disabled={lesson.status === "locked"}
        >
          <ListItemText secondary={lesson.title} />
        </ListItemButton>
        <AnimatePresence>
          {isShowVideo && (
            <motion.div
              initial={{ height: "0px", width: "100%" }}
              animate={{ height: "auto" }}
              exit={{ height: "0px" }}
              style={{ overflow: "hidden" }}
              transition={{ duration: 0.25, ease: "easeIn" }}
            >
              <VideoPlayer lesson={lesson} />
            </motion.div>
          )}
        </AnimatePresence>
      </ListItem>
    </>
  );
};

export default LessonListItem;
