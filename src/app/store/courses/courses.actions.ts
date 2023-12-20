import { createActionGroup, props } from "@ngrx/store";
import { Course } from "src/app/admins/admins-dashboard/pages/courses/interface/course";

export const CoursesActions = createActionGroup({
    source: 'Courses',
    events: {
      'Retrieved Courses List': props<{ courses: ReadonlyArray<Course> }>(),
    },
  });