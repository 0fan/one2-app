import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import cs from 'classnames'
import _ from 'lodash'
import PropTypes from 'prop-types'
import { TextareaItem, ImagePicker, List, SearchBar } from 'antd-mobile'

import Icon from '../../component/icon/index'
import { Header, Content } from '../../component/layout/index'

import style from './index.css'

const Item = List.Item

export default class App extends Component {
  state = {
    normalData: {
      A: [{
        name: '阿凡提',
        start: false
      }, {
        name: '阿凡达',
        start: false
      }]
      , B: [{
        name: '白痴',
        start: false
      }]
    },
    starData: [{
      name: '李白'
    }, {
      name: '杜甫'
    }, {
      name: '李清照'
    }]
  }

  render () {
    const normalData = this.state.normalData
    const starData = this.state.starData

    return (
      <Fragment>
        <Header
          hasBorder = { true }
          icon = { <Icon type = 'back_android' /> }
          onLeftClick = { () => this.props.history.go(-1) }
        >
          分配置业顾问
        </Header>
        <Content>
          <SearchBar placeholder = '搜索' maxLength = { 8 } />
          <List
            renderHeader = { () => <span>绿色家园 - 客户 - 跟进中的客户 <span className = { style['list-header-right'] }>共<span className = { style['list-header-count'] }>46</span>人</span></span> }
            className = { style['my-list'] }>
            {
              starData.map(val => (
                <StartItem
                  key = { val }
                  data = { val } />
              ))
            }
            {
              Object.keys(normalData).map(key => (
                <Fragment key = { key } >
                  <ItemSpace  >
                    { key }
                  </ItemSpace>
                  {
                    normalData[key].map(val => (
                      <NormalItem
                        key = { val }
                        data = { val } />
                    ))
                  }
                </Fragment>
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
    className = { cs(style['my-item'], style['count-item']) }
    thumb = 'https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png'
    extra = { props.data.count }
    arrow = 'horizontal'
    onClick = { () => {} }>{ props.data.title }</Item>
)

const NormalItem = props => (
  <Item
    className = { cs(style['my-item'], style['count-item']) }
    thumb = 'https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png'
    onClick = { () => {} }>{ props.data.name }</Item>
)

const StartItem = props => (
  <Item
    extra = { <Icon type = 'favor' /> }
    className = { cs(style['my-item'], style['start-item']) }
    thumb = 'https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png'
    onClick = { () => {} }>{ props.data.name }</Item>
)

const ItemSpace = props => (
  <div className = { style['item-space'] }>
    <div className = { style['item-space-text'] }>{ props.children }</div>
  </div>
)