import { createFeatureSelector } from "@ngrx/store";

export const selectUsers = createFeatureSelector<ReadonlyArray<any>>('users');