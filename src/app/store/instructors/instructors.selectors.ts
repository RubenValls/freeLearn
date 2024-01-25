import { createFeatureSelector } from "@ngrx/store";
import { Instructor } from "src/app/admins/admins-dashboard/pages/instructors/instructors";

export const selectInstructor = createFeatureSelector<ReadonlyArray<Instructor>>('instructors');