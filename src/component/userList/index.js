import React, { Component, Fragment } from 'react'
import { createPortal } from 'react-dom'
import cs from 'classnames'
import _ from 'lodash'

import Animate from 'rc-animate'
import { Button } from 'antd-mobile'
import Icon from '../icon/index'
import Avatar from '../avatar/index'
import Spacer from '../spacer/index'
import Search from '../search/index'
import { Header, Content } from '../layout/index'

import style from './index.css'

const isGroupSelectAll = (data) => {
  let isAll = true

  data.forEach(v => {
    if (!v.select) {
      isAll = false

      return isAll
    }
  })

  return isAll
}

// 获取总个数和已选个数
const getCount = (groupData, data) => {
  // 总人数
  let count = 0
  // 已选人数
  let select = 0

  groupData.forEach(v => {
    v.data.forEach(_v => {
      count += 1

      if (_v.select) {
        select += 1
      }
    })
  })

  data.forEach(v => {
    count += 1

    if (v.select) {
      select += 1
    }
  })

  return [count, select]
}

const $body = document.body

export default class UserList extends Component {
  static defaultProps = {
    groupData: [],
    data: [],

    title: '',

    visible: false,
    search: true,
    select: false,
    selectAll: false,

    // event
    onOpen: f => f,
    onClose: f => f,

    onItemClick: f => f,

    onSelectAll: f => f,
    onGroupSelectAll: f => f,

    onSelect: f => f,
    onGroupSelect: f => f,

    onSubmit: f => f
  }

  el = null

  searchEl = null

  state = {
    groupData: [],
    data: [],

    visibleGroup: false,
    group: 0,

    visiblSearch: false,
    searchValue: ''
  }

  constructor (props) {
    super(props)

    this.el = document.createElement('div')
  }

  componentDidMount () {
    $body.appendChild(this.el)

    this.setState({
      data: this.props.data,
      groupData: this.props.groupData
    })
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.data) {
      this.setState({ data: nextProps.data })
    }

    if (nextProps.groupData) {
      this.setState({ groupData: nextProps.groupData })
    }

