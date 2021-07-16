import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { IAuthResponse } from '../auth-response.interface';
import { loginUser } from './auth.actions';

export const authFeatureKey = 'authState';

export interface IAuthInitialState extends EntityState<IAuthResponse> {
  // additional entities state properties
  error: any;
  loginUserPending: boolean;
}
export const adapter: EntityAdapter<IAuthResponse> =
  createEntityAdapter<IAuthResponse>();
export const authInitialState: IAuthInitialState = adapter.getInitialState({
  // additional entity state properties
  error: null,
  loginUserPending: false,
});

export const reducer = createReducer(
  authInitialState,
  // Login User
  on(loginUser.begin, (state) => {
    return { ...state, loginUserPending: true };
  }),
  on(loginUser.success, (state, action) => {
    return {
      ...adapter.setOne(action.serverResponse, state),
      loginUserPending: false,
    };
  }),
  on(loginUser.failure, (state, action) => {
    return {
      ...state,
      loginUserPending: false,
      error: action.error,
    };
  })
);
export const { selectIds, selectEntities, selectAll, selectTotal } =
  adapter.getSelectors();
