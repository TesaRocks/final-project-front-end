import { IUsersInitialState } from './users/store/user.reducer';

export interface IApplicationState {
  userState: IUsersInitialState;
}
