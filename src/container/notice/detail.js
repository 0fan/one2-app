import React, { Component, Fragment } from 'react'
import axios from 'axios'
import { url, api } from '../../api'

import { Header, Content } from '../../component/layout/index'
import Icon from '../../component/icon/index'

import getNoticeTime from '../../util/getNoticeTime'

import style from './index.css'

export default class App extends Component {

  state = {
    data: {}
  }

  async componentDidMount () {

    let [err, res] = await this.getDetail()

    if (err) {
      console.log(err)
      return
    }

    this.setState({
      data: res
    })
  }

  getDetail = async () => {
    let [err, res] = await axios.post(url.server + api.getNoticeDetail, {
      id: this.props.match.params.id
    })

    if (err) {
      return [err]
    }

    let { code, message, data } = res

    if ( code !== '0') {
      return [message || '获取公告列表失败']
    }

    return [null, data]
  }

  render () {
    const data = this.state.data

    return (
      <Fragment>
        <Header
          hasBorder
          icon = { <Icon type = 'back_android' /> }
          onLeftClick = { () => this.props.history.go(-1) }
        >
          公告详情
        </Header>
        <Content>
          <div className = { style.detail }>
            <div className = { style['detail-title'] }>{ data.noticeTitle }</div>
            <div className = { style['detail-relative'] }>
              <div className = { style['detail-relative-author'] }>发布者：{ data.noticeAuthor }</div>
              <div className = { style['detail-relative-date'] }>{ getNoticeTime(data.rawAddTime) }</div>
            </div>
            <div className = { style['detail-content'] }>
              <p>{ data.noticeContent }</p>
            </div>
          </div>
        </Content>
      </Fragment>
    )
  }
}