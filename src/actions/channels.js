import { fetchUserIfNeeded } from './users';
import { setError } from './error';

export const REQUEST_CHANNELS = 'REQUEST_CHANNELS';
export function requestChannels(apiKey) {
    return {
        type: REQUEST_CHANNELS,
        apiKey
    };
}

export const RECEIVE_CHANNELS = 'RECIEVE_CHANNELS';
export function receiveChannels(apiKey, json) {
    return {
        type: RECEIVE_CHANNELS,
        apiKey,
        channels: json.ims,
        receivedAt: Date.now()
    };
}

export const RECEIVE_CHANNELS_FAILED = 'RECEIVE_CHANNELS_FAILED';
export function receiveChannelsFailed(apiKey) {
    return {
        type: RECEIVE_CHANNELS_FAILED,
        apiKey
    };
}

// Requests channels and any users required for the channel
export function fetchChannels(apiKey) {
    return dispatch => {
        dispatch(requestChannels(apiKey));

        return fetch(`https://slack.com/api/im.list?token=${apiKey}`)
            .then(response => response.json())
            .then(json => {
                if (!json.ok) {
                    if (json.error === 'invalid_auth'){
                        throw new Error('The API key you entered is invalid');
                    }
                    throw new Error(json.error);
                }

                dispatch(receiveChannels(apiKey, json));

                // Request all the users in the channel
                const usersRequests = json.ims.map(
                    channel => dispatch(fetchUserIfNeeded(channel.user, apiKey))
                );
                return Promise.all(
                   usersRequests
                );
            })
            .catch(error => {
                dispatch(receiveChannelsFailed(apiKey));
                dispatch(setError(
                    'Couldn\'t load channels',
                    `Unable to load the channels for that bot: ${error.message}`
                ));
            });
    };
}

function shouldFetchChannels(state, apiKey) {
    return !state.channelsByBot[apiKey];
}

export function fetchChannelsIfNeeded(apiKey) {
    return (dispatch, getState) => {
        if (shouldFetchChannels(getState(), apiKey)) {
            return dispatch(fetchChannels(apiKey));
        }
        return Promise.resolve();
    };
}
