import React, { Component, Fragment } from 'react'

import { Header, Content } from '../../component/layout/index'
import Icon from '../../component/icon/index'
import Spacer from '../../component/spacer/index'
import UserList from '../../component/userList/index'
import { List, InputItem, TextareaItem } from  'antd-mobile'

import style from './add.css'

const data = [{
  id: 1,
  select: false,
  title: '至尊星耀',
  avatar: 'http://img5.imgtn.bdimg.com/it/u=3883592836,4269905765&fm=27&gp=0.jpg',
}, {
  id: 2,
  select: false,
  title: '美丽的我美丽的我',
  avatar: 'http://img5.imgtn.bdimg.com/it/u=3883592836,4269905765&fm=27&gp=0.jpg',
}, {
  id: 3,
  select: false,
  title: '美丽的我美丽的我',
  avatar: 'http://img5.imgtn.bdimg.com/it/u=3883592836,4269905765&fm=27&gp=0.jpg',
}]

const groupData = [{
  title: '青铜组',
  data: [{
    id: 4,
    avatar: 'http://img5.imgtn.bdimg.com/it/u=3883592836,4269905765&fm=27&gp=0.jpg',
    title: '林凡',
    select: false
  }, {
    id: 5,
    avatar: 'http://img5.imgtn.bdimg.com/it/u=3883592836,4269905765&fm=27&gp=0.jpg',
    title: '至尊星耀',
    select: false
  }]
}, {
  title: '青铜组',
  data: [{
    id: 6,
    avatar: 'http://img5.imgtn.bdimg.com/it/u=3883592836,4269905765&fm=27&gp=0.jpg',
    title: '潇潇',
    select: false
  }, {
    id: 7,
    avatar: 'http://img1.imgtn.bdimg.com/it/u=3465577192,1894849675&fm=27&gp=0.jpg',
    title: '至尊星耀',
    select: false
  }]
}, {
  title: '青铜组',
  data: [{
    id: 8,
    avatar: 'http://img5.imgtn.bdimg.com/it/u=3883592836,4269905765&fm=27&gp=0.jpg',
    title: '刘看山',
    select: false
  }, {
    id: 9,
    avatar: 'http://img1.imgtn.bdimg.com/it/u=3465577192,1894849675&fm=27&gp=0.jpg',
    title: '至尊星耀',
    select: false
  }, {
    id: 10,
    avatar: 'http://img2.imgtn.bdimg.com/it/u=4089992707,3524618747&fm=27&gp=0.jpg',
    title: '至尊星耀',
    select: false
  }, {
    id: 11,
    avatar: 'http://img0.imgtn.bdimg.com/it/u=2863390269,1960648687&fm=27&gp=0.jpg',
    title: '至尊星耀',
    select: false
  }, {
    id: 12,
    avatar: 'http://img1.imgtn.bdimg.com/it/u=3085308739,531605364&fm=27&gp=0.jpg',
    title: '美丽的我美丽的我',
    select: false
  }]
}]

export default class App extends Component {
  state = {
    visible: true,
    data: data,
    groupData: groupData,

    selectUser: []
  }

  handleSelectAll = (isSlectAll, e) => {
    let _group = this.state.groupData.slice()
    let _data = this.state.data.slice()

    _group.forEach(v => {
      v.data.forEach(_v => {
        _v.select = !isSlectAll
      })
    })

    _data.forEach(v => {
      v.select = !isSlectAll
    })

    this.setState({
      groupData: _group,
      data: _data
    })
  }

  handleSelect = (v, i, e) => {
    this.setState({
      data: this.state.data.map(_v => (
        _v.id === v.id ?
          Object.assign(_v, { select: !_v.select }) :
          _v
      ))
    })
  }

  handleGroupSelect = (v, i, j, e) => {
    this.setState({
      groupData: this.state.groupData.map(_v => Object.assign(_v, {
        data: _v.data.map(__v => (
          __v.id === v.id ?
            Object.assign(__v, { select: !__v.select }) :
            __v
        ))
      }))
    })
  }

  handleGroupSelectAll = (v, i, e) => {
    let _data = this.state.groupData.slice()

    let isSelectAll = true

    _data[i].data.forEach(v => {
      if (!v.select) {
        isSelectAll = false
      }
    })

    if (isSelectAll) {
      _data[i].data.map(v => Object.assign(v, { select: false }))
    } else {
      _data[i].data.map(v => Object.assign(v, { select: true }))
    }

    this.setState({
      groupData: _data
    })
  }

  handleSubmit = () => {
    this.setState({
      visible: false,
      selectUser: (
        this.state.groupData
          .reduce((total, v) => total.concat(v.data.filter(_v => _v.select)), [])
          .concat(
            this.state.data.filter(v => v.select)
          )
      )
    })
  }

  handleItemClick (v, i, e) {
    console.log(v)
  }

  render () {

    return (
      <Fragment>
        <Header
          icon = { <Icon type = 'back_android' /> }
          onLeftClick = { () => this.props.history.go(-1) }
        >
          发公告
        </Header>
        <Content>
          <Spacer />
          <UserList
            title = '绿色家园'
            data = { this.state.data }
            groupData = { this.state.groupData }
            select = { true }
            visible = { this.state.visible }
            onClose = { () => { this.setState({ visible: false }) } }
            onSelectAll = { this.handleSelectAll }
            onSelect = { this.handleSelect }
            onGroupSelectAll = { this.handleGroupSelectAll }
            onGroupSelect = { this.handleGroupSelect }
            onSubmit = { this.handleSubmit }
            onItemClick = { this.handleItemClick }
          />
          <List className = { style['current-list'] }>
            <InputItem
              className = { style['member-item'] }
              placeholder = '请选择团队或成员'
              extra = { <Icon type = 'roundaddfill' /> }
              value = {
                this.state.selectUser.map((v, i) => (
                  v.title
                )).join('、') }
              onExtraClick = { () => {
                this.setState({
                  visible: true
                })
              } }
            >发送范围:</InputItem>
            <InputItem
              placeholder = '请输入标题'
            >标题:</InputItem>
            <TextareaItem
              placeholder = '请输入公告内容'
              rows = { 5 } />
          </List>
        </Content>
      </Fragment>
    )
  }
}