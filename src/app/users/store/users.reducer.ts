import { IUser } from '../user.interface';
import * as UsersActions from './users.actions';
export interface State {
  users: IUser[];
}
const initialState: State = {
  users: [],
};
export function usersReducer(
  state = initialState,
  action: UsersActions.UsersActions
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
