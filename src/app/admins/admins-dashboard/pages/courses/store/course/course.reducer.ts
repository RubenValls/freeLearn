import { createReducer, on } from "@ngrx/store";
import { Course } from "src/app/admins/admins-dashboard/pages/courses/interface/course";
import { CourseActions } from "./course.actions";

export const initialState: Course = {
    name: "",
    description: "",
    instructorId: [],
    imageUrl: "",
    techs: [],
    lessons: [],
    rating: [],
    introductionURL: ""
};

export const courseReducer = createReducer(
  initialState,
  on(CourseActions.addCourse, (_state, { course }) => course),
  on(CourseActions.editCourse, (_state, { course }) => course)
);