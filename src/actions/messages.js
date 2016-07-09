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
        messages: json.messages
    };
}

export function fetchMessages(apiKey, channelID, count = 10, fromTime) {
    return dispatch => {
        dispatch(requestMessages(channelID));

        let requestUrl = `https://slack.com/api/im.history?token=${apiKey}&channel=${channelID}&count=${count}`;
        if (fromTime) {
            requestUrl += `&latest=${fromTime}`;
        }

        return fetch(requestUrl)
            .then(response => response.json())
            .then(json => {
                // Request all the users in the messages
                const usersInMessages = new Set(json.messages.map(m => m.user)
                                                             .filter(u => typeof u !== 'undefined'));

                const fetchUsersPromises = [...usersInMessages].map(user => dispatch(fetchUserIfNeeded(user, apiKey)));

                // We are finished with the action when all
                // users and all messages requested have been fetched
                return Promise.all([
                    ...fetchUsersPromises,
                    dispatch(receiveMessages(channelID, json))
                ]);
            });
    };
}
