import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import cs from 'classnames'
import _ from 'lodash'
import moment from 'moment'

import { List, Slider, Picker, Button, Toast } from 'antd-mobile'
import Icon from '../../component/icon/index'
import Tab from '../../component/tab/index'
import Switch from '../../component/switch/index'
import Spacer from '../../component/spacer/index'

import { switchType, inputCombine } from '../../redux/calculator'

import style from './index.css'

const date = [
  Array(31).fill(0).map((v, i) => ({
    label: i + 1 + '日',
    value: i + 1
  }))
]

const getInterestRateSwitchIndex = (r, v) => r.reduce((_a, _v,  _i) => _v.text === v ? _i : _a, r.length)

const getInterestRateSwitchValue = (r, v) => r.reduce((_a, _v, _i) => v === _i ? _v.text : _a, '')

// 默认商业利率
const defaultBusinessInterestRate = [{
  title: '基准利率',
  text: 4.9
}]

// 默认公积金利率
const defaultProvidentInterestRate = [{
  title: '公积金利率',
  text: 3.5
}]

@connect(state => ({
  calculator: state.calculator
}), {
  switchType,
  inputCombine
})
export default class App extends Component {
  $total = null
  $business = null
  $provident = null
  $businessInterestRate = null
  $providentInterestRate = null
  $repaymentDate = null

  state = {
    // 贷款总额
    total: '',
    // 商业贷款
    business: '',
    // 公积金贷款
    provident: '',
    // 商业利率
    businessInterestRate: 4.9,
    // 是否是商业贷款默认利率
    isDefaultBusinessInterestRate: true,
    // 公积金利率
    providentInterestRate: 3.5,
    // 是否是公积金贷款默认利率
    isDefaultProvidentInterestRate: true,
    // 贷款年限
    period: 20,
    // 还款日
    repaymentDate: ''
  }

  componentDidMount () {
    const { combine } = this.props.calculator

    this.props.switchType('combine')

    this.setState(combine)

    this.$content = document.querySelector('.content')
  }

  handleChange = async (type, v) => {
    await this.setState({
      [type]: v
    })

    const total = Number(this.state.total)
    const business = Number(this.state.business)
    const provident = Number(this.state.provident)

    if (
      type === 'business' &&
      total &&
      total > 0 &&
      v &&
      v >= 0
    ) {
      this.setState({
        provident: total - business
      })
    }

    if (
      type === 'provident' &&
      total &&
      total > 0 &&
      v &&
      v >= 0
    ) {
      this.setState({
        business: total - provident
      })
    }
  }

  // 利率切换
  handleSwitchChange = (type, i, v) => {
    if (type === 'business') {
      this.setState({
        businessInterestRate: v,
        isDefaultBusinessInterestRate: i >= defaultBusinessInterestRate.length ? false : true
      })
    }

    if (type === 'provident') {
      this.setState({
        providentInterestRate: v,
        isDefaultProvidentInterestRate: i >= defaultProvidentInterestRate.length ? false : true
      })
    }
  }

  handleSubmit = () => {
    const url = this.props.match.url

    const [err, res] = this.valid()

    if (err) {
      Toast.fail(err, 3, null, false)
    } else {
      this.props.inputCombine(res)
      this.props.history.push(url.slice(0, url.lastIndexOf('/')).concat('/result'))
    }
  }

  valid = () => {
    const {
      // 贷款总额
      total,
      // 商业贷款
      business,
      // 公积金贷款
      provident,
      // 商业利率
      businessInterestRate,
      // 是否是商业贷款默认利率
      isDefaultBusinessInterestRate,
      // 公积金利率
      providentInterestRate,
      // 是否是公积金贷款默认利率
      isDefaultProvidentInterestRate,
      // 贷款年限
      period,
      // 还款日
      repaymentDate
    } = this.state

    if (!total) {
      this.$content.scrollTop = this.$total.offsetTop
      return ['请输入贷款总额']
    }

    if (isNaN(Number(total)) || Number(total) <= 0) {
      this.$content.scrollTop = this.$total.offsetTop

      return ['贷款总额格式错误']
    }

    if (!business) {
      this.$content.scrollTop = this.$business.offsetTop
      return ['请输入商业贷款']
    }

    if (isNaN(Number(business)) || Number(business) <= 0) {
      this.$content.scrollTop = this.$business.offsetTop

      return ['商业贷款格式错误']
    }

    if (!businessInterestRate) {
      this.$content.scrollTop = this.$businessInterestRate.offsetTop
      return ['请输入商业利率']
    }

    if (isNaN(Number(businessInterestRate)) || Number(businessInterestRate) <= 0) {
      this.$content.scrollTop = this.$businessInterestRate.offsetTop
      return ['商业利率格式错误']
    }

    if (!provident) {
      this.$content.scrollTop = this.$provident.offsetTop
      return ['请输入公积金贷款']
    }

    if (isNaN(Number(provident)) || Number(provident) < 0) {
      this.$content.scrollTop = this.$provident.offsetTop

      return ['公积金贷款格式错误']
    }

    if (!providentInterestRate) {
      this.$content.scrollTop = this.$providentInterestRate.offsetTop
      return ['请输入公积金利率']
    }

    if (isNaN(Number(providentInterestRate)) || Number(providentInterestRate) < 0) {
      this.$content.scrollTop = this.$providentInterestRate.offsetTop
      return ['公积金利率格式错误']
    }

    if (Number(total) !== Number(business) + Number(provident)) {
      return ['贷款额度错误']
    }

    return [null, this.state]
  }

