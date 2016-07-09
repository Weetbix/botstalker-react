import { SET_ERROR, CLEAR_ERROR } from '../actions/error';

export function error(state = null, action) {
    switch (action.type) {
    case SET_ERROR:
        return {
            header: action.header,
            message: action.message
        };
    case CLEAR_ERROR:
        return null;
    default:
        return state;
    }
}
