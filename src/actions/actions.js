
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
        conversations: 'rah',
        receivedAt: Date.now()
    };
}
