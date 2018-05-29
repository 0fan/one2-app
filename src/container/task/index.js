import React, { Component, Fragment } from 'react'
import cs from 'classnames'
import { url, api } from '../../api'
import axios from 'axios'
import _ from 'lodash'
import PropTypes from 'prop-types'

// component
import {
  Badge,
  PullToRefresh,
  Toast,
  List
} from 'antd-mobile'

import Icon from '../../component/icon/index'
import { Header, Content } from '../../component/layout/index'

import getNoticeTime from '../../util/getNoticeTime'

import style from './index.css'

export default class App extends Component {
  state = {
    data1: new Array(3).fill(0),
    waitList: [],
    completeList: [],
    pageIndex: 0,
    refreshing: false
  }

  async componentDidMount () {
    let [err1, res1] = await this.getWaitList()

    if (err1) {
      console.log(err1)
      return
    }

    this.setState({
      waitList: res1
    })

    let [err2, res2] = await this.getCompleteList()

    if (err2) {
      console.log(err2)
      return
    }

    this.setState({
      completeList: res2
    })
  }

  getWaitList = async () => {
    let [err, res] = await axios.post(url.server + api.getTaskList, {
      isFollowUp: 'y'
    })

    if (err) {
      return [err]
    }

    let { code, message, data } = res

    if ( code !== '0') {
      return [message || '获取待办列表失败']
    }

    return [null, data]
  }

  getCompleteList = async () => {
    let [err, res] = await axios.post(url.server + api.getTaskList, {
      isFollowUp: 'n'
    })

    if (err) {
      return [err]
    }

    let { code, message, data } = res

    if ( code !== '0') {
      return [message || '获取已办列表失败']
    }

    return [null, data]
  }

  handleTabChange = (i, e) => {
    this.setState({ pageIndex: i })
  }

  handleItemClick = (id, e) => {
    this.props.history.push(`${ this.props.match.url }/${ id }`)
  }

  render () {
    const getTabItemClass = i => cs(style['tab-item'], {
      [style['tab-item-active']]: this.state.pageIndex === i
    })

    return (
      <Fragment>
        <Header
          hasBorder = { true }
          icon = { <Icon type = 'back_android' /> }
          onLeftClick = { () => this.props.history.go(-1) }
        >
          任务
        </Header>
        <Content>
          <div className = { style.tab }>
            <div className = { getTabItemClass(0) } onClick = { e => this.handleTabChange(0, e) }>待办的任务</div>
            <div className = { getTabItemClass(1) } onClick = { e => this.handleTabChange(1, e) }>完成的任务</div>
          </div>
          <div className = { style.spacer }></div>
          {
            this.state.pageIndex === 0 ?
              <div className = { style.list }>
                {
                  this.state.waitList.map((v, i) => (
                    <div className = { style['list-item'] } key = { i } onClick = { e => { this.handleItemClick(v.id, e) } }>
                      <div className = { style['list-item-header'] }></div>
                      <div className = { style['list-item-content'] }>
                        <div className = { style['list-item-content-main'] }>
                          <div className = { style['list-item-title'] }>{ v.name } <div className = { style['list-item-tag'] }>待跟进</div></div>
                          <div className = { style['list-item-text'] }>{ v.phone }</div>
                        </div>
                        <div className = { style['list-item-after'] }>
                          <div className = { style['list-item-after-title'] }>{ getNoticeTime(v.rawAddTime) }</div>
                          <div className = { style['list-item-after-text'] }>{ v.refereeFrom }</div>
                        </div>
                      </div>
                    </div>
                  ))
                }
              </div> :
              null
          }
          {
            this.state.pageIndex === 1 ?
              <div className = { style.list }>
                {
                  this.state.completeList.map((v, i) => (
                    <div className = { style['list-item'] } key = { i } onClick = { e => { this.handleItemClick(i, e) } }>
                      <div className = { style['list-item-header'] }></div>
                      <div className = { style['list-item-content'] }>
                        <div className = { style['list-item-content-main'] }>
                          <div className = { style['list-item-title'] }>{ v.name } <div className = { style['list-item-tag-success'] }>已跟进</div></div>
                          <div className = { style['list-item-text'] }>{ v.phone }</div>
                        </div>
                        <div className = { style['list-item-after'] }>
                          <div className = { style['list-item-after-title'] }>{ getNoticeTime(v.rawAddTime) }</div>
                          <div className = { style['list-item-after-text'] }>{ v.refereeFrom }</div>
                        </div>
                      </div>
                    </div>
                  ))
                }
              </div> :
              null
          }
        </Content>
      </Fragment>
    )
  }
}