import { createFeatureSelector } from "@ngrx/store";
import { Course } from "src/app/admins/admins-dashboard/pages/courses/interface/course";
import { Instructor } from "src/app/admins/admins-dashboard/pages/instructors/instructors";

export const selectInstructor = createFeatureSelector<ReadonlyArray<Instructor>>('instructor');