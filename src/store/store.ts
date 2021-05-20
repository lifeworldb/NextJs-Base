// Libs
import {
  createStore,
  applyMiddleware, combineReducers, StoreEnhancer, Store
} from 'redux'
import { createWrapper } from 'next-redux-wrapper'
import thunkMiddleware from 'redux-thunk'
// Custom Functions
import count from './count/reducer'

// eslint-disable-next-line consistent-return
const bindMiddleware = (middleware): StoreEnhancer => {
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line @typescript-eslint/no-var-requires, global-require
    const { composeWithDevTools } = require('redux-devtools-extension')
    return composeWithDevTools(applyMiddleware(...middleware))
  }
}

const combinedReducer = combineReducers({
  count
})

const initStore = (): Store => createStore(
  combinedReducer,
  bindMiddleware([thunkMiddleware])
)

export const wrapper = createWrapper(initStore)
