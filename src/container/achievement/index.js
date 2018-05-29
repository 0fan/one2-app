import React, { Component, Fragment } from 'react'
import cs from 'classnames'
import _ from 'lodash'
import PropTypes from 'prop-types'
import moment from 'moment'
import axios from 'axios'
import { url, api } from '../../api'
import { connect } from 'react-redux'

import { Tabs, DatePicker, List, Toast } from 'antd-mobile'
import { Header, Content } from '../../component/layout/index'
import Icon from '../../component/icon/index'

import { inputAchievementSuccess, resetAchievement } from '../../redux/achievement'

import style from './index.css'

const tabs = [
  { title: <span>存款证明</span> },
  { title: <span>认购</span> },
  { title: <span>签约</span> },
]

@connect(state => ({
  achievement: state.achievement
}), {
  inputAchievementSuccess
})
class App extends Component {
  state = {
    filterDate: new Date(),
    active: false,
    depositData: {},
    subscribeData: {},
    signData: {}
  }

  async componentDidMount () {
    this.setState({
      filterDate: this.props.achievement.date
    })

    Toast.loading('', 0, null, true)

    let [err, res] = await this.getInfo()

    Toast.hide()

    if (err) {
      Toast.fail(err)
      return
    }

    console.log(res)
  }

  getInfo = async () => {
    let [err1, res1] = await this.getDepositInfo()

    if (err1) {
      return [err1]
    }

    this.setState({
      depositData: res1
    })

    let [err2, res2] = await this.getSubscribeInfo()

    if (err2) {
      return [err2]
    }

    this.setState({
      subscribeData: res2
    })

    let [err3, res3] = await this.getSignInfo()

    if (err3) {
      return [err3]
    }

    this.setState({
      signData: res3
    })

    return [null, '数据填充成功！']
  }

  getDepositInfo = async () => {
    let [err, res] = await axios.post(url.server + api.getDepositAchievement, {
      startTime: moment(this.state.filterDate).format('YYYY-MM')
    })

    if (err) {
      return [err]
    }

    let { code, message, data } = res

    if ( code !== '0') {
      return [message || '获取存款证明业绩信息失败']
    }

    return [null, data]
  }

  getSubscribeInfo = async () => {
    let [err, res] = await axios.post(url.server + api.getSubscribeOrSignAchievement, {
      payStatus: 1,
      startTime: moment(this.state.filterDate).format('YYYY-MM')
    })

    if (err) {
      return [err]
    }

    let { code, message, data } = res

    if ( code !== '0') {
      return [message || '获取认购业绩信息失败']
    }

    return [null, data]
  }

  getSignInfo = async () => {
    let [err, res] = await axios.post(url.server + api.getSubscribeOrSignAchievement, {
      payStatus: 4,
      startTime: moment(this.state.filterDate).format('YYYY-MM')
    })

    if (err) {
      return [err]
    }

    let { code, message, data } = res

    if ( code !== '0') {
      return [message || '获取签约业绩信息失败']
    }

    return [null, data]
  }

  handleChange = async (v) => {
    this.props.inputAchievementSuccess({ date: v })
    await this.setState({
      filterDate: v
    })

    Toast.loading('', 0, null, true)

    let [err, res] = await this.getInfo()

    Toast.hide()

    if (err) {
      console.log(err)
    }
  }

  handleTabChange = async (v, i) => {
    this.props.inputAchievementSuccess({
      initialPage: i
    })
  }

  handleFilterTime = (cb) => {
    this.setState({ active: !this.state.active })
    cb && cb()
  }

  handleRank = (type) => {
    this.props.history.push(`${ this.props.match.url }/rank?type=${ type }`)
  }

