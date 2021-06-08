import { createReducer, on } from '@ngrx/store';
import { loadUser } from './load.user.actions';
import { adapter, initialState } from '../loadUsers/load.users.reducer';

export const reducer = createReducer(
  initialState,
  on(loadUser.success, (state, action) =>
    adapter.addOne(action.selectedUser, state)
  ),
  on(loadUser.failure, (state, action) => {
    return {
      ...state,
      error: action.error,
    };
  })
);

export const { selectIds, selectEntities, selectAll, selectTotal } =
  adapter.getSelectors();
