import { fetchUserIfNeeded } from './users'; 
import { setError }          from './error';

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

export const RECEIVE_CHANNELS_FAILED = 'RECEIVE_CHANNELS_FAILED';
export function receiveChannelsFailed( api_key ){
    return {
        type : RECEIVE_CHANNELS_FAILED,
        api_key
    }
}

// Requests channels and any users required for the channel
export function fetchChannels( api_key ){
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
            })
            .catch( error => {
                dispatch(receiveChannelsFailed(api_key));
                dispatch(setError(
                    `Couldn't load channels`,
                    `Unable to load the channels for that bot: ${error.message}`
                ));
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