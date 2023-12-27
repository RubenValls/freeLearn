import { createActionGroup, props } from "@ngrx/store";
import { User } from "src/app/login/types/user";

export const UsersActions = createActionGroup({
    source: 'Users',
    events: {
      'Retrieved Users List': props<{ users: ReadonlyArray<User> }>(),
    },
  });