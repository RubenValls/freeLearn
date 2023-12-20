import { createFeatureSelector } from "@ngrx/store";
import { TechnologyType } from "src/app/admins/admins-dashboard/pages/technologies/types/technologies";

export const selectTechnologies = createFeatureSelector<ReadonlyArray<TechnologyType>>('technologies');