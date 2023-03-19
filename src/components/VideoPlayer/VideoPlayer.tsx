import React, { useEffect } from "react";
import Hls from "hls.js";
import { LessonFromCourse } from "../../types/lesson";
import { LocalStorage } from "../../helpers/LocalStorage";

interface IProps {
  lesson: LessonFromCourse;
}

const VideoPlayer: React.FC<IProps> = ({ lesson }) => {
  useEffect(() => {
    const video = document.getElementById(lesson?.id) as HTMLVideoElement;
    const currentTime = LocalStorage.getVideoProgress(lesson?.id);
    let hls: Hls | null = null;

    if (Hls.isSupported() && video) {
      hls = new Hls();
      hls.loadSource(`${lesson?.link}`);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, function () {
        video.play();
      });
    }

    //Set time to video
    if (video && currentTime) {
      video.currentTime = Number(currentTime);
    }

    return () => {
      LocalStorage.setVideoProgress(lesson.id, video.currentTime);
      if (hls) {
        hls.destroy();
      }
    };
  }, [lesson]);

  return (
    <video
      id={lesson.id}
      controls
      muted
      width='100%'
      poster={`${lesson.previewImageLink}/cover.webp`}
      src={`${lesson?.link}`}
    />
  );
};

export default VideoPlayer;
