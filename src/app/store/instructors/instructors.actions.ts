import { createActionGroup, props } from "@ngrx/store";
import { Course } from "src/app/admins/admins-dashboard/pages/courses/interface/course";
import { Instructor } from "src/app/admins/admins-dashboard/pages/instructors/instructors";

export const InstructorsActions = createActionGroup({
    source: 'Intructors',
    events: {
      'Retrieved Instructors List': props<{ instructors: ReadonlyArray<Instructor> }>(),
    },
  });