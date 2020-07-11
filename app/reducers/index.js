import { combineReducers } from 'redux'
import configureStore from '../createStore'

/* ------------- Assemble The Reducers ------------- */
export const reducers = combineReducers({
  nav: require('./nav').default,
  auth: require('./auth').default,
  global: require('./global').default,
  profile: require('./profile').default,
  gallery: require('./gallery').default,
  art: require('./art').default,
  wall: require('./wall').default,
  hangup: require('./hangup').default,
  frame: require('./frame').default
})

export default (helpersConfig) => {
  let finalReducers = reducers
  
  
  let {store} = configureStore(finalReducers, helpersConfig)

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('./').reducers
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
