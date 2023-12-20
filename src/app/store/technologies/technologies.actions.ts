import { createActionGroup, props } from "@ngrx/store";
import { TechnologyType } from "src/app/admins/admins-dashboard/pages/technologies/types/technologies";

export const TechnologiesActions = createActionGroup({
    source: 'Technologies',
    events: {
      'Retrieved Technologies List': props<{ technologies: ReadonlyArray<TechnologyType> }>(),
    },
  });