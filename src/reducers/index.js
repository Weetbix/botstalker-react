import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import * as Actions from '../actions/actions';

function currentBot(state = '', action){
  switch(action.type){
    case Actions.SELECT_BOT:
      return action.api_key;
    default: 
      return state;
  }
}

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
    default:
      return state;
  }
}

function channelsByBot(
  state = {},
  action ){
    switch (action.type) {
      case Actions.REQUEST_CHANNELS:
      case Actions.RECEIVE_CHANNELS:
        return {
          ...state,
          [action.api_key] : channels( state[action.api_key], action )
        }
      default:
        return state;
    }
}

function user(
  state = {
    isFetching : false
  }, action){
  switch (action.type) {
      case Actions.REQUEST_USER:
        return {
          ...state,
          isFetching : true
        }
      case Actions.RECEIVE_USER:
        return {
          ...state,
          isFetching : false,
          ...action.user
        };
      default:
        return state;
    }
}

function users(
  state = {},
  action ){
    switch (action.type) {
      case Actions.REQUEST_USER:
      case Actions.RECEIVE_USER:
        return {
          ...state,
          [action.userId] : user( state[action.userId], action )
        }
      default:
        return state;
    }
}

export default combineReducers({
    currentBot,
    channelsByBot,
    users,
    routing: routerReducer
});

/* 

STATE LAYOUT

{
  currentBot: 'api-key-here',
  users: {
    2 {
      id: 2,
      name: 'andrew'
    }
  }
  channelsByBot: {
    43r4f: {
      channels: [
        {
          user: IF34F
        } 
      ],
      lastUpdated: 3-34-3
  }
  messagesByChannel: {
    IDFDF: {
      isLoading: true,
      lastUpdated: 3-43-4
      messages: {
        type: 'messages',
        ts: 121233.1t,
        text: 'rah rah'
      }
    }

  }
}
{
  selectedSubreddit: 'frontend',
  entities: {
    users: {
      2: {
        id: 2,
        name: 'Andrew'
      }
    },
    posts: {
      42: {
        id: 42,
        title: 'Confusion about Flux and Relay',
        author: 2
      },
      100: {
        id: 100,
        title: 'Creating a Simple Application Using React JS and Flux Architecture',
        author: 2
      }
    }
  },
  postsBySubreddit: {
    frontend: {
      isFetching: true,
      didInvalidate: false,
      items: []
    },
    reactjs: {
      isFetching: false,
      didInvalidate: false,
      lastUpdated: 1439478405547,
      items: [ 42, 100 ]
    }
  }
}
*/