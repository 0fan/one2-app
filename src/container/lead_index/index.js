import React, { Component, Fragment } from 'react'
import cs from 'classnames'
import { Link } from 'react-router-dom'
import _ from 'lodash'

import { Badge, ListView, PullToRefresh } from 'antd-mobile'
import { Header, Content } from '../../component/layout/index'
import Icon from '../../component/icon/index'
import Search from '../../component/search/index'

import style from './index.css'

const data = [{
  text: '客户管理',
  notice: 0,
  dot: false,
  type: 'customer',
  link: 'customer_management'
}, {
  text: '房源',
  notice: 1,
  dot: true,
  type: 'housing',
  link: 'housing'
}, {
  text: '公告',
  notice: 12,
  dot: false,
  type: 'notice',
  link: 'notice'
}, {
  text: '楼盘动态',
  notice: 12,
  dot: true,
  type: 'dynamic',
  link: 'housing_dynamic'
}, {
  text: '房贷计算器',
  notice: 0,
  dot: false,
  type: 'calculator',
  link: 'mortgage_calculator'
}]

export default class App extends Component {
  constructor (props) {
    super(props)

    const getSectionData = (dataBlob, sectionID) => dataBlob[sectionID]
    const getRowData = (dataBlob, sectionID, rowID) => dataBlob[rowID]

    const dataSource = new ListView.DataSource({
      getRowData,
      getSectionHeaderData: getSectionData,
      rowHasChanged: (row1, row2) => row1 !== row2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2
    })

    this.state = {
      dataSource,
      refreshing: false
    }
  }

  renderRow = (rowData, sectionID, rowID, highlightRow) => {
    console.log(rowData, sectionID, rowID, highlightRow)
    return (
      <div key = { rowID }>{ rowID }</div>
    )
  }

  render () {
    const { url } = this.props.match

    return (
      <div className = { style.page }>
        <div className = { style.header }>
          <div className = { style['header-left'] }>绿色家园</div>
        </div>
        <div className = { style.body }>
          <Search />
          <div className = { style.box }>
            <div className = { style['box-header'] }>
              <div className = { style['box-header-left'] }>2018年03月27日</div>
              <div className = { style['box-header-right'] } onClick = { this.boxHandler }>
                <Icon type = 'right' />
              </div>
            </div>
            <div className = { style['box-body'] }>
              <div className = { style['box-list'] }>
                <div className = { style['box-item'] }>
                  <div className = { style['box-item-title'] }>新增接待客户<sub>（人）</sub></div>
                  <div className = { style['box-item-text'] }>113</div>
                </div>
                <div className = { style['box-item'] }>
                  <div className = { style['box-item-title'] }>认购总额<sub>（万元）</sub></div>
                  <div className = { style['box-item-text'] }>4,111.90</div>
                </div>
                <div className = { style['box-item'] }>
                  <div className = { style['box-item-title'] }>签约总额<sub>（万元）</sub></div>
                  <div className = { style['box-item-text'] }>4,111.90</div>
                </div>
                <div className = { style['box-item'] }>
                  <div className = { style['box-item-title'] }>存款证明笔数</div>
                  <div className = { style['box-item-text'] }>237</div>
                </div>
                <div className = { style['box-item'] }>
                  <div className = { style['box-item-title'] }>认购笔数</div>
                  <div className = { style['box-item-text'] }>237</div>
                </div>
                <div className = { style['box-item'] }>
                  <div className = { style['box-item-title'] }>签约笔数</div>
                  <div className = { style['box-item-text'] }>237</div>
                </div>
              </div>
            </div>
          </div>
          <div className = { style.title }>团队应用</div>
          <div className = { style.list }>
            {
              data.map((v, i) => (
                <Link className = { cs(style.item, style[`item-${ v.type }`]) } key = { i } to = '/'>
                  <div className = { style['item-icon'] }>
                    <Badge text = { v.notice } dot = { v.dot } />
                  </div>
                  <div className = { style['item-title'] }>{ v.text }</div>
                </Link>
              ))
            }
          </div>
          <ListView
            dataSource = { this.state.dataSource }
            renderRow = { this.renderRow }
          />
        </div>
      </div>
    )
  }
}