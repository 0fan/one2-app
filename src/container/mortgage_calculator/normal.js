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

import { switchType, switchCalcType, inputNormal } from '../../redux/calculator'

import style from './index.css'

const getInterestRateSwitchIndex = (v) => {
  switch (v) {
    case 4.9:
      return 0
    case 3.5:
      return 1
    default:
      return 2
  }
}

const getInterestRateSwitchValue = (v) => {
  switch (v) {
    case 0:
      return 4.9
    case 1:
      return 3.5
    default:
      return ''
  }
}

const tab = [{
  title: '按房价总额',
}, {
  title: '按单价面积',
}]

const date = [
  Array(31).fill(0).map((v, i) => ({
    label: i + 1 + '日',
    value: i + 1
  }))
]

const defaultInterestRate = [{
  title: '基准利率',
  text: 4.9
}, {
  title: '公积金利率',
  text: 3.5
}]

@connect(state => ({
  calculator: state.calculator
}), {
  switchType,
  switchCalcType,
  inputNormal
})
export default class App extends Component {
  $totalTotal = null
  $totalRepaymentDate = null
  $totalInterestRate = null

  $areaArea = null
  $areaUnitPrice = null
  $areaRepaymentDate = null
  $areaInterestRate = null

  state = {
    filterDate: null,
    activeIndex: 0,
    index: 0,

    total: {
      // 房价总额
      total: 40,
      // 首付比例
      downPaymentRate: 30,
      // 贷款年限
      period: 20,
      // 还款日
      repaymentDate: [1],
      // 利率
      interestRate: defaultInterestRate[0].text,
      // 是否是默认利率
      isDefaultInterestRate: true
    },

    area: {
      // 面积
      area: '',
      // 单价
      unitPrice: '',
      // 首付比例
      downPaymentRate: 30,
      // 贷款年限
      period: 20,
      // 还款日
      repaymentDate: '',
      // 利率
      interestRate: 4.9,
      // 是否是默认利率
      isDefaultInterestRate: true
    }
  }

  componentDidMount () {
    const { calcType, normal } = this.props.calculator

    const {
      // 面积
      area,
      // 单价
      unitPrice,
      // 房价总额
      total,
      // 首付比例
      downPaymentRate,
      // 贷款年限
      period,
      // 还款日
      repaymentDate,
      // 利率
      interestRate
    } = normal

    const isDefaultInterestRate = defaultInterestRate.filter(v => v.text === interestRate).length ? true : false

    this.$content = document.querySelector('.content')

    this.props.switchType('normal')

    if (calcType === 'total') {
      this.setState({
        total: Object.assign({}, this.state.total, {
          total,
          downPaymentRate,
          period,
          repaymentDate,
          interestRate,
          isDefaultInterestRate,
        })
      })
    } else {
      this.setState({
        area: Object.assign({}, this.state.total, {
          area,
          unitPrice,
          downPaymentRate,
          period,
          repaymentDate,
          interestRate,
          isDefaultInterestRate,
        })
      })
    }
  }

  handleTabChange = (i, e) => {
    if (i === 0) {
      this.props.switchCalcType('total')
    } else {
      this.props.switchCalcType('area')
    }
  }

  handleChange = (type, v) => {
    const { calcType } = this.props.calculator

    this.setState({
      [calcType]: Object.assign({}, this.state[calcType], {
        [type]: v
      })
    })
  }

  // 利率切换
  handleSwitchChange = (i, v) => {
    const { calcType } = this.props.calculator

    this.setState({
      [calcType]: Object.assign({}, this.state[calcType], {
        interestRate: v,
        isDefaultInterestRate: i >= defaultInterestRate.length ? false : true
      })
    })
  }

  handleSubmit = () => {
    const url = this.props.match.url
    const { calcType } = this.props.calculator

    if (calcType === 'total') {
      let [err, res] = this.validTotal()

      if (err) {
        Toast.fail(err, 3, null, false)
      } else {
        this.props.inputNormal(res)
        this.props.history.push(url.slice(0, url.lastIndexOf('/')).concat('/result'))
      }
    } else {
      let [err, res] = this.validArea()

      if (err) {
        Toast.fail(err, 3, null, false)
      } else {
        this.props.inputNormal(res)
        this.props.history.push(url.slice(0, url.lastIndexOf('/')).concat('/result'))
      }
    }
  }

