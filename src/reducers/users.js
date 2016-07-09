import * as Actions from '../actions/users';

function user(
  state = {
      isFetching: false
  }, action) {
    switch (action.type) {
    case Actions.REQUEST_USER:
        return {
            ...state,
            isFetching: true
        };
    case Actions.RECEIVE_USER:
        return {
            ...state,
            isFetching: false,
            ...action.user
        };
    default:
        return state;
    }
}

export function users(
  state = {},
  action) {
    switch (action.type) {
    case Actions.REQUEST_USER:
    case Actions.RECEIVE_USER:
        return {
            ...state,
            [action.userId]: user(state[action.userId], action)
        };
    default:
        return state;
    }
}
