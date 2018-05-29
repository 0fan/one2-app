import React, { Component } from 'react'
import { WingBlank, WhiteSpace } from 'antd-mobile'
import { Switch, Route, Redirect, HashRouter as Router } from 'react-router-dom'

class App extends Component {
  render () {
    return (
      <Router>
        <Switch>
          <Route path = '/workbench' component = { require('./layout/workBench').default } />
          <Route path = '/scanResult/:id' component = { require('./layout/scanResult').default } />
          <Route path = '/addCustomer' component = { require('./layout/addCustomer').default } />
          <Route path = '/user/:id' component = { require('./layout/user').default } />
          <Route path = '/list' component = { require('./layout/list').default } />
          <Redirect to = '/workbench' />
        </Switch>
      </Router>
    )
  }
}

export default App
