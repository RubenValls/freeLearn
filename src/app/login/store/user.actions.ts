import { createActionGroup, props } from "@ngrx/store";

export const UserActions = createActionGroup({
    source: 'User',
    events: {
        'Add User': props<{user: any}>(),
        'Update User': props<{user: any}>(),
        'Delete User': props<{user: any}>(),
    }
});