import { createReducer, on } from "@ngrx/store";
import { UserActions } from "./user.actions";

export const initialState: any = {};

export const userReducer = createReducer(
    initialState,
    on(UserActions.addUser, (_state, { user }) => user),
    on(UserActions.updateUser, (_state, { user }) => user),
);