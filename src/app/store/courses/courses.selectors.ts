import { createFeatureSelector } from "@ngrx/store";
import { Course } from "src/app/admins/admins-dashboard/pages/courses/interface/course";

export const selectCourses = createFeatureSelector<ReadonlyArray<Course>>('courses');