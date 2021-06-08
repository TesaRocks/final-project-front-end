import { createReducer, on } from '@ngrx/store';
import { addUser } from './add.user.actions';
import { adapter, initialState } from '../loadUsers/load.users.reducer';

export const reducer = createReducer(
  initialState,
  on(addUser.success, (state, action) => adapter.addOne(action.user, state)),
  on(addUser.failure, (state, action) => {
    return {
      ...state,
      error: action.error,
    };
  })
);

export const { selectIds, selectEntities, selectAll, selectTotal } =
  adapter.getSelectors();
