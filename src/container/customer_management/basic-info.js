import React, { Component, Fragment } from 'react'
import cs from 'classnames'
import _ from 'lodash'
import PropTypes from 'prop-types'

import { WhiteSpace, Badge, Button, Carousel, List } from 'antd-mobile'
import Icon from '../../component/icon/index'
import { Header, Content } from '../../component/layout/index'

import style from './detail.css'

const Item = List.Item

export default class App extends Component {
  state = {
    data: [{
      title: '购房意向',
      text: '高意向'
    }, {
      title: '关注因素',
      text: '户型、价格、周边配套'
    }, {
      title: '需求面积',
      text: '70m2 - 90m2'
    }, {
      title: '年龄',
      text: '20-30'
    }, {
      title: '居住地区',
      text: '重庆江北区'
    }, {
      title: '来源途径',
      text: '--'
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
          基本资料
        </Header>
        <Content style = { { paddingBottom: '1.2533rem' } }>
          <div className = { style.focus }>
            <div className = { style['focus-content'] }>
              <div className = { style['focus-avater'] }></div>
              <div className = { style['focus-main'] }>
                <div className = { style['focus-title'] }>莎莎</div>
                <div className = { style['focus-text'] }>136 1880 0110</div>
              </div>
              <Icon type = 'mobile' className = { style['focus-contact'] } />
            </div>
          </div>
          <List className = { style['detail-list'] } >
            { this.state.data.map(val => (
              <DetailItem
                key = { val }
                data = { val }
              />
            )) }
          </List>
          <Spacer />
          <Button type = 'primary' className = { style.submit }>
            跟进
          </Button>
        </Content>
      </Fragment>
    )
  }
}

const Spacer = props => <div className = { style.spacer }></div>

const DetailItem = props => (
  <Item
    className = { style['detail-item'] }
    extra = { props.data.text }
    onClick = { () => {} }>{ props.data.title }</Item>
)