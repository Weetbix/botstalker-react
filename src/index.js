import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, hashHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import App from './containers/App'
import configureStore from './store/configureStore'

const store = configureStore()

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(hashHistory, store)


import { Component } from 'react';
class Test extends Component {
  render() {
    return (<span>TEST HERE HAHA</span>);
  }
}

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
          <Route path="/test" component={Test} />
        { 
          // <Route path="foo" component={Foo}/>
          //<Route path="bar" component={Bar}/>
        }
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);