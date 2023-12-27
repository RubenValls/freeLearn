import { createFeatureSelector } from "@ngrx/store";
import { User } from "src/app/login/types/user";

export const selectUsers = createFeatureSelector<ReadonlyArray<User>>('users');