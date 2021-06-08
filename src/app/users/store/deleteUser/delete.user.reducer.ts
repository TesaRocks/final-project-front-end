import { createReducer, on } from '@ngrx/store';
import { adapter, initialState } from '../loadUsers/load.users.reducer';
import { deleteUser } from './delete.user.actions';

export const reducer = createReducer(
  initialState,
  on(deleteUser.success, (state, action) =>
    adapter.removeOne(action.id, state)
  ),
  on(deleteUser.failure, (state, action) => {
    return {
      ...state,
      error: action.error,
    };
  })
);

export const { selectIds, selectEntities, selectAll, selectTotal } =
  adapter.getSelectors();
