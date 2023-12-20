import { createReducer, on } from "@ngrx/store";
import { TechnologyType } from "src/app/admins/admins-dashboard/pages/technologies/types/technologies";
import { TechnologiesActions } from "./technologies.actions";

export const initialState: ReadonlyArray<TechnologyType> = [];

export const technologiesReducer = createReducer(
  initialState,
  on(TechnologiesActions.retrievedTechnologiesList, (_state, { technologies }) => technologies)
);