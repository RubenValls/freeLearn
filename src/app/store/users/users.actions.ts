import { createActionGroup, props } from "@ngrx/store";

export const UsersActions = createActionGroup({
    source: 'Users',
    events: {
      'Retrieved Users List': props<{ users: ReadonlyArray<any> }>(),
    },
  });