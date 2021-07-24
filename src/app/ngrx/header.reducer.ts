import { createReducer, on } from '@ngrx/store';
import { updateHeader } from './header.actions';

export const headerFeatureKey = 'headerState';
export interface IHeaderInitialState {
  header: string;
}
export const headerInitialState: IHeaderInitialState = {
  header: 'Final Project',
};

export const reducer = createReducer(
  headerInitialState,
  //Update Header
  on(updateHeader, (state, action) => {
    return { ...state, header: action.updatedHeader };
  })
);
