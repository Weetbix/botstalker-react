import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, hashHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import App from './containers/App'
import ChannelList from './components/ChannelList'
import Channel from './components/Channel'
import configureStore from './store/configureStore'

import { selectBot, fetchChannels } from './actions/actions';

const store = configureStore()

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(hashHistory, store)

function channelListOnEnter(route){
  const api_key = route.params.api_key;
  store.dispatch(selectBot(api_key));
  store.dispatch(fetchChannels(api_key));
}

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
          <Route path="/:api_key"
                 component={ChannelList} 
                 onEnter={channelListOnEnter} />
          <Route path="/:api_key/:channel_id"
                 component={Channel}
                 onEnter={ r => store.dispatch(selectBot( r.params.api_key )) } />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);