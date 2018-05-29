import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import cs from 'classnames'
import _ from 'lodash'

import { Badge, PullToRefresh } from 'antd-mobile'
import { Header, Content } from '../../component/layout/index'
import Icon from '../../component/icon/index'
import Search from '../../component/search/index'

import style from './index.css'

const data = [{
  text: '任务',
  notice: 1,
  dot: false,
  type: 'task',
  link: 'task'
}, {
  text: '房源',
  notice: 1,
  dot: true,
  type: 'housing',
  link: 'housing'
}, {
  text: '业绩',
  notice: 0,
  dot: false,
  type: 'achievement',
  link: 'achievement'
}, {
  text: '公告',
  notice: 12,
  dot: false,
  type: 'notice',
  link: 'notice'
}, {
  text: '楼盘动态',
  notice: 12,
  dot: true,
  type: 'dynamic',
  link: 'housing_dynamic'
}, {
  text: '房贷计算器',
  notice: 0,
  dot: false,
  type: 'calculator',
  link: 'mortgage_calculator'
}]

export default class App extends Component {
  state = {
    refreshing: false
  }

  render () {
    const { url } = this.props.match

    return (
      <div className = { style.page }>
        <div className = { style.header }>
          <div className = { style['header-left'] }>绿色家园</div>
          <div className = { style['header-right'] }>
            <Icon type = 'scan' />
            <Icon type = 'add' />
          </div>
        </div>
        <div className = { style.body }>
          <Search />
          <PullToRefresh
            style = { { overflow: 'auto' } }
            refreshing = { this.state.refreshing }
            onRefresh = {
              () => {
                this.setState({ refreshing: true })

                setTimeout(() => {
                  this.setState({ refreshing: false })
                }, 1000)
              }
            }
          >
            <div className = { style.list }>
              {
                data.map((v, i) => (
                  <Link className = { cs(style.item, style[`item-${ v.type }`]) } key = { i } to = '/'>
                    <div className = { style['item-icon'] }>
                      <Badge text = { v.notice } dot = { v.dot } />
                    </div>
                    <div className = { style['item-title'] }>{ v.text }</div>
                  </Link>
                ))
              }
            </div>
          </PullToRefresh>
        </div>
      </div>
    )
  }
}