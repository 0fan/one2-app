import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import cs from 'classnames'
import _ from 'lodash'
import { Router, Route, Switch } from 'react-router-dom'

import { Header, Content } from '../../component/layout/index'
import Icon from '../../component/icon/index'

class App extends Component {
  state = {
    title: '贷款计算器'
  }

  handleChangeTitle = v => {
    this.setState({ title: v })
  }

  render () {
    const url = this.props.match.url

    return (
      <Fragment>
        <Header
          hasBorder
          icon = { <Icon type = 'close' /> }
          onLeftClick = { () => this.props.history.go(-1) }
        >
          { this.state.title }
        </Header>
        <Content>
          <Switch>
            <Route path = { `${ url }` } component = { require('./home').default } exact />
            <Route path = { `${ url }/normal` } component = { require('./normal').default } />
            <Route path = { `${ url }/combine` } component = { require('./combine').default } />
            <Route path = { `${ url }/result` } component = { require('./result').default } />
          </Switch>
        </Content>
      </Fragment>
    )
  }
}

export default App