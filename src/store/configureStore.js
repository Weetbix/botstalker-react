import { createStore, applyMiddleware, compose } from 'redux';
import { hashHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers';

export default function configureStore(preloadedState) {
    const store = createStore(
    rootReducer,
    preloadedState,
    compose(
        applyMiddleware(
          routerMiddleware(hashHistory),
          thunkMiddleware,
        ),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    ));

     // This shit doesnt work, fix it
    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers').default;
            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
}
