import React, { useState, useEffect } from "react";
import { ListItem, ListItemButton, ListItemText } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import Hls from "hls.js";

import { LessonFromCourse } from "../../types/lesson";

interface IProps {
  lesson: LessonFromCourse;
}

const LessonListItem: React.FC<IProps> = ({ lesson }) => {
  const [isShowVideo, setIsShowVideo] = useState(false);

  useEffect(() => {
    let hls: any = null;
    if (Hls.isSupported()) {
      const video = document.getElementById(lesson?.id) as HTMLVideoElement;
      console.log(video?.playbackRate);
      hls = new Hls();
      hls.loadSource(`${lesson?.link}`);
      hls.attachMedia(video);
      hls.on(Hls.Events.MEDIA_ATTACHED, function () {
        console.log("video and hls.js are now bound together !");
      });
      hls.on(Hls.Events.MANIFEST_PARSED, function () {
        video?.play();
      });

      // bind them together
      hls.attachMedia(video);
    }

    return () => {
      hls?.destroy();
    };
  }, [lesson?.id, lesson?.link, isShowVideo]);

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
              <video
                id={lesson.id}
                controls
                muted
                width='100%'
                poster={`${lesson.previewImageLink}/cover.webp`}
                src={`${lesson?.link}`}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </ListItem>
    </>
  );
};

export default LessonListItem;
