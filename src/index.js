import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import App from './containers/App'
import ChannelListPage from './components/ChannelListPage'
import ChannelPage from './components/ChannelPage'
import configureStore from './store/configureStore'
import Home from './components/Home';

import { selectBot } from './actions/selectBot';
import { fetchChannelsIfNeeded } from './actions/channels';
import { fetchMessages } from './actions/messages';

const store = configureStore()

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(hashHistory, store)

function homeOnEnter(){
  store.dispatch(selectBot(''));
}

function channelListOnEnter(route){
  const api_key = route.params.api_key;
  store.dispatch(selectBot(api_key));
  store.dispatch(fetchChannelsIfNeeded(api_key));
}

function channelPageOnEnter(route){
  const { api_key, channel_id } = route.params;
  store.dispatch(selectBot(api_key));
  store.dispatch(fetchMessages(api_key, channel_id));
}

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
          <IndexRoute component={ Home } 
                      onEnter={ homeOnEnter } />
          <Route path="/:api_key"
                 component={ChannelListPage} 
                 onEnter={channelListOnEnter} />
          <Route path="/:api_key/:channel_id"
                 component={ChannelPage}
                 onEnter={ channelPageOnEnter } />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);