export type SingleLessonType = {
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
