import { createReducer, on } from "@ngrx/store";

import { UsersActions } from "./users.actions";
import { User } from "src/app/login/types/user";

export const initialState: ReadonlyArray<User> = [];

export const usersReducer = createReducer(
  initialState,
  on(UsersActions.retrievedUsersList, (_state, { users }) => users)
);