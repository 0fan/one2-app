import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import cs from 'classnames'
import _ from 'lodash'
import axios from 'axios'
import { url, api } from '../../api'
import { Link } from 'react-router-dom'

import getNoticeTime from '../../util/getNoticeTime'

import { Header, Content } from '../../component/layout/index'
import Icon from '../../component/icon/index'

import { inputNoticeSuccess } from '../../redux/notice'

import style from './index.css'

const data = new Array(10).fill(0).map((v, i) => ({
  id: i
}))

@connect(state => ({}), {
  inputNoticeSuccess
})
class App extends Component {

  state = {
    data: []
  }

  async componentDidMount () {

    let [err, res] = await this.getList()

    if (err) {
      console.log(err)
      return
    }

    this.setState({
      data: res
    })

    this.props.inputNoticeSuccess({ data: res })
  }

  getList = async () => {
    let [err, res] = await axios.post(url.server + api.getNoticeList)

    if (err) {
      return [err]
    }

    let { code, message, data } = res

    if ( code !== '0') {
      return [message || '获取公告列表失败']
    }

    return [null, data]
  }

  handleItemClick = (v, i, e) => {
    this.props.history.push(`${ this.props.match.url }/${ v.id }`)
  }

  render () {
    return (
      <Fragment>
        <Header
          hasBorder
          icon = { <Icon type = 'back_android' /> }
          onLeftClick = { () => this.props.history.go(-1) }
          rightContent = { <Link to = '/workbench/notice/add'>发公告</Link> }
        >
          公告
        </Header>
        <Content grey>
          {
            this.state.data !== null ?
              <List
                data = { this.state.data }
                onItemClick = { this.handleItemClick }
              /> :
              null
          }
        </Content>
      </Fragment>
    )
  }
}

const List = props => (
  <div className = { style['list-wrap'] }>
    {
      props.data.map((v, i) => (
        <div className = { style.list } key = { i } onClick = { e => props.onItemClick && props.onItemClick(v, i, e) }>
          <div className = { style['list-brief'] }>{ getNoticeTime(v.rawAddTime) }</div>
          <div className = { style['list-item'] }>
            <div className = { style['list-item-body'] }>
              <div className = { style['list-item-title'] }>{ v.noticeTitle }</div>
              <div className = { style['list-item-text'] }>{ v.noticeContent }</div>
            </div>
            <div className = { style['list-item-footer'] }>
              <div className = { style['list-item-footer-left'] }>
                <div className = { style['list-item-footer-name'] }>{ v.noticeAuthor }</div>
              </div>
              <div className = { style['list-item-footer-right'] }>查看全部 <Icon type = 'right' /></div>
            </div>
          </div>
        </div>
      ))
    }
  </div>
)

export default App