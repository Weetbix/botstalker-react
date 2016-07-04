import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import { channelsByBot } from './channelsByBot';
import { users }         from './users';
import { currentBot }    from './currentBot';

export default combineReducers({
    currentBot,
    channelsByBot,
    users,
    routing: routerReducer
});