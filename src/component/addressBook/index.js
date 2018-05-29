import React, { Component, Fragment } from 'react'
import cs from 'classnames'
import _ from 'lodash'
import PropTypes from 'prop-types'
import { List, SearchBar } from 'antd-mobile'

import Icon from '../../component/icon/index'

import style from './index.css'

const Item = List.Item

export default class AddressBook extends Component {
  static defaultProps = {
    onItemClick: f => f,
    headerInfo: '',
    normalList: {
      A: [{
        name: '阿凡提',
        start: false
      }, {
        name: '阿凡达',
        start: false
      }], B: [{
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

  static propTypes = {
    starList: PropTypes.array,
    onItemClick: PropTypes.func,
    normalList: PropTypes.object,
    headerInfo: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
  }

  state = {
    itemVisible: true,
    searchData: ''
  }

  handleChange = (val) => {
    this.setState({
      searchData: val
    })
  }

  handleClick = (e) => {
    e.stopPropagation()

    this.props.onItemClick && this.props.onItemClick()
  }

  render () {
    const {
      headerInfo,
      normalList,
      starList  } = this.props

    return (
      <Fragment>
        <SearchBar onChange = { (val) => { this.handleChange(val) } } placeholder = '搜索' maxLength = { 8 } />
        <List
          renderHeader = { () => <span>{ headerInfo }<span className = { style['list-header-right'] }>共<span className = { style['list-header-count'] }>46</span>人</span></span> }
          className = { style['my-list'] }>
          {
            starList.map((val, i) => {
              let itemVisible = val.name.indexOf(this.state.searchData) !== -1 || this.state.searchData === ''

              return itemVisible ?
                <StartItem
                  key = { i }
                  data = { val }
                  onClick = { (e) => this.handleClick(e) } /> : null
            })
          }
          {
            Object.keys(normalList).map(key => {
              return this.state.searchData === '' ?
                <Fragment key = { key } >
                  <ItemSpace>
                    { key }
                  </ItemSpace>
                  {
                    normalList[key].map((val, i) => (
                      <NormalItem
                        key = { i }
                        data = { val }
                        onClick = { (e) => this.handleClick(e) } />
                    ))
                  }
                </Fragment> :
                <Fragment key = { key } >
                  {
                    normalList[key].map((val, i) => {
                      let itemVisible = val.name.indexOf(this.state.searchData) !== -1 || this.state.searchData === ''
                      return itemVisible ? <NormalItem
                        key = { i }
                        data = { val }
                        onClick = { (e) => this.handleClick(e) } /> : null
                    })
                  }
                </Fragment>
            })
          }
        </List>
      </Fragment>
    )
  }
}

const NormalItem = props => (
  <Item
    className = { cs(style['my-item'], style['count-item']) }
    thumb = 'https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png'
    onClick = { () => {} }>{ props.data.name }</Item>
)

const StartItem = props => (
  <Item
    extra = { <Icon type = 'favor' /> }
    className = { cs(style['my-item'], style['start-item']) }
    thumb = 'https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png'
    onClick = { () => {} }>{ props.data.name }</Item>
)

const ItemSpace = props => (
  <div className = { style['item-space'] }>
    <div className = { style['item-space-text'] }>{ props.children }</div>
  </div>
)