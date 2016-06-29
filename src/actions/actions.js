
export const SELECT_BOT = 'SELECT_BOT';
export function selectBot( api_key ){
    return {
        type: SELECT_BOT,
        api_key
    }
}

export const REQUEST_CHANNELS = 'REQUEST_CHANNELS';
export function requestChannels( api_key ){
    return { 
        type: REQUEST_CHANNELS,
        api_key
    }
}

export const RECEIVE_CHANNELS = 'RECIEVE_CHANNELS';
export function receiveChannels( api_key, json ){
    return {
        type: RECEIVE_CHANNELS,
        api_key,
        channels: json.ims,
        receivedAt: Date.now()
    };
}

export function fetchChannels( api_key ){
    return dispatch => {
        dispatch(requestChannels(api_key));

        return fetch(`https://slack.com/api/im.list?token=${api_key}`)
            .then(response => response.json() )
            .then(json => dispatch(receiveChannels(api_key, json)));
    }
}