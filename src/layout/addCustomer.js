import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

export default class App extends Component {
  render () {
    const { url } = this.props.match

    return (
      <Switch>
        <Route path = { `${ url }` } component = { require('../container/addCustomer/index').default } exact />
        <Route path = { `${ url }/add_remark` } component = { require('../container/addCustomer/add_remark').default } exact />
        <Route path = { `${ url }/:id` } component = { require('../container/addCustomer/detail_remark').default } exact />
        <Redirect to = { url } />
      </Switch>
    )
  }
}