  // 验证房源总价
  validTotal = () => {
    const {
      // 房价总额
      total,
      // 首付比例
      downPaymentRate,
      // 贷款年限
      period,
      // 还款日
      repaymentDate,
      // 利率
      interestRate,
      // 是否是默认利率
      isDefaultInterestRate
    } = this.state.total

    if (!total) {
      this.$content.scrollTop = this.$totalTotal.offsetTop
      return ['请输入房价总额']
    }

    if (isNaN(Number(total)) || Number(total) <= 0) {
      this.$content.scrollTop = this.$totalTotal.offsetTop

      return ['房价总额格式错误']
    }

    // if (!repaymentDate) {
    //   this.$content.scrollTop = this.$totalRepaymentDate.offsetTop
    //   return ['请输入还款日']
    // }

    if (!interestRate) {
      this.$content.scrollTop = this.$totalInterestRate.offsetTop
      return ['请输入利率']
    }

    if (isNaN(Number(interestRate)) || Number(interestRate) <= 0) {
      this.$content.scrollTop = this.$totalInterestRate.offsetTop
      return ['利率格式错误']
    }

    return [null, this.state.total]
  }

  // 验证单价面积
  validArea = () => {
    const {
      // 面积
      area,
      // 单价
      unitPrice,
      // 首付比例
      downPaymentRate,
      // 贷款年限
      period,
      // 还款日
      repaymentDate,
      // 利率
      interestRate
    } = this.state.area

    if (!area) {
      this.$content.scrollTop = this.$areaArea.offsetTop
      return ['请输入面积']
    }

    if (isNaN(Number(area)) || Number(area) <= 0) {
      this.$content.scrollTop = this.$areaArea.offsetTop
      return ['面积格式错误']
    }

    if (!unitPrice) {
      this.$content.scrollTop = this.$areaUnitPrice.offsetTop
      return ['请输入单价']
    }

    if (isNaN(Number(unitPrice)) || Number(unitPrice) <= 0) {
      this.$content.scrollTop = this.$areaUnitPrice.offsetTop
      return ['单价格式错误']
    }

    // if (!repaymentDate) {
    //   this.$content.scrollTop = this.$areaRepaymentDate.offsetTop
    //   return ['请输入还款日']
    // }

    if (!interestRate) {
      this.$content.scrollTop = this.$areaInterestRate.offsetTop
      return ['请输入利率']
    }

    if (isNaN(Number(interestRate)) || Number(interestRate) <= 0) {
      this.$content.scrollTop = this.$areaInterestRate.offsetTop
      return ['利率格式错误']
    }

    return [null, this.state.area]
  }

