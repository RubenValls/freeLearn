import { createReducer, on } from "@ngrx/store";
import { Course } from "src/app/admins/admins-dashboard/pages/courses/interface/course";
import { CoursesActions } from "./courses.actions";

export const initialState: ReadonlyArray<Course> = [];

export const coursesReducer = createReducer(
  initialState,
  on(CoursesActions.retrievedCoursesList, (_state, { courses }) => courses)
);