import { createFeatureSelector, createReducer, on } from "@ngrx/store";
import { UserActions } from "./user.actions";

export const selectUser = createFeatureSelector<any>('user');

export const initialState: any = {};

export const userReducer = createReducer(
    initialState,
    on(UserActions.addUser, (_state, { user }) => user)
  );