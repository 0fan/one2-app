import React, { Component, Fragment } from 'react'
import _ from 'lodash'
import cs from 'classnames'

import { Modal, Toast } from 'antd-mobile'
import { Header, Content } from '../../component/layout/index'
import Icon from '../../component/icon/index'
import { Row, Col } from '../../component/grid/index'
import Spacer from '../../component/spacer/index'
import Box from './box'

import style from './building.css'

const alert = Modal.alert

const focus = [{
  title: '待售',
  text: '1套 占20%'
}, {
  title: '签约',
  text: '50套 占2%'
}, {
  title: '认购',
  text: '500套 占20%'
}, {
  title: '锁定',
  text: '50套 占20%'
}, {
  title: '销控',
  text: '50套 占20%'
}]

const data = new Array(5).fill(0).map((v, i) => ({
  floor: i + 1,
  data: new Array(_.random(1, 10)).fill(0).map((_v, _i) => ({
    status: _.random(-1, 3),
    select: false,
    id: `${ i }${ _i }`
  }))
}))

export default class App extends Component {
  state = {
    select: false,
    status: 0,
    data: data
  }

  handleOpen = e => {
    this.setState({
      select: true,
      status: 1
    })
  }

  handleClose = e => {
    this.setState({
      select: true,
      status: -1
    })
  }

  handleReset = (type, e) => {
    Toast.loading(`${ type === 0 ? '收回' : '放出' }中`)

    this.setState({
      select: false,
      status: 0
    })

    setTimeout(() => {
      Toast.hide()

      alert('提示', `已${ type === 0 ? '收回' : '放出' }选中的待售房源`, [
        { text: '确定' }
      ])
    }, 3000)
  }

  getToolBar = () => {
    // 正常状态
    if (this.state.status === 0) {
      return (
        <Row>
          <Col span = { 12 }>
            <div className = { cs(style['toolbar-btn'], style['toolbar-btn-blue']) } onClick = { this.handleClose }>收盘</div>
          </Col>
          <Col span = { 12 }>
            <div className = { cs(style['toolbar-btn'], style['toolbar-btn-red']) } onClick = { this.handleOpen }>放盘</div>
          </Col>
        </Row>
      )
    }

    // 收盘
    if (this.state.status === -1) {
      return (
        <Row>
          <Col span = { 24 }>
            <div className = { cs(style['toolbar-btn'], style['toolbar-btn-blue']) } onClick = { e => this.handleReset(0, e) }>收回已选</div>
          </Col>
        </Row>
      )
    }

    // 收盘
    if (this.state.status === 1) {
      return (
        <Row>
          <Col span = { 24 }>
            <div className = { cs(style['toolbar-btn'], style['toolbar-btn-red']) } onClick = { e => this.handleReset(1, e) }>放出已选</div>
          </Col>
        </Row>
      )
    }

    return null
  }

  handleSelect = (x, y, v) => {
    const data = this.state.data.slice()
    data[x].data[y].select = !data[x].data[y].select

    this.setState({
      data
    })
  }

  handleClick = (x, y, v) => {
    console.log(v)
    this.props.history.push(`${ this.props.match.url }/${ v.id }`)
  }

  render () {
    const building = this.props.match.params.building

    return (
      <Fragment>
        <Header
          icon = { <Icon type = 'back_android' /> }
          onLeftClick = { () => this.props.history.go(-1) }
        >
          房源明细
        </Header>
        <Content style = { { bottom: '1.3867rem' } }>
          <div className = { style.title }>
            金色海岸
            <i></i>
            一期
            <i></i>
            1栋
          </div>
          <div className = { style.focus }>
            <div className = { style['focus-wrap'] }>
              {
                focus.map((v, i) => (
                  <div className = { style['focus-item'] } key = { i }>
                    <div className = { style['focus-item-title'] }>{ v.title }</div>
                    <div className = { style['focus-item-text'] }>{ v.text }</div>
                  </div>
                ))
              }
            </div>
          </div>
          <Spacer />
          {
            this.state.data.map((v, i) => (
              <Box
                select = { this.state.select }
                key = { i }
                title = { `${ v.floor }层` }
                data = { v.data }
                onSelect = { (_v, _i, _e) => { this.handleSelect(i, _i, _v) } }
                onItemClick = { (_v, _i, _e) => { this.handleClick(i, _i, _v) } }
              />
            ))
          }
        </Content>
        <div className = { style.toolbar }>
          { this.getToolBar() }
        </div>
      </Fragment>
    )
  }
}