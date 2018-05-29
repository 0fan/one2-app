import React, { Component } from 'react'
import { connect } from 'react-redux'
import cs from 'classnames'
import _ from 'lodash'
import PropTypes from 'prop-types'

import Icon from '../../component/icon/index'
import { Row, Col } from '../../component/grid/index'

import { switchLoanType, inputResult } from '../../redux/calculator'

import style from './index.css'

@connect(state => ({
  calculator: state.calculator
}), {
  switchLoanType,
  inputResult
})
export default class App extends Component {
  handleSwitch = () => {
    const { loanType } = this.props.calculator

    this.props.switchLoanType(loanType === 0 ? 1 : 0)
  }


  render () {
    const {
      // 每月还款金额
      amount,
      // 还款日
      repaymentDate,
      // 贷款额度
      loan,
      // 支付利息
      interest,
      // 总还款额度
      total,
      // 还款月数
      period,
      // 每月递减金额
      reduce
    } = this.props.calculator.result

    const { type, calcType, loanType } = this.props.calculator

    return (
      <div className = { style.result }>
        <div className = { style['result-switch'] } onClick = { this.handleSwitch }>
          {
            loanType === 0 ?
              '等额本息' :
              '等额本金'
          }
          <Icon type = 'order' style = { { transform: 'rotate(90deg)', marginLeft: '4px' } } />
        </div>
        <div className = { style['result-header'] }>
          <h1><sub>{ loanType === 1 ? '第1月还款' : '' }</sub> { amount.toFixed(2) } <sub>元</sub></h1>
          <div className = { style['result-header-sub-title'] }>
            { repaymentDate ? `每月${ repaymentDate }号还款` : '' }
            { loanType === 1 ? `(每月递减${ reduce.toFixed(2) }元)` : '' }
          </div>
        </div>
        <div className = { style['result-content'] }>
          <Row>
            <Col span = { 12 }>
              <div className = { style['result-item'] }>
                <div className = { style['result-item-title'] }>{ loan }万</div>
                <div className = { style['result-item-text'] }>贷款总额</div>
              </div>
            </Col>
            <Col span = { 12 }>
              <div className = { style['result-item'] }>
                <div className = { style['result-item-title'] }>{ interest.toFixed(2) }万</div>
                <div className = { style['result-item-text'] }>支付利息</div>
              </div>
            </Col>
            <Col span = { 12 }>
              <div className = { style['result-item'] }>
                <div className = { style['result-item-title'] }>{ total.toFixed(2) }万</div>
                <div className = { style['result-item-text'] }>还款总额</div>
              </div>
            </Col>
            <Col span = { 12 }>
              <div className = { style['result-item'] }>
                <div className = { style['result-item-title'] }>{ period * 12 }个月</div>
                <div className = { style['result-item-text'] }>还款月数</div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}