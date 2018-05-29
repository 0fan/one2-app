import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import cs from 'classnames'
import _ from 'lodash'
import PropTypes from 'prop-types'

import { TextareaItem, ImagePicker, List } from 'antd-mobile'

import Search from '../../component/search/index'
import Icon from '../../component/icon/index'
import { Header, Content } from '../../component/layout/index'

import style from './index.css'

const Item = List.Item

export default class App extends Component {
  state = {
    data: [{
      title: '待跟进的客户',
      type: 1,
      count: 50
    }, {
      title: '跟进中的客户',
      count: 48
    }, {
      title: '存款证明的客户',
      count: 136
    }, {
      title: '认购的客户',
      count: 20
    }, {
      title: '签约的客户',
      count: 80
    }]
  }

  handleClick = (v, i, e) => {
    console.log(v)
  }

  render () {
    return (
      <Fragment>
        <Header
          hasBorder = { true }
          icon = { <Icon type = 'back_android' /> }
          onLeftClick = { () => this.props.history.go(-1) }
        >
          客户管理
        </Header>
        <Content>
          <Search placeholder = '搜索' />
          <List
            renderHeader = { () => '绿色家园 - 客户' }
            className = { style['list'] }>
            {
              this.state.data.map((v, i) => (
                <CountItem
                  key = { i }
                  data = { v }
                  onClick = { e => { this.handleClick(v, i, e) } }
                />
              ))
            }
          </List>
        </Content>
      </Fragment>
    )
  }
}

const CountItem = props => (
  <Item
    className = { cs(style['item'], style['count-item']) }
    thumb = 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2313325497,537951187&fm=27&gp=0.jpg'
    extra = { <span style = { props.data.type === 1 ? { color: '#F43347' } : {} }>{ props.data.count }</span> }
    arrow = 'horizontal'
    onClick = { e => props.onClick(e) }
  >
    { props.data.title }
  </Item>
)