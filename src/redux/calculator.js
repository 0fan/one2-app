import { reduxGenerator } from '../util/index'

const SWITCH_TYPE = 'switch_type'
const SWITCH_CALC_TYPE = 'switch_calc_type'
const SWITCH_LOAN_TYPE = 'switch_loan_type'
const INPUT_NORMAL = 'input_normal'
const INPUT_COMBINE = 'input_combine'
const INPUT_RESULT = 'input_result'

let [calculator, inputCalculatorSuccess, inputCalculatorError, resetCalculator] = reduxGenerator('calculator', {
  // 类别
  type: 'normal', /* normal | 'combine' */
  // 计算方式 总价或者面积
  calcType: 'total', /* total | 'area' */
  // 还款方式
  loanType: 0, /* 0: 等额本息 | 1: 等额本金 */

  normal: {
    // 面积
    area: '',
    // 单价
    unitPrice: '',
    // 房价总额
    total: '',
    // 首付比例
    downPaymentRate: 30,
    // 贷款年限
    period: 20,
    // 还款日
    repaymentDate: [1],
    // 利率
    interestRate: 4.9
  },

  combine: {
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
  },

  // 结果
  result: {
    // 每月还款金额
    amount: 0,
    // 还款日
    repaymentDate: 0,
    // 贷款额度
    loan: 0,
    // 支付利息
    interest: 0,
    // 总还款额度
    total: 0,
    // 还款月数
    period: 0,
    // 如果是等额本金需要每月递减金额
    reduce: 0
  }
}, [{
  action: SWITCH_TYPE,
  result: (state, payload) => ({
    ...state,
    type: payload
  })
}, {
  action: SWITCH_CALC_TYPE,
  result: (state, payload) => ({
    ...state,
    calcType: payload
  })
}, {
  action: SWITCH_LOAN_TYPE,
  result: (state, payload) => {
    return {
      ...state,
      loanType: payload,
      result: (
        state.type === 'normal' ?
          state.calcType === 'total' ?
            calcNormalTotal(state.normal, payload) :
            calcNormalArea(state.normal, payload) :
          calcCombine(state.combine, payload)
      )
    }
  }
}, {
  action: INPUT_NORMAL,
  result: (state, payload) => {
    return {
      ...state,
      normal: payload,
      loanType: 0,
      result: state.calcType === 'total' ? calcNormalTotal(payload, 0) : calcNormalArea(payload, 0)
    }
  }
}, {
  action: INPUT_COMBINE,
  result: (state, payload) => {
    return {
      ...state,
      combine: payload,
      loanType: 0,
      result: calcCombine(payload, 0)
    }
  }
}, {
  action: INPUT_RESULT,
  result: (state, payload) => ({
    ...state,
    result: payload
  })
}])

function switchType (payload) {
  return {
    payload,
    type: SWITCH_TYPE
  }
}

function switchCalcType (payload) {
  return {
    payload,
    type: SWITCH_CALC_TYPE
  }
}

function switchLoanType (payload) {
  return {
    payload,
    type: SWITCH_LOAN_TYPE
  }
}

function inputNormal (payload) {
  return {
    payload,
    type: INPUT_NORMAL
  }
}

function inputCombine (payload) {
  return {
    payload,
    type: INPUT_COMBINE
  }
}

function inputResult (payload) {
  return {
    payload,
    type: INPUT_RESULT
  }
}

// 计算通用总价价格
function calcNormalTotal (data, loanType) {
  let _data = {}

  if (loanType === 0) {
    _data = calcACPI({
      yearRate: data.interestRate / 100,
      period: data.period * 12,
      total: data.total * (1 - data.downPaymentRate / 100)
    })
  } else {
    _data = calcAC({
      yearRate: data.interestRate / 100,
      period: data.period * 12,
      total: data.total * (1 - data.downPaymentRate / 100)
    })
  }

  return Object.assign({}, data, _data, {
    loan: (data.total * (1 - data.downPaymentRate / 100)).toFixed(2)
  })
}

