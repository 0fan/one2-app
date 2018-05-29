import React, { Component, Fragment } from 'react'
import _ from 'lodash'
import moment from 'moment'

import { Link } from 'react-router-dom'
import { Header, Content } from '../../component/layout/index'
import Icon from '../../component/icon/index'

import style from './remark.css'

const data = new Array(10).fill(0).map((v, i) => ({
  date: '2013.03.0' + (i + 1) + ' 09:00',
  userInfo: {
    name: '林凡',
    avatar: 'http://img5.imgtn.bdimg.com/it/u=2456428128,2495537877&fm=27&gp=0.jpg'
  },
  text: '为用户开通银行电子Ⅱ类账户，Ⅱ类户可以绑定一个I类户，Ⅱ类户可与绑定账户实现资金互转，可转入转出，存取自由，为用户向开发商提供资金证明服务，最多140字。',
  imgs: new Array(_.random(0, 9)).fill(0).map(v => 'http://img2.imgtn.bdimg.com/it/u=4247615461,4033656635&fm=27&gp=0.jpg')
}))

export default class App extends Component {
  render () {
    return (
      <Fragment>
        <Header
          hasBorder
          icon = { <Icon type = 'back_android' /> }
          onLeftClick = { () => this.props.history.go(-1) }
          rightContent = { <Link to = '/add-remark'>新增</Link> }
        >
          备注
        </Header>
        <Content className = { style['content-gap'] } grey>
          <List data = { data } />
        </Content>
      </Fragment>
    )
  }
}

const List = props => (
  <div className = { style.list }>
    {
      props.data.map((v, i) => (
        <div className = { style.item } key = { i }>
          <div className = { style['item-header'] }>
            <div className = { style['item-header-content'] }>
              <div className = { style['item-header-date'] }>{ v.date }</div>
              <div className = { style['item-header-operate'] }>
                <div className =  { style['item-header-delete'] } ><Icon type = 'delete' /> 删除</div>
                <div className =  { style['item-header-edit'] } ><Icon type = 'form'  />编辑</div>
              </div>
            </div>
          </div>
          <div className = { style['item-body'] }>
            <div className = { style['item-body-text'] }>
              { v.text }
            </div>
            {
              _.isArray(v.imgs) ?
                <div className = { style['item-body-img-wrap'] }>
                  {
                    v.imgs.map((_v, _i) => (
                      <div className = { style['item-body-img-item'] } key = { _i }>
                        <div className = { style['item-body-img-inner'] } style = { { backgroundImage: `url(${ v.userInfo.avatar })` } }></div>
                      </div>
                    ))
                  }
                </div> :
                null
            }
          </div>
        </div>
      ))
    }
  </div>
)