import React, { Component, Fragment } from 'react'
import cs from 'classnames'
import _ from 'lodash'
import PropTypes from 'prop-types'

import { WhiteSpace, Badge, Button, Carousel } from 'antd-mobile'
import Icon from '../../component/icon/index'
import { Header, Content } from '../../component/layout/index'

import style from './detail.css'

export default class App extends Component {
  state = {
    data: ['1', '2', '3'],
    imgHeight: 176,
    depositHeight: 90,
    depositData: [{
      price: 5000,
      date: '2018/02/06'
    }, {
      price: 6000,
      date: '2018/03/02'
    }, {
      price: 6000,
      date: '2018/03/01'
    }],
    subscribeData: [{
      build: '汇祥.林里3000【1-23】',
      price: 200000,
      date: '2016.02.02'
    }, {
      build: '金科',
      price: 250000,
      date: '2016.02.02'
    }, {
      build: '北辰',
      price: 90000,
      date: '2016.02.02'
    }]
  }

  render () {
    return (
      <Fragment>
        <Header
          hasBorder = { true }
          icon = { <Icon type = 'back_android' /> }
          onLeftClick = { () => this.props.history.go(-1) }
        >
          任务详情
        </Header>
        <Content style = { { paddingBottom: '1.2533rem' } }>
          <div className = { style.focus }>
            <div className = { style['focus-content'] }>
              <div className = { style['focus-avater'] }></div>
              <div className = { style['focus-main'] }>
                <div className = { style['focus-title'] }>莎莎</div>
                <div className = { style['focus-text'] }>136 1880 0110</div>
              </div>
              <Icon type = 'mobile' className = { style['focus-contact'] } />
            </div>
          </div>
          <Spacer />
          <Box
            title = '基本资料'
            more = { true }
          >
            购房意向：<a href = '#'>高意向</a>
          </Box>
          <Spacer />
          <Box
            title = '备注'
            tag = { 14 }
            more = { true }
            onItemClick = { () => {
              const currentPath = this.props.location.pathname

              this.props.history.push(`${currentPath}/remark`)
            } }
          >
            2018/02/01 客户第一次到访，看中大户型，A1户型…
          </Box>
          <Box
            title = '存款证明'
            tag = { 3 }
            more = { true }
          >
            <DepositBox
              data = { this.state.depositData }
            />
          </Box>
          <Box
            title = '认购'
            tag = { 2 }
            more = { true }
          >
            <Carousel
              cellSpacing = { 10 }
              dotStyle = { { width: '9px', height: '5px', background: '#fff', borderRadius: '3px', opacity: 0.4 } }
              dotActiveStyle = { { width: '9px', height: '5px', background: '#fff', borderRadius: '3px' } }>
              { this.state.subscribeData.map(val => (
                <SubscribeBox
                  key = { val }
                  data = { val }
                />
              )) }
            </Carousel>
          </Box>
          <Box
            title = '签约'
            tag = { 2 }
            more = { true }
          >
            <Carousel
              cellSpacing = { 10 }
              dotStyle = { { width: '9px', height: '5px', background: '#fff', borderRadius: '3px', opacity: 0.4 } }
              dotActiveStyle = { { width: '9px', height: '5px', background: '#fff', borderRadius: '3px' } }>
              { this.state.subscribeData.map(val => (
                <SignBox
                  key = { val }
                  data = { val }
                />
              )) }
            </Carousel>
          </Box>
          <Spacer />
          <Button type = 'primary' className = { style.submit }>
            分配置业顾问
          </Button>
        </Content>
      </Fragment>
    )
  }
}

const Box = props => (
  <div className = { style.box }>
    <div className = { style['box-header'] }>
      { props.title }
      {
        props.tag ?
          <div className = { style['box-header-tag'] }>{ props.tag }</div> :
          null
      }
      {
        props.more ?
          <div className = { style['box-header-right'] } onClick = { e => { props.onItemClick && props.onItemClick(e) } }>
            查看全部
            <Icon type = 'right' />
          </div> :
          null
      }
    </div>
    <div className = { style['box-content'] }>
      {
        props.children
      }
    </div>
  </div>
)

const Spacer = props => <div className = { style.spacer }></div>

const DepositBox = props => (
  <div className = { style['deposit-swiper'] }>
    <div className = { style['deposit-inter'] }>
      {props.data.map(val => (
        <div
          key = { val }
          className = { style['deposit-box'] }
        >
          <div className = { style['deposit-title'] }>存款证明金额
          </div>
          <div className = { style['deposit-price'] }>
            { val.price } 万元
          </div>
          <div className = { style['deposit-date'] }>
            { val.date }
          </div>
        </div>
      ))}
    </div>
  </div>
)

const SubscribeBox = props => (
  <div className = { style['subscribe-box'] }>
    <div className = { style['subscribe-build'] }>{ props.data.build }</div>
    <div className = { style['subscribe-price'] }>金额: { props.data.price } 万元</div>
    <div className = { style['subscribe-date'] }>{ props.data.date }</div>
  </div>
)

const SignBox = props => (
  <div className = { style['sign-box'] }>
    <div className = { style['sign-build'] }>{ props.data.build }</div>
    <div className = { style['sign-price'] }>金额: { props.data.price } 万元</div>
    <div className = { style['sign-date'] }>{ props.data.date }</div>
  </div>
)