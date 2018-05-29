import React from 'react'
import axios from 'axios'
import { render, unmountComponentAtNode } from 'react-dom'
import FastClick from 'fastclick'
import query from 'query-string'

// redux
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import reducer from './redux/index'

// config
import './config/index'
import registerServiceWorker from './registerServiceWorker'
FastClick.attach(document.body)

// style
import './less/index.less'

// app
import App from './app'

// 设置token
axios.defaults.headers.common['Authorization'] = query.parseUrl(window.location.href).query.token

const store = createStore(reducer, compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
))

render(
  <Provider store = { store }>
    <App />
  </Provider>,
  document.getElementById('root')
)

registerServiceWorker()