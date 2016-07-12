import { REQUEST_MESSAGES,
         RECEIVE_MESSAGES } from '../actions/messages';

function messages(
  state = {
      isFetching: false,
      messages: []
  }, action) {
    switch (action.type) {
    case REQUEST_MESSAGES:
        return {
            ...state,
            isFetching: true
        };
    case RECEIVE_MESSAGES: {
        const { hasMore,
                isLimited } = action;

        // Organise the messages so they are
        // decending by time
        action.messages.reverse();

        return {
            ...state,
            isFetching: false,
            // TODO: Change this to merging?
            messages: action.messages.concat(state.messages),
            hasMore,
            isLimited
        };
    }
    default:
        return state;
    }
}

export function messagesByChannel(
  state = {},
  action) {
    switch (action.type) {
    case REQUEST_MESSAGES:
    case RECEIVE_MESSAGES:
        return {
            ...state,
            [action.channelID]: messages(state[action.channelID], action)
        };
    default:
        return state;
    }
}