  render () {
    const CustomChildren = ({ extra, onClick, children }) => (
      <div className = { style['filter-time'] } >
        <span onClick = { e => { this.handleFilterTime(onClick) } }>
          { `${ this.state.filterDate.getFullYear() }年${ this.state.filterDate.getMonth() + 1 }月` }
          <Icon className = { style['filter-time-arrow'] } type = { 'unfold' } />
        </span>
      </div>
    )

    return (
      <Fragment>
        <Header
          hasBorder
          icon = { <Icon type = 'back_android' /> }
          onLeftClick = { () => this.props.history.go(-1) }
        >
          业绩
        </Header>
        <Content>
          <Tabs
            initialPage = { this.props.achievement.initialPage }
            tabs = { tabs }
            animated = { false }
            swipeable = { false }
            onChange = { (v, i) => { this.handleTabChange(v, i) } }
          >
            <div className = { style['tab-content'] }>
              <DatePicker
                mode = 'month'
                title = '选择时间'
                value = { this.state.filterDate }
                onChange = { v => this.handleChange(v) }
                onDismiss = { () => { this.setState({ active: false }) } }
                extra = 'click to choose'
              >
                <CustomChildren>{ this.state.filterDate }</CustomChildren>
              </DatePicker>
              <Focus
                type = 'blue'
                number = { this.state.depositData.rcjCount }
                rank = { this.state.depositData.rank }
                onLink = { e => { this.handleRank('blue') } }
              />
              <List>
                {
                  _.isArray(this.state.depositData.rcjCustomers) ?
                    this.state.depositData.rcjCustomers.map((v, i) => (
                      <List.Item key = { i } className = { style.list }>
                        <div className = { style['list-title'] }>{ v.tradeDate }</div>
                        <div className = { style['list-content'] }>{ v.name }</div>
                      </List.Item>
                    )) : null
                }
              </List>
            </div>
            <div className = { style['tab-content'] }>
              <DatePicker
                mode = 'month'
                title = '选择时间'
                value = { this.state.filterDate }
                onChange = { v => this.handleChange(v) }
                onDismiss = { () => { this.setState({ active: false }) } }
                extra = 'click to choose'
              >
                <CustomChildren>{ this.state.filterDate }</CustomChildren>
              </DatePicker>
              <FocusOther
                type = 'teal'
                money = { this.state.subscribeData.totalMoney }
                number = { this.state.subscribeData.shopOrSignedCount }
                rankName = '认购'
                rank = { this.state.subscribeData.rank }
                onLink = { e => { this.handleRank('teal') } }
              />
              <List>
                {
                  _.isArray(this.state.subscribeData.shopOrSignedCustomers) ?
                    this.state.subscribeData.shopOrSignedCustomers.map((v, i) => (
                      <List.Item key = { i } className = { style['list-special'] }>
                        <div className = { style['list-group'] }>
                          <div className = { style['list-top'] }>{ v.rawUpdateTime }</div>
                          <div className = { style['list-bottom'] }>{ v.realName }</div>
                        </div>
                        <div className = { style['list-group'] }>
                          <div className = { style['list-top'] }>认购房号</div>
                          <div className = { style['list-bottom'] }>{ v.roomName }</div>
                        </div>
                        <div className = { style['list-group'] }>
                          <div className = { style['list-top'] }>认购金额</div>
                          <div className = { style['list-bottom'] }>{ v.tradeAmount_wan } 万元</div>
                        </div>
                      </List.Item>
                    )) : null
                }
              </List>
            </div>
            <div className = { style['tab-content'] }>
              <DatePicker
                mode = 'month'
                title = '选择时间'
                value = { this.state.filterDate }
                onChange = { v => this.handleChange(v) }
                onDismiss = { () => { this.setState({ active: false }) } }
                extra = 'click to choose'
              >
                <CustomChildren>{ this.state.filterDate }</CustomChildren>
              </DatePicker>
              <FocusOther
                type = 'yellow'
                money = { this.state.signData.totalMoney }
                number = { this.state.signData.shopOrSignedCount }
                rankName = '签约'
                rank = { this.state.signData.rank }
                onLink = { e => { this.handleRank('yellow') } }
              />
              <List>
                {
                  _.isArray(this.state.signData.shopOrSignedCustomers) ?
                    this.state.signData.shopOrSignedCustomers.map((v, i) => (
                      <List.Item key = { i } className = { style['list-special'] }>
                        <div className = { style['list-group'] }>
                          <div className = { style['list-top'] }>{ v.rawUpdateTime }</div>
                          <div className = { style['list-bottom'] }>{ v.realName }</div>
                        </div>
                        <div className = { style['list-group'] }>
                          <div className = { style['list-top'] }>签约房号</div>
                          <div className = { style['list-bottom'] }>{ v.roomName }</div>
                        </div>
                        <div className = { style['list-group'] }>
                          <div className = { style['list-top'] }>签约金额</div>
                          <div className = { style['list-bottom'] }>{ v.tradeAmount_wan } 万元</div>
                        </div>
                      </List.Item>
                    )) : null
                }
              </List>
            </div>
          </Tabs>
        </Content>
      </Fragment>
    )
  }
}

const Focus = props => (
  <div className = { style.focus }>
    <div className = { style[`focus-block-${ props.type }`] }>
      <i className = { style['focus-block-type'] }></i>
      <div className = { style['focus-block-content'] }>
        笔数：<em>{ props.number ? props.number : 0 } 笔</em>
      </div>
      <div className = { style['focus-block-footer'] } onClick = { e => { props.onLink && props.onLink(e) } }>
        你在存款证明榜列位第 <em>{ props.rank }</em>，查看排名
        <Icon className = { style['focus-block-footer-icon'] } type = 'right' />
      </div>
    </div>
  </div>
)

const FocusOther = props => (
  <div className = { style.focus }>
    <div className = { style[`focus-block-${ props.type }`] }>
      <i className = { style['focus-block-type'] }></i>
      <div className = { style['focus-block-content'] }>
        金额：<em>{ props.money ? props.money : 0 } 万元</em>
      </div>
      <div className = { style['focus-block-content'] }>
        笔数：<em>{ props.number ? props.number : 0 } 笔</em>
      </div>
      <div className = { style['focus-block-footer'] } onClick = { e => { props.onLink && props.onLink(e) } }>
        你在{ props.rankName }榜列位第 <em>{ props.rank }</em>，查看排名
        <Icon className = { style['focus-block-footer-icon'] } type = 'right' />
      </div>
    </div>
  </div>
)

export default App