import { createReducer, on } from '@ngrx/store';
import { updateUser } from './update.user.actions';
import { adapter, initialState } from '../loadUsers/load.users.reducer';

export const reducer = createReducer(
  initialState,

  on(updateUser.begin, (state, action) => adapter.updateOne(action.user, state))
);

export const { selectIds, selectEntities, selectAll, selectTotal } =
  adapter.getSelectors();
