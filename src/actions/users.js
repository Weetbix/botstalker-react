export const REQUEST_USER = 'REQUEST_USER';
export function requestUser(userId) {
    return {
        type: REQUEST_USER,
        userId
    };
}

export const RECEIVE_USER = 'RECEIVE_USER';
export function receiveUser(userId, json) {
    return {
        type: RECEIVE_USER,
        userId,
        user: json.user
    };
}

export function fetchUser(userId, apiKey) {
    return dispatch => {
        dispatch(requestUser(userId));

        return fetch(`https://slack.com/api/users.info?token=${apiKey}&user=${userId}`)
            .then(response => response.json())
            .then(json => dispatch(receiveUser(userId, json)));
    };
}

export function fetchUserIfNeeded(userId, apiKey) {
    return (dispatch, getState) => {
        if (!getState().users[userId]) {
            return dispatch(fetchUser(userId, apiKey));
        }
        return Promise.resolve();
    };
}

