export type LessonFromCourseList = {
  containsLockedLessons: boolean;
  description: string;
  duration: number;
  id: string;
  launchDate: Date;
  lessonsCount: number;
  meta: {
    courseVideoPreview: {
      link: string;
      duration: number;
      previewImageLink: string;
    };
    skills: string[];
    slug: string;
  };
  previewImageLink: string;
  rating: number;
  status: string;
  tags: string[];
  title: string;
};

export type SingleLessonType = {
  id: string;
  title: string;
  tags: string[];
  launchDate: string;
  status: string;
  description: string;
  duration: number;
  previewImageLink: string;
  rating: number;
  meta: {
    slug: string;
    skills: string[];
    courseVideoPreview: {
      link: string;
      duration: number;
      previewImageLink: string;
    };
  };
  lessons: {
    id: string;
    title: string;
    duration: number;
    order: number;
    type: string;
    status: string;
    link: string;
    previewImageLink: string;
    meta: null;
  }[];
  containsLockedLessons: boolean;
};
