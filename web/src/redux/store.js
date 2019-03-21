import { createStore, applyMiddleware } from 'redux'
import withRedux from 'next-redux-wrapper'
import nextReduxSaga from 'next-redux-saga'
import { Map as map } from 'immutable'

//import middlewares
import createSagaMiddleware from 'redux-saga'
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import reducer from './reducers';

import mySaga from './sagas';

const sagaMiddleware = createSagaMiddleware()

const bindMiddleware = (middleware) => {
  //if (process.env.NODE_ENV !== 'production') {
  const { composeWithDevTools } = require('redux-devtools-extension')
  return composeWithDevTools(applyMiddleware(...middleware))
  //}
  //return applyMiddleware(...middleware)
}

export function configureStore() {
  const store = createStore(
    reducer,
    map({}),
    bindMiddleware([logger, thunk, sagaMiddleware])
  )
  console.log('store created');

  //store.sagaTask = sagaMiddleware.run(mySaga)
  store.runSagaTask = () => {
    store.sagaTask = sagaMiddleware.run(mySaga)
  }

  // run the rootSaga initially
  store.runSagaTask()
  return store
}

export function initStore(BaseComponent, mapStateToProps, mapDispatchToProps, from) {
  console.log(' from ' + from)
  return withRedux(configureStore, mapStateToProps, mapDispatchToProps)(nextReduxSaga(BaseComponent))
}