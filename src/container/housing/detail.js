import React, { Component, Fragment } from 'react'
import cs from 'classnames'
import _ from 'lodash'
import PropTypes from 'prop-types'

import { WhiteSpace, List, Button } from 'antd-mobile'
import { Header, Content } from '../../component/layout/index'
import Icon from '../../component/icon/index'

import style from './detail.css'

class Detail extends Component {
  render () {
    return (
      <Fragment>
        <Header
          icon = { <Icon type = 'back_android' /> }
          onLeftClick = { () => this.props.history.go(-1) }
        >
          房源详情
        </Header>
        <Content grey style = { { paddingBottom: '2.4rem' } }>
          <WhiteSpace size = 'sm' />
          <List>
            <List.Item className = { style.list } style = { { fontSize: '0.4267rem;' } }>新鸥鹏教育城【一期1-101】</List.Item>
          </List>
          <WhiteSpace size = 'sm' />
          <List>
            <List.Item className = { style.list }>
              <div className = { style['list-title'] }>房源总价</div>
              1,000,000 元
            </List.Item>
            <List.Item className = { style.list }>
              <div className = { style['list-title'] }>套内单价</div>
              1,000,000 元
            </List.Item>
            <List.Item className = { style.list }>
              <div className = { style['list-title'] }>套内面积</div>
              83m²
            </List.Item>
            <List.Item className = { style.list }>
              <div className = { style['list-title'] }>建筑单价</div>
              10,000 元
            </List.Item>
            <List.Item className = { style.list }>
              <div className = { style['list-title'] }>建筑面积</div>
              100m²
            </List.Item>
            <List.Item className = { style.list }>
              <div className = { style['list-title'] }>户型结构</div>
              三室两厅
            </List.Item>
            <List.Item className = { style.list }>
              <div className = { style['list-title'] }>户型图</div>
              <img src = 'https://www.baidu.com/img/bd_logo1.png' style = { { width: '4.2667rem', height: '3.2rem' } } />
            </List.Item>
          </List>
        </Content>
        <Button
          size = 'large'
          type = 'primary'
          className = { style['fixed-btn'] }
        >
          房贷计算器
        </Button>
      </Fragment>
    )
  }
}

export default Detail