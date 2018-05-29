import React, { Component } from 'react'
import { createPortal } from 'react-dom'
import cs from 'classnames'
import _ from 'lodash'
import PropTypes from 'prop-types'

import { Button } from 'antd-mobile'
import { Row, Col } from '../../component/grid/index'
import style from './modal.css'

const modalRoot = document.querySelector('body')

const data = []

data[0] = [{
  text: '不限',
}, {
  text: '1层',
}, {
  text: '2层',
}]

data[1] = [{
  text: 'a',
}, {
  text: '1层',
}, {
  text: '2层',
}]

data[2] = [{
  text: 'b',
}, {
  text: '1层',
}, {
  text: '2层',
}]

class Modal extends Component {
  constructor (props) {
    super(props)

    this.el = document.createElement('div')
  }

  componentDidMount () {
    modalRoot.appendChild(this.el)
  }

  componentWillUnmount () {
    modalRoot.removeChild(this.el)
  }

  handleClick = () => {
    this.props.onItemClick && this.props.onItemClick()
  }

  render () {
    const {
      visible,
      activeIndex,
      onMaskClick
    } = this.props

    return createPortal(
      visible ?
        <div className = { style.modal }>
          <div
            className = { style['modal-mask'] }
            onClick = { e => { onMaskClick(e) } }
          >
          </div>
          <div className = { style['modal-dialog'] }>
            {
              _.isArray(data[activeIndex]) ?
                <List
                  data = { data[activeIndex] }
                  onItemClick = { e => { this.handleClick(e) } } /> :
                <Filter />
            }
          </div>
        </div> :
        null,
      this.el
    )
  }
}

const List = props => (
  <ul className = { style['pick-list'] }>
    {
      props.data.map((v, i) => (
        <li onClick = { () => { props.onItemClick && props.onItemClick() } } key = { i }>{ v.text }</li>
      ))
    }
  </ul>
)

const Filter = props => (
  <div className = { style.filter }>
    <div className = { style['filter-block'] }>
      <div className = { style['filter-title'] }>排序</div>
      <div className = { style['filter-content'] }>
        <Row gutter = { 10 }>
          <Col span = { 8 }><div className = { style['filter-item'] }>价格由高到低</div></Col>
          <Col span = { 8 }><div className = { style['filter-item'] }>价格由低到高</div></Col>
          <Col span = { 8 }><div className = { style['filter-item'] }>面积由大到小</div></Col>
          <Col span = { 8 }><div className = { style['filter-item'] }>面积由小到大</div></Col>
        </Row>
      </div>
    </div>
    <div className = { style['filter-block'] }>
      <div className = { style['filter-title'] }>总价范围</div>
      <div className = { style['filter-content'] }>
        <Row gutter = { 10 }>
          <Col span = { 11 }>
            <div className = { style['filter-form-group'] }>
              <div className = { style['filter-form-control'] }>
                <input type = 'text' autoComplete = 'off' />
              </div>
              <span>万元</span>
            </div>
          </Col>
          <Col span = { 2 }>
            <div className = { style['filter-block-spacer'] }>-</div>
          </Col>
          <Col span = { 11 }>
            <div className = { style['filter-form-group'] }>
              <div className = { style['filter-form-control'] }>
                <input type = 'text' autoComplete = 'off' />
              </div>
              <span>万元</span>
            </div>
          </Col>
        </Row>
      </div>
    </div>
    <div className = { style['filter-block'] }>
      <div className = { style['filter-title'] }>面积范围</div>
      <div className = { style['filter-content'] }>
        <Row gutter = { 10 }>
          <Col span = { 11 }>
            <div className = { style['filter-form-group'] }>
              <div className = { style['filter-form-control'] }>
                <input type = 'text' autoComplete = 'off' />
              </div>
              <span>㎡</span>
            </div>
          </Col>
          <Col span = { 2 }>
            <div className = { style['filter-block-spacer'] }>-</div>
          </Col>
          <Col span = { 11 }>
            <div className = { style['filter-form-group'] }>
              <div className = { style['filter-form-control'] }>
                <input type = 'text' autoComplete = 'off' />
              </div>
              <span>㎡</span>
            </div>
          </Col>
        </Row>
      </div>
    </div>
    <div className = { style['filter-footer'] }>
      <Row gutter = { 18 }>
        <Col span = { 12 }>
          <Button side = 'large'>重置</Button>
        </Col>
        <Col span = { 12 }>
          <Button side = 'large' type = 'primary'>重置</Button>
        </Col>
      </Row>
    </div>
  </div>
)

export default Modal