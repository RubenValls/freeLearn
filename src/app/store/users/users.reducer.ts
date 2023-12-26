import { createReducer, on } from "@ngrx/store";

import { UsersActions } from "./users.actions";

export const initialState: ReadonlyArray<any> = [];

export const usersReducer = createReducer(
  initialState,
  on(UsersActions.retrievedUsersList, (_state, { users }) => users)
);