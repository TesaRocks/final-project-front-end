import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { IAuthResponse } from '../auth-response.interface';
import { checkLocalStorage, loginUser, logoutUser } from './auth.actions';

export const authFeatureKey = 'authState';

export interface IAuthInitialState extends EntityState<IAuthResponse> {
  // additional entities state properties
  error: any;
  loginUserPending: boolean;
  hasLocalStorage: boolean;
}
export const adapter: EntityAdapter<IAuthResponse> =
  createEntityAdapter<IAuthResponse>();
export const authInitialState: IAuthInitialState = adapter.getInitialState({
  // additional entity state properties
  error: null,
  loginUserPending: false,
  hasLocalStorage: false,
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
      hasLocalStorage: true,
    };
  }),
  on(loginUser.failure, (state, action) => {
    return {
      ...state,
      loginUserPending: false,
      hasLocalStorage: false,
      error: action.error,
    };
  }),
  // Check Local Storage
  on(checkLocalStorage, (state) => {
    const jwt = localStorage.getItem('id_token');
    if (jwt) {
      return {
        ...state,
        hasLocalStorage: true,
      };
    } else {
      return {
        ...state,
        hasLocalStorage: false,
      };
    }
  }),
  // Logout User
  on(logoutUser.success, (state, action) => {
    return {
      ...adapter.removeAll(state),
      loginUserPending: false,
      hasLocalStorage: false,
    };
  }),
  on(logoutUser.failure, (state, action) => {
    return {
      ...state,
      loginUserPending: false,
      error: action.error,
    };
  })
);
export const { selectIds, selectEntities, selectAll, selectTotal } =
  adapter.getSelectors();
