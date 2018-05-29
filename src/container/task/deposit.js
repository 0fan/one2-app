import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import cs from 'classnames'
import _ from 'lodash'
import PropTypes from 'prop-types'
import { TextareaItem, ImagePicker } from 'antd-mobile'

// component
import {
  Badge,
  PullToRefresh,
  Toast,
  List
} from 'antd-mobile'

import Icon from '../../component/icon/index'
import { Header, Content } from '../../component/layout/index'

import style from './common.css'

export default class App extends Component {
  state = {
    data: [{
      price: 5000,
      date: '2018.03.01'
    }, {
      price: 6000,
      date: '2018.08.12'
    }]
  }

  render () {
    return (
      <Fragment>
        <Header
          hasBorder = { true }
          icon = { <Icon type = 'back_android' /> }
          onLeftClick = { () => this.props.history.go(-1) }
        >
          存款证明
        </Header>
        <Content className = { style['content-gap'] } grey>
          {
            this.state.data.map(val => (
              <Box
                key = { val }
                data = { val }
              />
            ))
          }
        </Content>
      </Fragment>
    )
  }
}

const Box = props => (
  <div className = { style.box }>
    <div className = { style['box-deep'] }>{ '存款证明金额: ' + props.data.price + '万元' }</div>
    <div className = { style['box-light'] }>{ '时间: ' + props.data.date }</div>
  </div>
)