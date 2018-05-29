import React, { Component, Fragment } from 'react'
import cs from 'classnames'
import _ from 'lodash'
import PropTypes from 'prop-types'
import axios from 'axios'
import { url, api } from '../../api'

import { Flex, PullToRefresh, Toast } from 'antd-mobile'

import { Header, Content } from '../../component/layout/index'
import Icon from '../../component/icon/index'
import Filter from '../../component/filter/index'

// style
import style from './index.css'

const data = new Array(30).fill({
  building: '1栋-101',
  room: '两室两厅',
  type: '98m²',
  price: '158.50万',
  id: 3
})

class App extends Component {
  state = {
    refreshing: false
  }

  getHouseUnit = async () => {
    let [err, res] = await axios.post(url.server + api.getHouseUnit)

    if (err) {
      return [err]
    }

    let { code, message, data } = res

    if ( code !== '0') {
      return [message || '获取楼盘栋数失败']
    }

    return [null, data]
  }

  getHouseType = async () => {
    let [err, res] = await axios.post(url.server + api.getHouseType)

    if (err) {
      return [err]
    }

    let { code, message, data } = res

    if ( code !== '0') {
      return [message || '获取楼盘户型失败']
    }

    return [null, data]
  }

  render () {
    return (
      <Fragment>
        <Header
          icon = { <Icon type = 'back_android' /> }
          onLeftClick = { () => this.props.history.go(-1) }
        >
          <span className = { style.title  }>
            房源
            <span className = { style['title-sub'] }>（共51套）</span>
          </span>
        </Header>
        <Content>
          <Filter />
          <div className = { style['list'] }>
            {
              data.map((v, i) => {
                return (
                  <Flex
                    key = { i }
                    className = { style['list-item'] }
                    onClick = {
                      e => {
                        this.props.history.push(`${ this.props.match.url }/${ v.id }/detail`)
                      }
                    }
                  >
                    <Flex.Item>{ v.building }</Flex.Item>
                    <Flex.Item>{ v.room }</Flex.Item>
                    <Flex.Item>{ v.type }</Flex.Item>
                    <Flex.Item>{ v.price }</Flex.Item>
                  </Flex>
                )
              })
            }
          </div>
        </Content>
      </Fragment>
    )
  }
}

export default App