  render () {
    return (
      <div className = { style.list }>
        <div className = { style['list-item'] } ref = { el => this.$total = el }>
          <div className = { style['list-item-title'] }>贷款总额（万）</div>
          <div className = { style['list-item-content'] }>
            <div className = { style['list-item-static'] }>
              <input type = 'text' autoComplete = 'off' placeholder = '请输入贷款总额' value = { this.state.total } onChange = { e => { this.handleChange('total', e.target.value) } } />
            </div>
          </div>
        </div>
        <div className = { style['list-item'] } ref = { el => this.$business = el }>
          <div className = { style['list-item-title'] }>商业贷款（万）</div>
          <div className = { style['list-item-content'] }>
            <div className = { style['list-item-static'] }>
              <input type = 'text' autoComplete = 'off' placeholder = '请输入商业贷款' value = { this.state.business } onChange = { e => { this.handleChange('business', e.target.value) } } />
            </div>
          </div>
        </div>
        <div className = { style['list-item'] }>
          <div className = { style['list-item-title'] }>商业贷款利率</div>
          <div className = { style['list-item-content'] }>
            <Switch
              data = { defaultBusinessInterestRate.concat({ title: '手动输入' }) }
              activeIndex = { getInterestRateSwitchIndex(defaultBusinessInterestRate, this.state.businessInterestRate) }
              onChange = { v => { this.handleSwitchChange('business', v, getInterestRateSwitchValue(defaultBusinessInterestRate, v)) } }
            />
          </div>
        </div>
        {
          !this.state.isDefaultBusinessInterestRate ?
            <div className = { style['list-item'] } ref = { el => this.$businessInterestRate = el }>
              <div className = { style['list-item-title'] }>商业贷款利率</div>
              <div className = { style['list-item-content'] }>
                <div className = { style['list-item-static'] }>
                  <input type = 'text' autoComplete = 'off' placeholder = '请输入利率' value = { this.state.businessInterestRate } onChange = { e => { this.handleChange('businessInterestRate', e.target.value) } } />
                </div>
              </div>
            </div> :
            null
        }
        <div className = { style['list-item'] } ref = { el => this.$provident = el }>
          <div className = { style['list-item-title'] }>公积金贷款（万）</div>
          <div className = { style['list-item-content'] }>
            <div className = { style['list-item-static'] }>
              <input type = 'text' autoComplete = 'off' placeholder = '请输入公积金贷款' value = { this.state.provident } onChange = { e => { this.handleChange('provident', e.target.value) } } />
            </div>
          </div>
        </div>
        <div className = { style['list-item'] }>
          <div className = { style['list-item-title'] }>公积金贷款利率</div>
          <div className = { style['list-item-content'] }>
            <Switch
              data = { defaultProvidentInterestRate.concat({ title: '手动输入' }) }
              activeIndex = { getInterestRateSwitchIndex(defaultProvidentInterestRate, this.state.providentInterestRate) }
              onChange = { v => { this.handleSwitchChange('provident', v, getInterestRateSwitchValue(defaultProvidentInterestRate, v)) } }
            />
          </div>
        </div>
        {
          !this.state.isDefaultProvidentInterestRate ?
            <div className = { style['list-item'] } ref = { el => this.$providentInterestRate = el }>
              <div className = { style['list-item-title'] }>公积金贷款利率</div>
              <div className = { style['list-item-content'] }>
                <div className = { style['list-item-static'] }>
                  <input type = 'text' autoComplete = 'off' placeholder = '请输入利率' value = { this.state.providentInterestRate } onChange = { e => { this.handleChange('providentInterestRate', e.target.value) } } />
                </div>
              </div>
            </div> :
            null
        }
        <div className = { style['list-item'] }>
          <div className = { style['list-item-title'] }>贷款年限(单位:年)</div>
          <div className = { style['list-item-content'] }>
            <Slider
              value = { this.state.period }
              onChange = { v => { this.handleChange('period', v) } }
              className = { style.slide }
              min = { 1 }
              max = { 30 }
            />
          </div>
        </div>
        <div className = { style['list-item'] } ref = { el => this.$repaymentDate = el }>
          <div className = { style['list-item-title'] }>每月还款日</div>
          <div className = { style['list-item-content'] }>
            <div className = { style['list-item-static'] }>
              <Picker
                data = { date }
                title = '选择日期'
                cascade = { false }
                value = { this.state.repaymentDate }
                onChange = { v => this.handleChange('repaymentDate', v) }
              >
                <CustomPickerChildren>
                  {
                    this.state.repaymentDate ?
                      this.state.repaymentDate.join('') + '日' :
                      <span style = { { color: '#CFD2D9' } }>选择日期</span>
                  }
                </CustomPickerChildren>
              </Picker>
            </div>
          </div>
        </div>
        <Button type = 'primary' className = { style.submit } onClick = { this.handleSubmit }>开始计算</Button>
      </div>
    )
  }
}

const CustomPickerChildren = props => (
  <div onClick = { props.onClick }>{ props.children }</div>
)