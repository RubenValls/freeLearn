import { createActionGroup, props } from "@ngrx/store";
import { Course } from "src/app/admins/admins-dashboard/pages/courses/interface/course";

export const CourseActions = createActionGroup({
    source: 'Course',
    events: {
      'Add Course': props<{ course: Course }>(),
      'Edit Course': props<{ course: Course }>(),
    },
  });