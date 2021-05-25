import { IUser } from '../user.interface';
import * as UsersActions from './users.actions';

export interface IUsersInitialState {
  users: IUser[];
}
const usersInitialState: IUsersInitialState = {
  users: [],
};
export function usersReducer(
  state = usersInitialState,
  //action: UsersActions.SetUsers
  action: any
) {
  switch (action.type) {
    case UsersActions.SET_USERS:
      return {
        ...state,
        users: [...action.payload],
      };
    default:
      return state;
  }
}
