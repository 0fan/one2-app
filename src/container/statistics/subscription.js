import React, { Component, Fragment } from 'react'
import moment from 'moment'

import { DatePicker } from 'antd-mobile'
import { Header, Content } from '../../component/layout/index'
import Icon from '../../component/icon/index'
import Tab from '../../component/tab/index'

import Box from './box'
import List from './list'

import style from './index.css'

const tab = [{
  title: '团队'
}, {
  title: '小组'
}, {
  title: '个人'
}]

const data = [{
  a: '团队A',
  b: '98.00万元',
  c: '30笔'
}, {
  a: '团队B',
  b: '98.00万元',
  c: '30笔'
}, {
  a: '团队A',
  b: '98.00万元',
  c: '30笔'
}, {
  a: '团队B',
  b: '98.00万元',
  c: '30笔'
}]

const column = [{
  field: '',
  format: (v, i, r) => <span style = { i < 3 ? { color: '#F43347' } : {} }>{ i + 1 }</span>
}, {
  field: 'a'
}, {
  field: 'b'
}, {
  field: 'c'
}]

const data1 = [{
  before: (
    <div className = { style['list-item-before'] }>
      <span>2018.03.01</span>
      <span>置业顾问：林俊杰</span>
    </div>
  ),
  a: '乔森',
  b: '1-1005',
  c: '1,000.00'
}, {
  before: (
    <div className = { style['list-item-before'] }>
      <span>2018.03.01</span>
      <span>置业顾问：林俊杰</span>
    </div>
  ),
  a: '乔森',
  b: '1-1005',
  c: '1,000.00'
}]

const column1 = [{
  field: 'a',
  format: (v, i, r) => (
    <Fragment>
      <div className = { style['list-item-title'] }>客户姓名</div>
      <div>{ v }</div>
    </Fragment>
  )
}, {
  field: 'b',
  format: (v, i, r) => (
    <Fragment>
      <div className = { style['list-item-title'] }>认购房号</div>
      <div>{ v }</div>
    </Fragment>
  )
}, {
  field: 'b',
  format: (v, i, r) => (
    <Fragment>
      <div className = { style['list-item-title'] }>认购金额</div>
      <div>{ v }</div>
    </Fragment>
  )
}]

export default class App extends Component {
  state = {
    activeIndex: 0,
    visible: false,
    filterDate: new Date()
  }

  render () {
    return (
      <Fragment>
        <Header
          icon = { <Icon type = 'back_android' /> }
          onLeftClick = { () => this.props.history.go(-1) }
        >
          交易统计
        </Header>
        <Content>
          <div className = { style.filter }>
            <span onClick = { e => { this.setState({ visible: true }) } }>
              { moment(this.state.filterDate).format('YYYY年MM月') }
              <Icon type = 'unfold' />
            </span>
          </div>
          <div className = { style['top-box'] }>
            <Box
              header = '莎莎'
              type = 'blue'
              data = { [{
                title: '认购金额',
                text: '1,000.00万元'
              }, {
                title: '认购笔数',
                text: '220笔'
              }] }
            />
          </div>
          <Tab
            tab = { tab }
            type = 'left'
            activeIndex = { this.state.activeIndex }
            onChange = { i => { this.setState({ activeIndex: i }) } }
          >
            <div className = { style['tab-content'] }>
              <List
                data = { data }
                column = { column }
              />
            </div>
            <div className = { style['tab-content'] }>2</div>
            <div className = { style['tab-content'] }>
              <List
                data = { data1 }
                column = { column1 }
              />
            </div>
          </Tab>
        </Content>
        <DatePicker
          mode = 'month'
          visible = { this.state.visible }
          value = { this.state.filterDate }
          onOk = { v => this.setState({ filterDate: v, visible: false }) }
          onDismiss = { () => this.setState({ visible: false }) }
        />
      </Fragment>
    )
  }
}