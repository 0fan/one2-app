import React, { Component, Fragment } from 'react'
import cs from 'classnames'
import axios from 'axios'
import { Link } from 'react-router-dom'
import createDOMForm from 'rc-form/lib/createDOMForm'

import { Picker, Button, Toast } from 'antd-mobile'
import { Header, Content } from '../../component/layout/index'
import Icon from '../../component/icon/index'

import Add from './add_remark'
import Detail from './detail_remark'

import { url, api } from '../../api'
import {
  valid_name,
  valid_mobile
} from '../../util/formValid'

import style from './index.css'

const fail = (v) => {
  Toast.fail(v, 3, null, false)
}

const getList = async (type, text) => {
  const [err, res] = await axios.post(url.server + api.dictionary, {
    categoryCd: type
  })

  if (err) {
    return [err]
  }

  const { code, message, data } = res

  if (code !== '0') {
    return [message || `获取${ text }数据失败`]
  }

  return [null, [data.map(v => ({
    label: v.name,
    value: v.code
  }))]]
}

const initState = () => ({
  // 是否正在请求列表数据
  isLoading: false,
  // 是否正在提交
  isSubmit: false,
  error: '',

  name: '',
  mobile: '',
  age: '',
  sex: '',
  intention: '',
  type: '',
  area: '',
  region: '',

  remark: [],
  // 备注详情下标
  currentRemark: 0,

  ageList: [],
  intentionList: [],
  typeList: [],
  areaList: [],
  regionList: [],

  visibleAdd: false,
  visibleDetail: false
})

@createDOMForm()
export default class App extends Component {
  state = initState()

  componentDidMount () {
    this.initData()
  }

  initData = async () => {
    this.setState({ isLoading: true, error: '' })

    Toast.loading('初始化数据中...', 0, null, true)

    const [err1, res1] = await getList('AGE', '年龄')

    if (err1) {
      this.setState({ isLoading: false, error: err1 })
      Toast.hide()
      return err1
    }

    const [err2, res2] = await getList('PURCHASE', '购房意向')

    if (err2) {
      this.setState({ isLoading: false, error: err2 })
      Toast.hide()
      return [err2]
    }

    const [err3, res3] = await getList('HUXING', '户型数据')

    if (err3) {
      this.setState({ isLoading: false, error: err3 })
      Toast.hide()
      return [err3]
    }

    const [err4, res4] = await getList('AREA', '需求面积')

    if (err4) {
      this.setState({ isLoading: false, error: err4 })
      Toast.hide()
      return [err4]
    }

    const [err5, res5] = await axios.post(url.server + api.getCityMap)

    if (err5) {
      this.setState({ isLoading: false, error: err5 })
      Toast.hide()
      return [err5]
    }

    const { code, message, data } = res5

    if (code !== '0') {
      this.setState({ isLoading: false, error: message || '获取城市数据失败' })
      Toast.hide()
      return [message || '获取城市数据失败']
    }

    Toast.hide()

    this.setState({
      isLoading: false,

      ageList: res1,
      intentionList: res2,
      typeList: res3,
      areaList: res4,
      regionList: data,
    })

    return [null, {
      ageList: res1,
      intentionList: res2,
      typeList: res3,
      areaList: res4,
      regionList: data,
    }]
  }

  handleBack = () => {
    console.log('back')
  }

  handleSwitchSex = v => {
    this.setState({ sex: v })
  }

  handleChange = (type, v) => {
    this.setState({ [type]: v })
  }

  handleRemark = (v, i, e) => {
    this.setState({
      visibleDetail: true,
      currentRemark: i
    })
  }

  handleAddSubmit = (text, imgs, urls) => {
    console.log(text, imgs, urls)

    this.setState(prevSte => ({
      remark: prevSte.remark.concat({
        text,
        imgs,
        urls
      }),
      visibleAdd: false
    }))
  }

  handleDetailSubmit = (text, imgs, urls) => {
    console.log(text, imgs, urls)

    const { remark, currentRemark } = this.state

    let _data = remark.slice()

    _data[currentRemark] = {
      text,
      imgs,
      urls
    }

    this.setState({
      remark: _data,
      visibleDetail: false
    })
  }

