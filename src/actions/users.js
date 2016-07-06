export const REQUEST_USER = 'REQUEST_USER';
export function requestUser( userId ){
    return { 
        type: REQUEST_USER,
        userId
    }
}

export const RECEIVE_USER = 'RECEIVE_USER';
export function receiveUser( userId, json ){
    return {
        type: RECEIVE_USER,
        userId,
        user: json.user
    };
}

export function fetchUser( userId, api_key ){
    return dispatch => {
        dispatch(requestUser(userId));

        return fetch(`https://slack.com/api/users.info?token=${api_key}&user=${userId}`)
            .then(response => response.json() )
            .then(json => dispatch(receiveUser(userId, json)));
    }
}

export function fetchUserIfNeeded( userId, api_key ){
    return (dispatch, getState) => {
        if(!getState().users[userId]){
            return dispatch(fetchUser(userId, api_key));
        }
        return Promise.resolve();
    };
}

