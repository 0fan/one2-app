import React, { Component, Fragment } from 'react'
import cs from 'classnames'

import { Button } from 'antd-mobile'
import { Header, Content } from '../component/layout/index'
import Icon from '../component/icon/index'

import style from './scanResult.css'

export default class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      data: [{
        key: '楼盘',
        value: '绿色家园'
      }, {
        key: '客户',
        value: '乔布斯 13161361888'
      }, {
        key: '存款证明',
        value: '0.50'
      }, {
        key: '办理时间',
        value: '2018.02.06'
      }, {
        key: '状态',
        value: '已添加'
      }]
    }
  }

  renderKey = (key, value) => {
    switch (key) {
      default:
        return key
    }
  }

  renderValue = (key, value) => {
    switch (key) {
      case '状态':
        return this.renderStatus(value)
      case '存款证明':
        return (
          <Fragment>
            { value }
            <span className = { style['item-sub'] }>万元</span>
          </Fragment>
        )
      default:
        return value
    }
  }

  renderStatus = v => {
    switch (v.trim()) {
      case '未添加':
        return (
          <Fragment>
            <i className = { cs(style.status, style['status-error']) }></i>{ v }
          </Fragment>
        )
      case '已添加':
        return (
          <Fragment>
            <i className = { cs(style.status, style['status-success']) }></i>{ v }
          </Fragment>
        )
      default:
        return v
    }
  }

  handleBack = () => {
    console.log('back')
  }

  handleSubmit = () => {
    console.log('submit')
  }

  render () {
    return (
      <Fragment>
        <Header
          icon = { <Icon type = 'back_android' /> }
          onLeftClick = { this.handleBack }
        >
          扫描结果
        </Header>
        <Content grey className = { style.content }>
          <div className = { style.box }>
            <div className = { style['box-header'] }>客户信息</div>
            <div className = { style['box-body'] }>
              <ul className = { style.list }>
                {
                  this.state.data.map((v, i) => (
                    <li key = { i } className = { style.item }>
                      <div className = { style['item-key'] }>{ this.renderKey(v.key, v.value) }</div>
                      <div className = { style['item-value'] }>{ this.renderValue(v.key, v.value) }</div>
                    </li>
                  ))
                }
              </ul>
            </div>
          </div>
          <Button type = 'primary' onClick = { this.handleSubmit }>添加至我的客户</Button>
        </Content>
      </Fragment>
    )
  }
}