  handleSubmit = () => {
    const { resetFields } = this.props.form

    this.props.form.validateFieldsAndScroll(async (error, value) => {
      if (error) {
        return
      }
      console.log(error)
      console.log(value)
      console.log(this.state.remark)

      const {
        name,
        mobile,
        age,
        sex,
        intention,
        type,
        area,
        region,
      } = value

      const { remark } = this.state

      Toast.loading('提交中...', 0, null, true)

      this.setState({ isSubmit: true })

      const [err, res] = await axios.post(url.server + api.addCustomer, {
        name,
        phone: mobile,
        sex,
        age: age ? age.join('') : '',
        purchaseIntention: intention ? intention.join('') : '',
        factor: type ? type.join('') : '',
        demandArea: area ? area.join('') : '',
        // 居住省code
        provinceCode: region[0],
        // 居住市code
        cityCode: region[1],
        // 居住区域code
        areaCode: region[2],

        customerInfoDto: remark.map(v => ({
          information: v.text,
          files: v.imgs
        })),
      })

      Toast.hide()

      if (err) {
        this.setState({
          isSubmit: false,
          // error: err
        })

        fail(err)

        return
      }

      const { code, message, data } = res

      if (code !== '0') {
        this.setState({
          isSubmit: false,
          // error: message || '添加用户失败'
        })

        fail(message || '添加用户失败')

        return
      }

      this.setState({ isSubmit: false })

      console.log(res)
      Toast.success('添加用户成功', 3, null, false)
      // 重置state
      Object.assign(this.state, initState())
      // 重置表单
      resetFields()
      // 重新初始化数据
      this.initData()
    })
  }

  render () {
    const { getFieldProps, getFieldValue, setFieldsValue, getFieldError } = this.props.form

    const nameProps = getFieldProps('name', {
      initialValue: this.state.name,
      rules: valid_name
    })

    const mobileProps = getFieldProps('mobile', {
      initialValue: this.state.mobile,
      rules: valid_mobile
    })

    const sexProps = getFieldProps('sex', {
      initialValue: this.state.sex,
      // rules: [{
      //   required: true,
      //   message: '请选择性别'
      // }]
    })

    const ageProps = getFieldProps('age', {
      initialValue: this.state.age,
      // rules: [{
      //   required: true,
      //   message: '请选择客户年龄'
      // }]
    })

    const intentionProps = getFieldProps('intention', {
      initialValue: this.state.intention,
      // rules: [{
      //   required: true,
      //   message: '请选择购房意向'
      // }]
    })

    const typeProps = getFieldProps('type', {
      initialValue: this.state.type,
      // rules: [{
      //   required: true,
      //   message: '请选择关注户型'
      // }]
    })

    const areaProps = getFieldProps('area', {
      initialValue: this.state.area,
      // rules: [{
      //   required: true,
      //   message: '请选择需求面积'
      // }]
    })

    const regionProps = getFieldProps('region', {
      initialValue: this.state.region,
      // rules: [{
      //   required: true,
      //   message: '请选择需求面积'
      // }]
    })

    return (
      <Fragment>
        <Header
          icon = { <Icon type = 'back_android' /> }
          onLeftClick = { this.handleBack }
        >
          添加客户
        </Header>
        <Content grey>
          {
            !this.state.isLoading && this.state.error ?
              <div className = { style.error }>
                { this.state.error }
                <a href = '#' onClick = { e => { e.preventDefault() || this.initData() } }>重试</a>
              </div> :
              null
          }
          <div className = { style.list }>
            <Item
              required = { true }
              title = '姓名'
              error = { getFieldError('name') }
            >
              <input { ...nameProps } className = { style['item-input'] } type = 'text' autoComplete = 'off' placeholder = '请输入客户姓名' />
            </Item>
            <Item
              required = { true }
              title = '手机'
              error = { getFieldError('mobile') }
            >
              <input { ...mobileProps } className = { style['item-input'] } type = 'text' autoComplete = 'off' placeholder = '请输入客户手机号码' />
            </Item>
            <Item
              title = '性别'
              error = { getFieldError('sex') }
            >
              <div>
                <Radio
                  checked = { getFieldValue('sex') === '1' }
                  onClick = { e => { setFieldsValue({ sex: '1' }) } }
                  title = '男'
                  type = 'male'
                />
                <Radio
                  checked = { getFieldValue('sex') === '2' }
                  onClick = { e => { setFieldsValue({ sex: '2' }) } }
                  title = '女'
                  type = 'female'
                />
              </div>
            </Item>
            <Item
              link = { true }
              title = '年龄'
              error = { getFieldError('age') }
            >
              <Picker
                data = { this.state.ageList }
                value = { getFieldValue('age') }
                onChange = { v => { setFieldsValue({ age: v }) } }
                onOk = { v => { setFieldsValue({ age: v }) } }
                cascade = { false }
              >
                <CustomChildren>{ getFieldValue('age') ? null : '请选择客户年龄' }</CustomChildren>
              </Picker>
            </Item>
            <Item
              link = { true }
              title = '购房意向'
              error = { getFieldError('intention') }
            >
              <Picker
                data = { this.state.intentionList }
                value = { getFieldValue('intention') }
                onChange = { v => { setFieldsValue({ intention: v }) } }
                onOk = { v => { setFieldsValue({ intention: v }) } }
                cascade = { false }
              >
                <CustomChildren>{ getFieldValue('intention') ? null : '请选择客户购房意向' }</CustomChildren>
              </Picker>
            </Item>
            <Item
              link = { true }
              title = '关注户型'
              error = { getFieldError('type') }
            >
              <Picker
                data = { this.state.typeList }
                value = { getFieldValue('type') }
                onChange = { v => { setFieldsValue({ type: v }) } }
                onOk = { v => { setFieldsValue({ type: v }) } }
                cascade = { false }
              >
                <CustomChildren>{ getFieldValue('type') ? null : '请设置客户关注户型' }</CustomChildren>
              </Picker>
            </Item>
            <Item
              link = { true }
              title = '需求面积'
              error = { getFieldError('area') }
            >
              <Picker
                data = { this.state.areaList }
                value = { getFieldValue('area') }
                onChange = { v => { setFieldsValue({ area: v }) } }
                onOk = { v => { setFieldsValue({ area: v }) } }
                cascade = { false }
              >
                <CustomChildren>{ getFieldValue('area') ? null : '请设置客户需求面积' }</CustomChildren>
              </Picker>
            </Item>
            <Item
              link = { true }
              title = '居住地区'
            >
              <Picker
                data = { this.state.regionList }
                value = { getFieldValue('region') }
                onChange = { v => { setFieldsValue({ region: v }) } }
                onOk = { v => { setFieldsValue({ region: v }) } }
              >
                <CustomChildren>{ getFieldValue('region') ? null : '请设置客户居住地区' }</CustomChildren>
              </Picker>
            </Item>
          </div>
          {
            this.state.remark.length ?
              <div className = { style['remark-list'] }>
                {
                  this.state.remark.map((v, i) => (
                    <RemarkItem
                      text = { v.text }
                      imgs = { v.imgs }
                      key = { i }
                      onClick = { e => this.handleRemark(v, i, e) }
                    />
                  ))
                }
              </div> :
              null
          }
          {
            !this.state.isLoading && !this.state.error && !this.state.isSubmit ?
              <div className = { style.add }>
                <a href = '#' onClick = { e => e.preventDefault() || this.setState({ visibleAdd: true }) }>
                  <Icon type = 'add' />
                  新增备注
                </a>
              </div> :
              null
          }
          <Button disabled = { this.state.isLoading || this.state.error || this.state.isSubmit } loading = { this.state.isSubmit } type = 'primary' onClick = { this.handleSubmit } className = { style.submit }>添加至我的客户</Button>
        </Content>
        <Add
          visible = { this.state.visibleAdd }
          onClose = { () => { this.setState({ visibleAdd: false }) } }
          onSubmit = { this.handleAddSubmit }
        />
        <Detail
          visible = { this.state.visibleDetail }
          data = { this.state.remark[this.state.currentRemark] }
          onClose = { () => { this.setState({ visibleDetail: false }) } }
          onSubmit = { this.handleDetailSubmit }
        />
      </Fragment>
    )
  }
}

