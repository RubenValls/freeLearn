import { createReducer, on } from "@ngrx/store";
import { Instructor } from "src/app/admins/admins-dashboard/pages/instructors/instructors";
import { InstructorsActions } from "./instructors.actions";


export const initialState: ReadonlyArray<Instructor> = [];

export const instructorsReducer = createReducer(
  initialState,
  on(InstructorsActions.retrievedInstructorsList, (_state, { instructors }) => instructors)
);