import React, { Component, Fragment } from 'react'
import cs from 'classnames'
import _ from 'lodash'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { DatePicker } from 'antd-mobile'
import { Header, Content } from '../../component/layout/index'
import Icon from '../../component/icon/index'

import style from './index.css'

import echarts from 'echarts'

export default class App extends Component {
  state = {
    filterDate: new Date(),
    active: false
  }

  chart = null

  componentDidMount () {
    this.chart = echarts.init(this.el)

    this.chart.setOption({
      tooltip: {},
      legend: {
        orient: 'vertical',
        x: 'right',
        y: 'center',
        data: ['签约', '认购', '待售', '锁定', '销控']
      },
      series: [{
        radius: [0, 100],
        center: [110, '50%'],
        name: '销量',
        type: 'pie',
        label: false,
        data: [{
          value: 35,
          name: '签约'
        }, {
          value: 100,
          name: '认购'
        }, {
          value: 30,
          name: '待售'
        }, {
          value: 30,
          name: '锁定'
        }, {
          value: 30,
          name: '销控'
        }]
      }]
    })
  }

  handleFilterTime = (cb) => {
    this.setState({ active: !this.state.active })
    cb && cb()
  }

  render () {
    const CustomChildren = ({ extra, onClick, children }) => (
      <div className = { style['filter-time'] } >
        <span onClick = { e => { this.handleFilterTime(onClick) } }>
          { `${ this.state.filterDate.getFullYear() }年${ this.state.filterDate.getMonth() }月` }
          <Icon type = { 'unfold' } />
        </span>
      </div>
    )

    return (
      <Fragment>
        <Header
          icon = { <Icon type = 'back_android' /> }
          onLeftClick = { () => this.props.history.go(-1) }
          className = { style.header }
        >
          公告
        </Header>
        <Content className = { style.content }>
          <div className = { style.box }>
            <div className = { style['box-header'] }>
              <DatePicker
                mode = 'month'
                title = '选择时间'
                value = { this.state.filterDate }
                onChange = { v => this.setState({ filterDate: v }) }
                onDismiss = { () => { this.setState({ active: false }) } }
                extra = 'click to choose'
              >
                <CustomChildren>{ this.state.filterDate }</CustomChildren>
              </DatePicker>
            </div>
            <div className = { style['box-body'] }>
              <div className = { style['title'] }>新增客户统计</div>
              <div className = { style['shadow-box'] }>
                <div className = { style['shadow-box-item'] }>
                  <div className = { style['shadow-box-item-title'] }>88人</div>
                  <div className = { style['shadow-box-item-text'] }>新增接待客户</div>
                </div>
                <div className = { style['shadow-box-item'] }>
                  <div className = { style['shadow-box-item-title'] }>100人</div>
                  <div className = { style['shadow-box-item-text'] }>日均新增客户</div>
                </div>
              </div>
              <Spacer />
              <div className = { style['title'] }>交易统计</div>
              <div className = { style['angle-box'] }>
                <div className = { style['angle-box-content'] }>
                  <div className = { style['angle-box-item'] }>
                    <span>认购金额：</span>1000人
                  </div>
                  <div className = { style['angle-box-item'] }>
                    <span>认购笔数：</span>888笔
                  </div>
                </div>
                <div className = { style['angle-box-right'] }>
                  <Link to = '/workbench/statistics/subscription'>查看</Link>
                </div>
              </div>
              <div className = { style['angle-box'] }>
                <div className = { style['angle-box-content'] }>
                  <div className = { style['angle-box-item'] }>
                    <span>签约金额：</span>10,000.00万元
                  </div>
                  <div className = { style['angle-box-item'] }>
                    <span>认购笔数：</span>888笔
                  </div>
                </div>
                <div className = { style['angle-box-right'] }>
                  <Link to = '/'>查看</Link>
                </div>
              </div>
              <div className = { style['angle-box'] }>
                <div className = { style['angle-box-content'] }>
                  <div className = { style['angle-box-item'] }>
                    <span>存款证明笔数：</span>888笔
                  </div>
                </div>
                <div className = { style['angle-box-right'] }>
                  <Link to = '/'>查看</Link>
                </div>
              </div>
              <Spacer />
              <div className = { style['title'] }>房源统计</div>
              <div className = { style['chart'] } ref = { el => this.el = el }></div>
            </div>
          </div>
        </Content>
      </Fragment>
    )
  }
}

const Spacer = props => <div className = { style['spacer'] }></div>