const Item = props => {
  const {
    required,
    title,
    link,
    children,
    onClick,
    error = [],
    ...others
  } = props

  return  (
    <Fragment>
      <div className = { cs(style.item, { [style['item-required']]: required }) } { ...others }>
        <div className = { style['item-title'] }>
          { title }
        </div>
        <div className = { style['item-content'] } onClick = { onClick }>
          { children }
        </div>
        {
          link ?
            <div className = { style['item-after'] } onClick = { onClick }>
              <Icon type = 'right' className = { style['item-after-icon'] } />
            </div> :
            null
        }
      </div>
      <ItemError data = { error } />
    </Fragment>
  )
}

const RemarkItem = props => (
  <div className = { style['remark-item'] }>
    <div className = { style['remark-item-header'] }>
      <div className = { style['remark-item-header-left'] }>备注</div>
      <div className = { style['remark-item-header-right'] } onClick = { props.onClick }>
        查看全部
        <Icon type = 'right' />
      </div>
    </div>
    <div className = { style['remark-item-body'] }>
      {
        props.imgs.length ?
          <a href = '#'>({ props.imgs.length }图) </a> :
          null
      }
      { props.text }
    </div>
  </div>
)

const Radio = props => (
  <div className = { cs(style.radio, { [style['radio-checked']]: props.checked, [style[`radio-${ props.type }`]]: props.type }) } onClick = { props.onClick }>
    <i></i>
    <span>{ props.title }</span>
  </div>
)

const CustomChildren = props => (
  props.children ?
    <div onClick = { props.onClick } className = { style['item-placeholder'] }>{ props.children }</div> :
    <div onClick = { props.onClick } className = { style['item-static'] }>{ props.extra }</div>
)

const ItemError = props => (
  props.data.length ?
    <ul className = { style['item-error'] }>
      {
        props.data.slice(0, 1).map((v, i) => (
          <li key = { i }>{ v }</li>
        ))
      }
    </ul> :
    null
)