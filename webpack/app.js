import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import promiseMiddleware from 'redux-promise'

import './styles/index.scss'

import Main from './components/Main'
import reducers from './reducers'

import { filter } from './actions'

let store = createStore(reducers, applyMiddleware(promiseMiddleware))

ReactDOM.render(
  <Provider store={store}>
    <Main />
  </Provider>,
  document.getElementById('root')
)

// workaround to populate initial state
store.dispatch(filter({}))