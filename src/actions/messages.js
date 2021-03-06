import { fetchUserIfNeeded } from './users';

export const REQUEST_MESSAGES = 'REQUEST_MESSAGES';
export function requestMessages(channelID) {
    return {
        type: REQUEST_MESSAGES,
        channelID
    };
}

export const RECEIVE_MESSAGES = 'RECEIVE_MESSAGES';
export function receiveMessages(channelID, json) {
    return {
        type: RECEIVE_MESSAGES,
        channelID,
        messages: json.messages,
        hasMore: json.has_more,
        isLimited: json.is_limited
    };
}

// Fetches #count messages backwards, from 'latest'. If latest
// is omitted, the most recent messages are fetched
export function fetchMessages(apiKey, channelID, count = 10, latest) {
    return dispatch => {
        dispatch(requestMessages(channelID));

        let requestUrl = `https://slack.com/api/im.history?token=${apiKey}&channel=${channelID}&count=${count}`;
        if (latest) {
            requestUrl += `&latest=${latest}`;
        }

        return fetch(requestUrl)
            .then(response => response.json())
            .then(json => {
                // Request all the users in the messages
                const usersInMessages = new Set(json.messages.map(m => m.user)
                                                             .filter(u => typeof u !== 'undefined'));

                const fetchUsersPromises = [...usersInMessages].map(
                    user => dispatch(fetchUserIfNeeded(user, apiKey))
                );

                // We are finished with the action when all
                // users and all messages requested have been fetched
                return Promise.all([
                    ...fetchUsersPromises,
                    dispatch(receiveMessages(channelID, json))
                ]);
            });
    };
}

function shouldFetchMessages(state, apiKey, channelID) {
    const channelMessages = state.messagesByChannel[channelID];
    return !channelMessages;

}

export function fetchMessagesIfNeeded(apiKey, channelID) {
    return (dispatch, getState) => {
        if (shouldFetchMessages(getState(), apiKey, channelID)) {
            return dispatch(fetchMessages(apiKey, channelID));
        }
        return Promise.resolve();
    };
}
