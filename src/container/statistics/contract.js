import React, { Component, Fragment } from 'react'

import { Header, Content } from '../../component/layout/index'
import Icon from '../../component/icon/index'

export default class App extends Component {
  render () {
    return (
      <Fragment>
        <Header
          icon = { <Icon type = 'back_android' /> }
          onLeftClick = { () => this.props.history.go(-1) }
        >
          交易统计
        </Header>
        <Content></Content>
      </Fragment>
    )
  }
}