// 按照面积计算
function calcNormalArea (data, loanType) {
  let _data = {}

  const total = parseFloat(data.area) * parseFloat(data.unitPrice) / 10000

  if (loanType === 0) {
    _data = calcACPI({
      yearRate: data.interestRate / 100,
      period: data.period * 12,
      total: total * (1 - data.downPaymentRate / 100)
    })
  } else {
    _data = calcAC({
      yearRate: data.interestRate / 100,
      period: data.period * 12,
      total: total * (1 - data.downPaymentRate / 100)
    })
  }

  return Object.assign({}, data, _data, {
    // 贷款的金额
    loan: (total * (1 - data.downPaymentRate / 100)).toFixed(2)
  })
}

// 组合贷款计算
function calcCombine (data, loanType) {
  // 贷款总额
  const loan = parseFloat(data.total)
  // 商业贷款
  const business = parseFloat(data.business)
  // 公积金贷款
  const provident = parseFloat(data.provident)
  // 期数,传过来的是年
  const period = parseInt(data.period) * 12
  // 商业贷款利率
  const businessInterestRate = parseFloat(data.businessInterestRate) / 100
  // 公积金贷款利率
  const providentInterestRate = parseFloat(data.providentInterestRate) / 100

  // 商业贷款
  let businessResult = {}
  // 公积金
  let providentResult = {}

  if (loanType === 0) {
    businessResult = calcACPI({
      yearRate: businessInterestRate,
      period: period,
      total: business
    })
    providentResult = calcACPI({
      yearRate: providentInterestRate,
      period: period,
      total: provident
    })
  } else {
    businessResult = calcAC({
      yearRate: businessInterestRate,
      period: period,
      total: business
    })
    providentResult = calcAC({
      yearRate: providentInterestRate,
      period: period,
      total: provident
    })
  }

  console.log(businessResult)
  console.log(providentResult)

  return {
    // 每月还款金额
    amount: businessResult.amount + providentResult.amount,
    // 支付利息
    interest: businessResult.interest + providentResult.interest,
    // 总还款额度
    total: businessResult.total + providentResult.total,
    // 如果是等额本金需要每月递减金额
    reduce: loanType === 1 ? businessResult.reduce + providentResult.reduce : '',

    // 还款月数
    period: data.period,
    // 贷款额度
    loan: loan,
    // 还款日
    repaymentDate: data.repaymentDate,
  }
}


// 计算等额本息 Average Capital Plus Interest
function calcACPI ({ yearRate, period, total }) {

  const monthRate = yearRate / 12
  // 每月还款
  const monthRefund = total * monthRate * Math.pow(1 + monthRate, period) / (Math.pow(1 + monthRate, period) - 1)
  // 总返款金额
  const totalAmount = monthRefund * period
  // 总利息
  const totalInterest = totalAmount - total

  return {
    // 每月还款
    amount: monthRefund * 10000,
    // 总还款金额
    total: totalAmount,
    // 总利息
    interest: totalInterest
  }
}

// 计算等额本金 Average Capital
function calcAC ({ yearRate, period, total }) {
  total = total * 10000

  const monthRate = yearRate / 12
  // 每月偿还的本金
  const capitalRefund = total / period
  // 每月递减的金额
  const reduceMoney = total / period * monthRate
  // 每月还款
  const monthRefund = []

  // 总返款金额
  let totalAmount = 0

  // 总利息
  let totalInterest = 0

  Array(period).fill(0).forEach((v, i) => {
    const _capitalRefund = capitalRefund + (total - i * capitalRefund) * monthRate

    monthRefund.push(_capitalRefund)
    totalAmount += _capitalRefund
  })

  totalInterest = totalAmount - total

  return {
    // 每月还款
    amount: monthRefund[0],
    // 总还款金额
    total: totalAmount / 10000,
    // 总利息
    interest: totalInterest / 10000,
    // 每月递减的金额
    reduce: reduceMoney
  }
}

export default calculator
export {
  inputCalculatorSuccess,
  inputCalculatorError,
  resetCalculator,

  switchType,
  switchCalcType,
  switchLoanType,

  inputNormal,
  inputCombine,
  inputResult
}