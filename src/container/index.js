import React, { Component, Fragment } from 'react'
import cs from 'classnames'
import _ from 'lodash'
import PropTypes from 'prop-types'

// component
import {
  SearchBar,
  Flex,
  Grid,
  Badge,
  PullToRefresh,
  Toast,
  Popover
} from 'antd-mobile'

import { Row, Col } from '../component/grid/index'
import Icon from '../component/icon/index'
import { Header, Content } from '../component/layout/index'

class App extends Component {
  state = {
    searchValue: '',
    visibleAdd: false
  }

  handleSearchChange = v => {
    this.setState({ searchValue: v })
  }

  handleItemClick = (data, e) => {
    this.props.history.push(`${ this.props.match.url }/${ data.link }`)
  }

  render () {
    const data = [{
      text: '领导首页',
      link: 'lead_index'
    }, {
      text: '成员首页',
      link: 'member_index'
    }, {
      text: '统计',
      link: 'statistics'
    }, {
      text: '任务',
      link: 'task'
    }, {
      text: '房源',
      link: 'housing'
    }, {
      text: '房源(管理员)',
      link: 'housing_console'
    }, {
      text: '业绩',
      link: 'achievement'
    }, {
      text: '公告',
      link: 'notice'
    }, {
      text: '楼盘动态',
      link: 'housing_dynamic'
    }, {
      text: '房贷计算器',
      link: 'mortgage_calculator'
    }, {
      text: '客户管理',
      link: 'customer_management'
    }]

    return (
      <Fragment>
        <Header
          hasBorder = { true }
          onLeftClick = { () => console.log('onLeftClick') }
          leftContent = { <span style = { { fontSize: '0.5867rem', color: '#222' } }>绿色家园</span> }
          rightContent = { [
            <Icon key = '0' type = 'scan' />,
            <Popover
              mask
              key = '1'
              visible = { this.state.visibleAdd }
              overlay = { [
                <Popover.Item key = '0' value = 'scan' icon = { <Icon key = '1' type = 'friendadd' /> } data-seed = 'logId'>添加客户</Popover.Item>
              ] }
            >
              <Icon key = '1' type = 'add' />
            </Popover>
          ] }
        />
        <Content>
          <SearchBar
            value = { this.state.searchValue }
            placeholder = '搜索'
            onSubmit = { value => console.log(value, 'onSubmit') }
            onClear = { value => console.log(value, 'onClear') }
            onFocus = { () => console.log('onFocus') }
            onBlur = { () => console.log('onBlur') }
            onCancel = { () => { this.setState({ searchValue: '' }) } }
            onChange = { this.handleSearchChange }
          />
          <div className = 'workBench-index-wrap' >
            <Flex wrap = 'wrap' style = { { margin: '-0.1067rem -0.1067rem', overflow: 'visible' } }>
              {
                data.map((v, i) => <Item key = { i } data = { v } onItemClick = { this.handleItemClick } />)
              }
            </Flex>
          </div>
        </Content>
      </Fragment>
    )
  }
}

const Item = props => (
  <div className = 'workBench-index-wrap-col'>
    <div className = 'workBench-index-box-item' onClick = { e => { props.onItemClick(props.data, e) } }>
      <div className = 'workBench-index-box-item-title'>{ props.data.text }</div>
      <div className = 'workBench-index-box-item-icon'></div>
      <Badge dot = { _.random(1) === 0 } text = '12' />
    </div>
  </div>
)

export default App