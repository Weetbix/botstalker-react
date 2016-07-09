import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { channelsByBot } from './channelsByBot';
import { users } from './users';
import { currentBot } from './currentBot';
import { messagesByChannel } from './messagesByChannel';
import { error } from './error';

export default combineReducers({
    currentBot,
    users,
    channelsByBot,
    messagesByChannel,
    error,
    routing: routerReducer
});
