import React, { Component, Fragment } from 'react'
import cs from 'classnames'

import { Row, Col } from '../../component/grid/index'
import Spacer from '../../component/spacer/index'

import style from './box.css'

export default class App extends Component {
  static defaultProps = {
    title: '',
    data: [],
    onSelect: f => f,
    onItemClick: f => f
  }

  getUnitHeader = status => {
    switch (status) {
      case 0:
        return <div className = { cs(style['unit-status'], style['unit-status-normal']) }>待售</div>
      case -1:
        return <div className = { cs(style['unit-status'], style['unit-status-control']) }>销控</div>
      case 1:
        return <div className = { cs(style['unit-status'], style['unit-status-contract']) }>签约</div>
      case 2:
        return <div className = { cs(style['unit-status'], style['unit-status-subscription']) }>认购</div>
      case 3:
        return <div className = { cs(style['unit-status'], style['unit-status-lock']) }>锁定</div>
      default:
        return null
    }
  }

  getBoxClass = (status, select, selected) => {
    switch (status) {
      case 0:
        return cs(style['unit'], style['unit-normal'], { [style['unit-select']]: select, [style['unit-selected']]: selected })
      case -1:
        return cs(style['unit'], style['unit-control'], { [style['unit-select']]: select, [style['unit-selected']]: selected })
      case 1:
        return cs(style['unit'], style['unit-contract'], { [style['unit-select']]: select, [style['unit-selected']]: selected })
      case 2:
        return cs(style['unit'], style['unit-subscription'], { [style['unit-select']]: select, [style['unit-selected']]: selected })
      case 3:
        return cs(style['unit'], style['unit-lock'], { [style['unit-select']]: select, [style['unit-selected']]: selected })
      default:
        return ''
    }
  }

  render () {
    const {
      select,
      title,
      children,
      onSelect,
      onItemClick,
      data,
      ...others
    } = this.props

    return (
      <Fragment>
        <div className = { style.box } { ...others }>
          <div className = { style['box-header'] }>{ title }</div>
          <div className = { style['box-body'] }>
            <Row gutter = { 20 }>
              {
                data.map((v, i) => (
                  <Col span = { 6 } key = { i }>
                    <div className = { this.getBoxClass(v.status, select, v.select) } onClick = { e => { select ? onSelect(v, i, e) : onItemClick(v, i, e) } }>
                      <div className = { style['unit-header'] }>
                        { this.getUnitHeader(v.status) }
                      </div>
                      <div className = { style['unit-body'] }>
                        <span className = { style['unit-room'] }><em>106</em>房</span>
                      </div>
                    </div>
                  </Col>
                ))
              }
            </Row>
          </div>
        </div>
        <Spacer />
      </Fragment>
    )
  }
}