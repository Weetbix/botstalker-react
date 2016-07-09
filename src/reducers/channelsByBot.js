import * as Actions from '../actions/channels';

function channels(
  state = {
    isFetching : false,
    channels : []
  }, action ){
  switch (action.type) {
    case Actions.REQUEST_CHANNELS:
      return {
        ...state,
        isFetching : true
      }
    case Actions.RECEIVE_CHANNELS:
      return {
        ...state,
        isFetching : false,
        channels : action.channels,
        lastUpdacurted : action.receivedAt
      };
    case Actions.RECEIVE_CHANNELS_FAILED:
      return {
        ...state,
        isFetching : false,
        channels : []
      };
    default:
      return state;
  }
}

export function channelsByBot(
  state = {},
  action ){
    switch (action.type) {
      case Actions.REQUEST_CHANNELS:
      case Actions.RECEIVE_CHANNELS:
      case Actions.RECEIVE_CHANNELS_FAILED:
        return {
          ...state,
          [action.apiKey] : channels( state[action.apiKey], action )
        }
      default:
        return state;
    }
}