  render () {
    const { calcType } = this.props.calculator

    let activeIndex = calcType === 'total' ? 0 : 1

    return (
      <Tab
        tab = { tab }
        activeIndex = { activeIndex }
        onChange = { this.handleTabChange }
      >
        <Fragment>
          <Spacer />
          <div className = { style.list }>
            <div className = { style['list-item'] } ref = { el => this.$totalTotal = el }>
              <div className = { style['list-item-title'] }>房价总额（万）</div>
              <div className = { style['list-item-content'] }>
                <div className = { style['list-item-static'] }>
                  <input type = 'text' autoComplete = 'off' placeholder = '请输入房价总额' value = { this.state.total.total } onChange = { e => { this.handleChange('total', e.target.value) } } />
                </div>
              </div>
            </div>
            <div className = { style['list-item'] }>
              <div className = { style['list-item-title'] }>首付比例(单位:百分比)</div>
              <div className = { style['list-item-content'] }>
                <Slider
                  value = { this.state.total.downPaymentRate }
                  onChange = { v => { this.handleChange('downPaymentRate', v) } }
                  className = { style.slide }
                  min = { 0 }
                  max = { 100 }
                />
              </div>
            </div>
            <div className = { style['list-item'] }>
              <div className = { style['list-item-title'] }>贷款年限(单位:年)</div>
              <div className = { style['list-item-content'] }>
                <Slider
                  value = { this.state.total.period }
                  onChange = { v => { this.handleChange('period', v) } }
                  className = { style.slide }
                  min = { 1 }
                  max = { 30 }
                />
              </div>
            </div>
            <div className = { style['list-item'] } ref = { el => this.$totalRepaymentDate = el }>
              <div className = { style['list-item-title'] }>每月还款日</div>
              <div className = { style['list-item-content'] }>
                <div className = { style['list-item-static'] }>
                  <Picker
                    data = { date }
                    title = '选择日期'
                    cascade = { false }
                    value = { this.state.total.repaymentDate }
                    onChange = { v => this.handleChange('repaymentDate', v) }
                  >
                    <CustomPickerChildren>
                      {
                        this.state.total.repaymentDate ?
                          this.state.total.repaymentDate.join('') + '日' :
                          <span style = { { color: '#CFD2D9' } }>选择日期</span>
                      }
                    </CustomPickerChildren>
                  </Picker>
                </div>
              </div>
            </div>
            <div className = { style['list-item'] }>
              <div className = { style['list-item-title'] }>贷款利率(单位:百分比)</div>
              <div className = { style['list-item-content'] }>
                <Switch
                  data = { defaultInterestRate.concat({ title: '手动输入' }) }
                  activeIndex = { getInterestRateSwitchIndex(this.state.total.interestRate) }
                  onChange = { v => { this.handleSwitchChange(v, getInterestRateSwitchValue(v)) } }
                />
              </div>
            </div>
            {
              !this.state.total.isDefaultInterestRate ?
                <div className = { style['list-item'] } ref = { el => this.$totalInterestRate = el }>
                  <div className = { style['list-item-title'] }>利率</div>
                  <div className = { style['list-item-content'] }>
                    <div className = { style['list-item-static'] }>
                      <input type = 'text' autoComplete = 'off' placeholder = '请输入利率' value = { this.state.total.interestRate } onChange = { e => { this.handleSwitchChange(defaultInterestRate.length, e.target.value) } } />
                    </div>
                  </div>
                </div> :
                null
            }
            <Button type = 'primary' className = { style.submit } onClick = { this.handleSubmit }>开始计算</Button>
          </div>
        </Fragment>
        <Fragment>
          <Spacer />
          <div className = { style.list }>
            <div className = { style['list-item'] } ref = { el => this.$areaArea = el }>
              <div className = { style['list-item-title'] }>户型面积（m²）</div>
              <div className = { style['list-item-content'] }>
                <div className = { style['list-item-static'] }>
                  <input type = 'text' autoComplete = 'off' placeholder = '请输入户型面积' value = { this.state.area.area } onChange = { e => { this.handleChange('area', e.target.value) } } />
                </div>
              </div>
            </div>
            <div className = { style['list-item'] } ref = { el => this.$areaUnitPrice = el }>
              <div className = { style['list-item-title'] }>每平米单价（元）</div>
              <div className = { style['list-item-content'] }>
                <div className = { style['list-item-static'] }>
                  <input type = 'text' autoComplete = 'off' placeholder = '请输入单价' value = { this.state.area.unitPrice } onChange = { e => { this.handleChange('unitPrice', e.target.value) } } />
                </div>
              </div>
            </div>
            <div className = { style['list-item'] }>
              <div className = { style['list-item-title'] }>首付比例(单位:百分比)</div>
              <div className = { style['list-item-content'] }>
                <Slider
                  value = { this.state.area.downPaymentRate }
                  onChange = { v => { this.handleChange('downPaymentRate', v) } }
                  className = { style.slide }
                  min = { 0 }
                  max = { 100 }
                />
              </div>
            </div>
            <div className = { style['list-item'] }>
              <div className = { style['list-item-title'] }>贷款年限(单位:年)</div>
              <div className = { style['list-item-content'] }>
                <Slider
                  value = { this.state.area.period }
                  onChange = { v => { this.handleChange('period', v) } }
                  className = { style.slide }
                  min = { 1 }
                  max = { 30 }
                />
              </div>
            </div>
            <div className = { style['list-item'] } ref = { el => this.$areaRepaymentDate = el }>
              <div className = { style['list-item-title'] }>每月还款日</div>
              <div className = { style['list-item-content'] }>
                <div className = { style['list-item-static'] }>
                  <Picker
                    data = { date }
                    title = '选择日期'
                    cascade = { false }
                    value = { this.state.area.repaymentDate }
                    onChange = { v => this.handleChange('repaymentDate', v) }
                  >
                    <CustomPickerChildren>
                      {
                        this.state.area.repaymentDate ?
                          this.state.area.repaymentDate.join('') + '日' :
                          <span style = { { color: '#CFD2D9' } }>选择日期</span>
                      }
                    </CustomPickerChildren>
                  </Picker>
                </div>
              </div>
            </div>
            <div className = { style['list-item'] }>
              <div className = { style['list-item-title'] }>贷款利率(单位:百分比)</div>
              <div className = { style['list-item-content'] }>
                <Switch
                  data = { defaultInterestRate.concat({ title: '手动输入' }) }
                  activeIndex = { getInterestRateSwitchIndex(this.state.area.interestRate) }
                  onChange = { v => { this.handleSwitchChange(v, getInterestRateSwitchValue(v)) } }
                />
              </div>
            </div>
            {
              !this.state.area.isDefaultInterestRate ?
                <div className = { style['list-item'] } ref = { el => this.$areaInterestRate = el }>
                  <div className = { style['list-item-title'] }>利率</div>
                  <div className = { style['list-item-content'] }>
                    <div className = { style['list-item-static'] }>
                      <input type = 'text' autoComplete = 'off' placeholder = '请输入利率' value = { this.state.area.interestRate } onChange = { e => { this.handleSwitchChange(defaultInterestRate.length, e.target.value) } } />
                    </div>
                  </div>
                </div> :
                null
            }
            <Button type = 'primary' className = { style.submit } onClick = { this.handleSubmit }>开始计算</Button>
          </div>
        </Fragment>
      </Tab>
    )
  }
}

const CustomPickerChildren = props => (
  <div onClick = { props.onClick }>{ props.children }</div>
)