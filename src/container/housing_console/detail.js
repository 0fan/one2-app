import React, { Component, Fragment } from 'react'

import { Button } from 'antd-mobile'
import Spacer from '../../component/spacer/index'
import { Header, Content } from '../../component/layout/index'
import Icon from '../../component/icon/index'
import List from '../../component/list/index'

const data = [{
  title: '房源总价',
  text: '1,000,000 元'
}, {
  title: '套内单价',
  text: '12,000 元'
}, {
  title: '套内面积',
  text: '83m²'
}, {
  title: '建筑单价',
  text: '10,000 元'
}, {
  title: '建筑面积',
  text: '100m²'
}, {
  title: '户型结构',
  text: '三室两厅'
}, {
  title: '户型图',
  text: <img src = 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1405540517,3098859486&fm=27&gp=0.jpg' />
}]

export default class App extends Component {
  render () {
    return (
      <Fragment>
        <Header
          icon = { <Icon type = 'back_android' /> }
          onLeftClick = { () => this.props.history.go(-1) }
        >
          房源详情
        </Header>
        <Content
          hasToolbar
        >
          <Spacer />
          <List
            data = { [<span key = '0' style = { { fontSize: '0.4267rem' } }>金色海岸【一期1-101】</span>] }
          />
          <List
            data = { data }
          />
        </Content>
        <Button onClick = { e => { this.props.history.push('/workbench/mortgage_calculator') } } className = 'fixed-button' type = 'primary'>房贷计算器</Button>
      </Fragment>
    )
  }
}