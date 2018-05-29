import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import cs from 'classnames'
import _ from 'lodash'
import PropTypes from 'prop-types'
import { TextareaItem, ImagePicker } from 'antd-mobile'

// component
import {
  Badge,
  PullToRefresh,
  Toast,
  List
} from 'antd-mobile'

import Icon from '../../component/icon/index'
import { Header, Content } from '../../component/layout/index'

import style from './add-remark.css'

export default class App extends Component {
  state = {
    files: [],
    limit: 9
  }

  render () {
    return (
      <Fragment>
        <Header
          hasBorder = { true }
          icon = { <Icon type = 'back_android' /> }
          onLeftClick = { () => this.props.history.go(-1) }
          rightContent = { <span>发布</span> }
        >
          备注
        </Header>
        <Content className = { style['content-gap'] } grey>
          <TextareaItem
            className = { style['add-form'] }
            rows = { 7 }
          />
          <div className = { style['picker'] }>
            <div className = { style['picker-header'] }>
              添加图片(最多{ this.state.limit }张)
            </div>
            <ImagePicker
              files = { this.state.files }
              onChange = { this.onChange }
              onImageClick = { (index, fs) => console.log(index, fs) }
              selectable = { this.state.files.length < this.state.limit }
              multiple = { true }
            />
          </div>
        </Content>
      </Fragment>
    )
  }
}