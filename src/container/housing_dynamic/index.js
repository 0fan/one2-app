import React, { Component, Fragment } from 'react'
import _ from 'lodash'
import moment from 'moment'
import axios from 'axios'
import { url, api } from '../../api'

import { Toast, ListView } from 'antd-mobile'
import { Link } from 'react-router-dom'
import { Header, Content } from '../../component/layout/index'
import Icon from '../../component/icon/index'

import style from './index.css'

export default class App extends Component {
  state = {
    data: []
  }

  async componentDidMount () {
    let [err, res] = await this.getList()

    if (err) {
      console.log(err)
      return
    }

    this.setState({
      data: res
    })
  }

  getList = async () => {
    let [err, res] = await axios.post(url.server + api.getEstateDynamicList)

    if (err) {
      return [err]
    }

    let { code, message, data } = res

    if ( code !== '0') {
      return [message || '获取楼盘动态列表失败']
    }

    return [null, data]
  }

  handleDelete = async (id) => {

    console.log(id)
    let [err1, res1] = await axios.post(url.server + api.deleteEstateDynamic, {
      id: id
    })

    if (err1) {
      return [err1]
    }

    let { code, message, data } = res1

    if ( code !== '0') {
      return [message || '删除楼盘动态']
    }

    Toast.success('删除楼盘动态成功!')

    let [err2, res2] = await this.getList()

    if (err2) {
      console.log(err2)
      return
    }

    this.setState({
      data: res2
    })
  }

  render () {
    return (
      <Fragment>
        <Header
          hasBorder
          icon = { <Icon type = 'back_android' /> }
          onLeftClick = { () => this.props.history.push('/workbench') }
          rightContent = { <Link to = 'housing_dynamic/add'>发动态</Link> }
        >
          楼盘动态
        </Header>
        <Content grey>
          <List
            data = { this.state.data }
            deleteClick = { (id) => { this.handleDelete(id) } }
          />
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
            <div className = { style['item-header-avatar'] } style = { { background: `url(${ v.headImg })` } }></div>
            <div className = { style['item-header-content'] }>
              <div className = { style['item-header-name'] }>{ v.content.author }</div>
              <div className = { style['item-header-relative'] }>{ moment(v.content.rawAddTime).fromNow() }</div>
            </div>
            <div onClick = { (e) => { props.deleteClick && props.deleteClick(v.content.id) } } className =  { style['item-header-delete'] } ><Icon type = 'delete' /> 删除</div>
          </div>
          <div className = { style['item-body'] }>
            <div className = { style['item-body-text'] }>
              { v.content.content }
            </div>
            {
              _.isArray(v.dynamicImg) ?
                <div className = { style['item-body-img-wrap'] }>
                  {
                    v.dynamicImg.map((_v, _i) => (
                      <div className = { style['item-body-img-item'] } key = { _i }>
                        <div className = { style['item-body-img-inner'] } style = { { background: `url(${ _v.url })` } }></div>
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