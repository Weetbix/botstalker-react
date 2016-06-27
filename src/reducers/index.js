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

/*import {
  SELECT_REDDIT, INVALIDATE_REDDIT,
  REQUEST_POSTS, RECEIVE_POSTS
} from '../actions'

function selectedReddit(state = 'reactjs', action) {
  switch (action.type) {
    case SELECT_REDDIT:
      return action.reddit
    default:
      return state
  }
}

function posts(state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) {
  switch (action.type) {
    case INVALIDATE_REDDIT:
      return Object.assign({}, state, {
        didInvalidate: true
      })
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case RECEIVE_POSTS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.posts,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}

function postsByReddit(state = { }, action) {
  switch (action.type) {
    case INVALIDATE_REDDIT:
    case RECEIVE_POSTS:
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        [action.reddit]: posts(state[action.reddit], action)
      })
    default:
      return state
  }
}

const rootReducer = combineReducers({
  postsByReddit,
  selectedReddit
})
*/

export default combineReducers({
    currentBot,
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