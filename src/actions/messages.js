export const REQUEST_MESSAGES = 'REQUEST_MESSAGES';
export function requestMessages( channelID ){
    return { 
        type: REQUEST_MESSAGES,
        channelID
    }
}

export const RECEIVE_MESSAGES = 'RECEIVE_MESSAGES';
export function receiveMessages( channelID, json ){
    return {
        type: RECEIVE_MESSAGES,
        channelID,
        messages: json.messages
    };
}

export function fetchMessages(api_key, channelID, count = 10, fromTime){
    return dispatch => {
        dispatch(requestMessages(channelID));

        let requestUrl = `https://slack.com/api/im.history?token=${api_key}&channel=${channelID}&count=${count}`;
        if(fromTime){
            requestUrl += `&latest=${fromTime}`;
        }

        return fetch(requestUrl)
            .then(response => response.json())
            .then(json => {
                dispatch(receiveMessages(channelID, json));
            });
    }
}

/*( api_key ){
    return dispatch => {
        dispatch(requestChannels(api_key));

        return fetch(`https://slack.com/api/im.list?token=${api_key}`)
            .then(response => response.json() )
            .then(json => {
                dispatch(receiveChannels(api_key, json));
                
                // Request all the users in the channel
                return Promise.all(
                    json.ims.map( channel => dispatch(fetchUserIfNeeded(channel.user, api_key)) )
                );
            });
    }
}

function shouldFetchChannels( state, api_key ){
    return !state.channelsByBot[api_key];
}

export function fetchChannelsIfNeeded( api_key ){
    return (dispatch, getState) => {
        if(shouldFetchChannels(getState(), api_key)){
            return dispatch(fetchChannels(api_key));
        }
        return Promise.resolve();
    }
}

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
*/