    if (this.props.visible && !nextProps.visible) {
      this.setState({
        visibleGroup: false,
        visiblSearch: false
      })
    }
  }

  componentWillUnmount () {
    $body.removeChild(this.el)
  }

  handleOpenGroup = (v, i, e) => {
    e.stopPropagation()

    this.setState({
      visibleGroup: true,
      group: i
    })
  }

  handleItemClick = (v, i, e) => {
    const {
      select,
      onSelect,
      onItemClick
    } = this.props

    if (select) {
      onSelect(v, i, e)
    } else {
      onItemClick(v, i, e)
    }
  }

  handleOpenSearch = e => {
    this.setState({
      visiblSearch: true,
      searchValue: ''
    })
  }

  render () {
    const {
      data,
      groupData
    } = this.state

    const {
      search,
      select,
      visible,
      title,
      onClose,
      onSelectAll,
      onGroupSelect,
      onGroupSelectAll,
      onSubmit,
      onItemClick
    } = this.props

    const [count, selectCount] = getCount(groupData, data)

    // 是否全选
    const _isSelectAll = selectCount >= count

    // 当前组信息
    const currentGroup = groupData[this.state.group]

    return (
      createPortal(
        <Fragment>
          <Animate transitionName = 'slide'>
            {
              visible ?
                <Fragment>
                  <div className = { cs(style['app'], { [style['app-with-footer']]: selectCount }) }>
                    <Header
                      hasBorder
                      icon = { <Icon type = 'close' /> }
                      onLeftClick = { onClose }
                    >
                      选择成员
                    </Header>
                    <Content>
                      {
                        search ?
                          <Search onSearchClick = { this.handleOpenSearch } /> :
                          null
                      }
                      <div className = { style['project-title'] }>
                        { `${ title }-团队` }
                      </div>
                      {
                        select ?
                          <div className = { style['list'] } onClick = { e => { onSelectAll(_isSelectAll, e) } }>
                            <div className = { cs(style['item'], style['item-selectAll']) }>
                              <div className = { style['item-media'] }>
                                <Icon type = 'check' className = { cs(style['item-check'], { [style['item-checked']]: _isSelectAll }) } />
                              </div>
                              <div className = { style['item-inner'] }>
                                <div className = { style['item-title'] }>全选</div>
                              </div>
                            </div>
                          </div> :
                          null
                      }
                      <div className = { style['list'] }>
                        {
                          groupData.map((v, i) => (
                            <div
                              className = { style['item'] }
                              key = { i }
                              onClick = {
                                e => {
                                  select ?
                                    onGroupSelectAll(v, i, e) :
                                    this.handleOpenGroup(v, i, e)
                                }
                              }
                            >
                              {
                                select ?
                                  <div className = { style['item-media'] }>
                                    <Icon type = 'check' className = { cs(style['item-check'], { [style['item-checked']]: isGroupSelectAll(v.data) }) } />
                                  </div> :
                                  null
                              }
                              <div className = { style['item-inner'] }>
                                <div className = { style['item-avatar'] }>
                                  <Avatar data = { v.data.map(v => v.avatar) } />
                                </div>
                                <div className = { style['item-title'] }>
                                  { v.title }
                                </div>
                                <div className = { style['item-after'] } onClick = { e => { this.handleOpenGroup(v, i, e) } }>
                                  {
                                    select ?
                                      <Fragment><em>{ v.data.filter(v => v.select).length }</em>/</Fragment> :
                                      null
                                  }
                                  { v.data.length }
                                  <Icon type = 'right' />
                                </div>
                              </div>
                            </div>
                          ))
                        }
                      </div>
                      <Spacer />
                      <div className = { style['list'] }>
                        {
                          data.map((v, i) => (
                            <div className = { style['item'] } key = { i } onClick = { e => { this.handleItemClick(v, i, e) } }>
                              {
                                select ?
                                  <div className = { style['item-media'] }>
                                    <Icon type = 'check' className = { cs(style['item-check'], { [style['item-checked']]: v.select }) } />
                                  </div> :
                                  null
                              }
                              <div className = { style['item-inner'] }>
                                <div className = { style['item-avatar'] }>
                                  <Avatar data = { v.avatar } />
                                </div>
                                <div className = { style['item-title'] }>
                                  { v.title }
                                </div>
                              </div>
                            </div>
                          ))
                        }
                      </div>
                      <Spacer />
                    </Content>
                  </div>
                </Fragment> :
                null
            }
          </Animate>
          <Animate transitionName = 'slide-left'>
            {
              this.state.visibleGroup ?
                <div className = { cs(style['app'], { [style['app-with-footer']]: selectCount }) }>
                  <Header
                    hasBorder
                    icon = { <Icon type = 'back_android' /> }
                    onLeftClick = { () => this.setState({ visibleGroup: false }) }
                  >
                    { currentGroup.title }
                  </Header>
                  <Content>
                    {
                      search ?
                        <Search onSearchClick = { this.handleOpenSearch } /> :
                        null
                    }
                    <div className = { style['project-title'] }>
                      <div className = { style['project-title-left'] }>
                        { `${ title }-团队${ this.state.visibleGroup ? '-' + currentGroup.title : '' }` }
                      </div>
                      <div className = { style['project-title-right'] }>
                        共<em>{ currentGroup.data.length }</em>人
                      </div>
                    </div>
                    {
                      select ?
                        <div className = { style['list'] } onClick = { e => { onGroupSelectAll(currentGroup, this.state.group, e) } }>
                          <div className = { cs(style['item'], style['item-selectAll']) }>
                            <div className = { style['item-media'] }>
                              <Icon type = 'check' className = { cs(style['item-check'], { [style['item-checked']]: isGroupSelectAll(currentGroup.data) }) } />
                            </div>
                            <div className = { style['item-inner'] }>
                              <div className = { style['item-title'] }>全选</div>
                            </div>
                          </div>
                        </div> :
                        null
                    }
                    <div className = { style['list'] }>
                      {
                        currentGroup.data.map((v, i) => (
                          <div
                            className = { style['item'] }
                            key = { i }
                            onClick = {
                              e => {
                                select ?
                                  onGroupSelect(v, i, e) :
                                  onItemClick(v, i, e)
                              }
                            }
                          >
                            {
                              select ?
                                <div className = { style['item-media'] }>
                                  <Icon type = 'check' className = { cs(style['item-check'], { [style['item-checked']]: v.select }) } />
                                </div> :
                                null
                            }
                            <div className = { style['item-inner'] }>
                              <div className = { style['item-avatar'] }>
                                <Avatar data = { v.avatar } />
                              </div>
                              <div className = { style['item-title'] }>
                                { v.title }
                              </div>
                            </div>
                          </div>
                        ))
                      }
                    </div>
                    <Spacer />
                  </Content>
                </div> :
                null
            }
          </Animate>
          <Animate transitionName = 'slide-left'>
            {
              this.state.visiblSearch ?
                <div className = { cs(style['app'], { [style['app-with-footer']]: selectCount }) }>
                  <div className = { style['search-header'] }>
                    <Icon
                      type = 'back_android'
                      onClick = {
                        e => {
                          this.setState({
                            visiblSearch: false
                          })
                        }
                      }
                    />
                    <Search
                      fake = { false }
                      value = { this.state.searchValue }
                      onChange = { v => { this.setState({ searchValue: v }) } }
                      onClear = { e => { this.setState({ searchValue: '' }) } }
                      style = { {
                        margin: 0,
                        flexGrow: 1
                      } }
                    />
                  </div>
                  <div className = { style['search-body'] }>
                    {
                      this.state.searchValue.length ?
                        <Fragment>
                          {
                            groupData.map((v, i) => (
                              v.data.filter(_v => _v.title.indexOf(this.state.searchValue) !== -1).map((_v, _i) => (
                                <div
                                  className = { style['item'] }
                                  key = { _i }
                                  onClick = { e => {
                                    select ?
                                      onGroupSelect(_v, _i, e) :
                                      onItemClick(_v, _i, e)
                                  } }
                                >
                                  {
                                    select ?
                                      <div className = { style['item-media'] }>
                                        <Icon type = 'check' className = { cs(style['item-check'], { [style['item-checked']]: _v.select }) } />
                                      </div> :
                                      null
                                  }
                                  <div className = { style['item-inner'] }>
                                    <div className = { style['item-avatar'] }>
                                      <Avatar data = { _v.avatar } />
                                    </div>
                                    <div
                                      className = { style['item-title'] }
                                      dangerouslySetInnerHTML = { { __html: _v.title.replace(new RegExp(`(${ this.state.searchValue })`, 'g'), '<em>$1</em>') } }
                                    />
                                  </div>
                                </div>
                              ))
                            ))
                          }
                          {
                            data.filter(v => v.title.indexOf(this.state.searchValue) !== -1).map((v, i) => (
                              <div className = { style['item'] } key = { i } onClick = { e => { this.handleItemClick(v, i, e) } }>
                                {
                                  select ?
                                    <div className = { style['item-media'] }>
                                      <Icon type = 'check' className = { cs(style['item-check'], { [style['item-checked']]: v.select }) } />
                                    </div> :
                                    null
                                }
                                <div className = { style['item-inner'] }>
                                  <div className = { style['item-avatar'] }>
                                    <Avatar data = { v.avatar } />
                                  </div>
                                  <div
                                    className = { style['item-title'] }
                                    dangerouslySetInnerHTML = { { __html: v.title.replace(new RegExp(`(${ this.state.searchValue })`, 'g'), '<em>$1</em>') } }
                                  />
                                </div>
                              </div>
                            ))
                          }
                          {
                            groupData.filter(v => v.data.filter(_v => _v.title.indexOf(this.state.searchValue) !== -1).length).length + data.filter(v => v.title.indexOf(this.state.searchValue) !== -1).length ?
                              null :
                              <div style = { { textAlign: 'center', margin: '0.4rem 0', color: '#999' } }>没有结果 :(</div>
                          }
                        </Fragment> :
                        null
                    }
                  </div>
                </div> :
                null
            }
          </Animate>
          <Animate transitionName = 'slide'>
            {
              visible && select && selectCount ?
                <div className = { style.footer }>
                  <div className = { style['footer-left'] }>
                    已选择<em>{ selectCount }</em>人
                  </div>
                  <div className = { style['footer-right'] }>
                    <Button className = { style['footer-submit'] } type = 'primary' onClick = { onSubmit }>确定</Button>
                  </div>
                </div> :
                null
            }
          </Animate>
        </Fragment>,
        this.el
      )
    )
  }
}