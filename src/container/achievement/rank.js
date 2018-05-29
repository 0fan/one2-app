import React, { Component, Fragment } from 'react'
import cs from 'classnames'
import axios from 'axios'
import { url, api } from '../../api'
import moment from 'moment'
import { connect } from 'react-redux'

import style from './index.css'

import { Tabs, DatePicker, List, Toast } from 'antd-mobile'
import { Header, Content } from '../../component/layout/index'
import Icon from '../../component/icon/index'

import { inputAchievementSuccess } from '../../redux/achievement'

const tabs = [
  { title: <span>存款证明</span> },
  { title: <span>认购</span> },
  { title: <span>签约</span> },
]

const rankData = [{
  rank: 1,
  userInfo: {
    name: '刘看山',
    avatar: 'http://img5.imgtn.bdimg.com/it/u=1736960767,2920122566&fm=27&gp=0.jpg'
  },
  count: 20,
  amount: 21000
}, {
  rank: 2,
  userInfo: {
    name: '刘看山',
    avatar: 'http://img5.imgtn.bdimg.com/it/u=1736960767,2920122566&fm=27&gp=0.jpg'
  },
  count: 20,
  amount: 21000
}, {
  rank: 3,
  userInfo: {
    name: '刘看山',
    avatar: 'http://img5.imgtn.bdimg.com/it/u=1736960767,2920122566&fm=27&gp=0.jpg'
  },
  count: 20,
  amount: 21000
}, {
  rank: 4,
  i: true,
  userInfo: {
    name: '刘看山',
    avatar: 'http://img5.imgtn.bdimg.com/it/u=1736960767,2920122566&fm=27&gp=0.jpg'
  },
  count: 20,
  amount: 21000
}]

@connect(state => ({
  achievement: state.achievement
}), {
  inputAchievementSuccess
})
export default class Rank extends Component {
  state = {
    filterDate: new Date(),
    active: false,
    depositList: [],
    subscribeList: [],
    signList: []
  }

  async componentDidMount () {
    this.setState({
      filterDate: this.props.achievement.date
    })

    Toast.loading('', 0, null, true)

    let [err, res] = await this.getList()

    Toast.hide()

    if (err) {
      Toast.fail(err)
      return
    }

    console.log(res)
  }

  getList = async () => {
    let [err1, res1] = await this.getDepositList()

    if (err1) {
      return [err1]
    }

    this.setState({
      depositList: res1.rcjCustomers
    })

    let [err2, res2] = await this.getSubscribeList()

    if (err2) {
      return [err2]
    }

    this.setState({
      subscribeList: res2.sureShppOrSignedCustomers
    })

    let [err3, res3] = await this.getSignList()

    if (err3) {
      return [err3]
    }

    this.setState({
      signList: res3.sureShppOrSignedCustomers
    })

    return [null, '数据填充成功！']
  }

  getDepositList = async () => {
    let [err, res] = await axios.post(url.server + api.getDepositRankDetail, {
      startTime: moment(this.state.filterDate).format('YYYY-MM')
    })

    if (err) {
      return [err]
    }

    let { code, message, data } = res

    if ( code !== '0') {
      return [message || '获取存款证明排行信息失败']
    }

    return [null, data]
  }

  getSubscribeList = async () => {
    let [err, res] = await axios.post(url.server + api.getSubscribeOrSignRankDetail, {
      payStatus: 1,
      startTime: moment(this.state.filterDate).format('YYYY-MM')
    })

    if (err) {
      return [err]
    }

    let { code, message, data } = res

    if ( code !== '0') {
      return [message || '获取认购排行信息失败']
    }

    return [null, data]
  }

  getSignList = async () => {
    let [err, res] = await axios.post(url.server + api.getSubscribeOrSignRankDetail, {
      payStatus: 4,
      startTime: moment(this.state.filterDate).format('YYYY-MM')
    })

    if (err) {
      return [err]
    }

    let { code, message, data } = res

    if ( code !== '0') {
      return [message || '获取签约庞航信息失败']
    }

    return [null, data]
  }

  handleChange = async (v) => {
    this.props.inputAchievementSuccess({ date: v })
    await this.setState({
      filterDate: v
    })

    Toast.loading('', 0, null, true)

    let [err, res] = await this.getList()

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
          排行榜
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
              <RankList data = { this.state.depositList } />
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
              <RankListOther data = { this.state.subscribeList } />
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
              <RankListOther data = { this.state.signList } />
            </div>
          </Tabs>
        </Content>
      </Fragment>
    )
  }
}

const RankList = props => (
  <div className = { style['rank-list'] }>
    {
      props.data.map((v, i) => (
        <div className = { cs(style['rank-list-item'], { [style['rank-list-item-i']]: v.i }) } key = { i }>
          <div className = { style['rank-list-header'] }>
            <span className = { style['rank-list-header-number'] }>{ v.rank }</span>
          </div>
          <div className = { style['rank-list-body'] }>
            <div className = { style['rank-list-avatar'] }>
              <img src = { v.userPhotoUrl } onLoad = { e => { e.target.style.opacity = 1 } } />
            </div>
            <div className = { style['rank-list-info'] }>
              <div className = { style['rank-list-info-name'] }>{ v.userName }</div>
              <div className = { style['rank-list-info-sub'] }>{ v.rcjCount } 笔</div>
            </div>
            <div className = { style['rank-list-after'] }></div>
          </div>
        </div>
      ))
    }
  </div>
)

const RankListOther = props => (
  <div className = { style['rank-list'] }>
    {
      props.data.map((v, i) => (
        <div className = { cs(style['rank-list-item'], { [style['rank-list-item-i']]: v.i }) } key = { i }>
          <div className = { style['rank-list-header'] }>
            <span className = { style['rank-list-header-number'] }>{ v.rank }</span>
          </div>
          <div className = { style['rank-list-body'] }>
            <div className = { style['rank-list-avatar'] }>
              <img src = { v.userPhotoUrl } onLoad = { e => { e.target.style.opacity = 1 } } />
            </div>
            <div className = { style['rank-list-info'] }>
              <div className = { style['rank-list-info-name'] }>{ v.userName }</div>
              <div className = { style['rank-list-info-sub'] }>{ v.SureShppOrSignedCount } 笔</div>
            </div>
            <div className = { style['rank-list-after'] }><em>{ v.totalMoeny }</em> 万元</div>
          </div>
        </div>
      ))
    }
  </div>
)