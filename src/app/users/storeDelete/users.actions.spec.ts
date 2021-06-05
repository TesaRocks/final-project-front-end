import * as fromUsers from './users.actions';

describe('loadUserss', () => {
  it('should return an action', () => {
    expect(fromUsers.loadUsers().type).toBe('[Users] Load Userss');
  });
});
