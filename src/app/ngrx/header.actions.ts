import { createAction, props } from '@ngrx/store';

/** **************************************
 *  Update Header
 ***************************************/

export const updateHeader = createAction(
  '[Header] Update Header',
  props<{ updatedHeader: string }>()
);
