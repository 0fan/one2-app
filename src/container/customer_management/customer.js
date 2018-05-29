import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import cs from 'classnames'
import _ from 'lodash'
import PropTypes from 'prop-types'
import { TextareaItem, ImagePicker, List, SearchBar } from 'antd-mobile'

import AddressBook from '../../component/addressBook/index'
import Icon from '../../component/icon/index'
import { Header, Content } from '../../component/layout/index'

import style from './index.css'

const Item = List.Item

export default class App extends Component {
  state = {
    normalList: {
      A: [{
        name: '阿凡提',
        start: false
      }, {
        name: '阿凡达',
        start: false
      }]
      , B: [{
        name: '白痴',
        start: false
      }]
    },
    starList: [{
      name: '李白'
    }, {
      name: '杜甫'
    }, {
      name: '李清照'
    }]
  }

  render () {
    const normalList = this.state.normalList
    const starList = this.state.starList

    return (
      <Fragment>
        <Header
          hasBorder = { true }
          icon = { <Icon type = 'back_android' /> }
          onLeftClick = { () => this.props.history.go(-1) }
        >
          跟进中的客户
        </Header>
        <Content>
          <AddressBook
            headerInfo = '绿色家园 - 跟进中的客户'
            normalList = { normalList }
            starList = { starList }
            onItemClick = { () => { console.log('sad') } } />
        </Content>
      </Fragment>
    )
  }
}