import React, { Component, Fragment } from 'react'
import _ from 'lodash'
import axios from 'axios'
import { url, api } from '../../api'

import { TextareaItem, ImagePicker, Toast } from 'antd-mobile'
import { Header, Content } from '../../component/layout/index'
import Icon from '../../component/icon/index'

import style from './index.css'

export default class App extends Component {
  state = {
    files: [],
    limit: 9,
    content: ''
  }

  onChange = (files, type, index) => {
    this.setState({
      files,
    })
  }

  handleChange = (type, val) => {
    this.setState({
      [type]: val
    })
  }

  handleIssue = async () => {
    const query = {
      content: this.state.content
    }

    let [err, res] = await axios.post(url.server + api.editEstateDynamic, {
      ...query
    })

    if (err) {
      Toast.fail('发布楼盘动态失败')
      return
    }

    let { code, message, data } = res

    if ( code !== '0') {
      Toast.fail(message || '发布楼盘动态失败')
      return
    }

    this.props.history.push('/workbench/housing_dynamic')
  }

  render () {
    return (
      <Fragment>
        <Header
          hasBorder
          icon = { <Icon type = 'back_android' /> }
          onLeftClick = { () => this.props.history.go(-1) }
          rightContent = { <span onClick = { () => { this.handleIssue() } } >发布</span> }
        >
          发楼盘动态
        </Header>
        <Content grey>
          <TextareaItem
            onChange = { val => { this.handleChange('content', val) } }
            maxLength = { 140 }
            className = { style['add-form'] }
            autoHeight
            placeholder = '分享楼盘动态，最多140字'
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