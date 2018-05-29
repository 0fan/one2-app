import React, { Component, Fragment } from 'react'
import _ from 'lodash'
import moment from 'moment'
import { createPortal } from 'react-dom'
import ImageCompressor from 'image-compressor.js'

import { Wrapper as OSS, Buffer } from 'ali-oss'

import { wait, randStr, getSuffix } from '../../util/index'

import Animate from 'rc-animate'
import { TextareaItem, ImagePicker, Toast } from 'antd-mobile'
import { Page, Header, Content } from '../../component/layout/index'
import Icon from '../../component/icon/index'

import { config } from '../../config/aliyun'

import style from './remark.css'

const $body = document.body

const client = new OSS(config)

const initState = () => ({
  text: '',
  files: [],
  limit: 9
})

export default class App extends Component {
  origin = {}

  static defaultProps = {
    onSubmit: f => f,
    onClose: f => f
  }

  state = initState()

  constructor (props) {
    super(props)

    this.el = document.createElement('div')
  }

  componentDidMount () {
    $body.appendChild(this.el)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.data) {
      console.log(nextProps.data)
      const { urls = [], imgs = [] } = nextProps.data
      this.origin = {
        text: nextProps.data.text,
        files: urls.map((v, i) => ({
          url: v,
          key: imgs[i]
        })) // 压缩一下,不然太大了
      }

      this.setState(this.origin)
    }
  }

  componentWillUnmount () {
    $body.removeChild(this.el)
  }

  handleChange = v => {
    this.setState({ text: v })
  }

  handleImageChange = async (files, type, index) => {
    this.setState({
      files: files.slice(0, this.state.limit)
    })
    console.log(files)
  }

  submit = async () => {
    const { onSubmit } = this.props
    const { files, text } = this.state
    console.log(files)

    // 如果没有图片则直接submit
    if (!files.length) {
      onSubmit(text, [])
      // 重置数据
      Object.assign(this.state, initState())

      return
    }

    // Toast.loading('上传图片中...', 0, null, true)

    // 上传图片
    try {
      let keys = []
      let urls = []

      Toast.loading(`上传第${ 1 }/${ files.length }张图片中...`, 0, null, true)

      for (let i = 0; i < files.length; i++) {
        // 有key说明是之前上传的图片
        if (files[i].key) {
          Toast.loading(`上传第${ i + 1 }/${ files.length }张图片中...`, 0, null, true)

          keys[i] = files[i].key
          urls[i] = files[i].url

          if (i + 1 === files.length) {
            console.log(keys)
            onSubmit(text, keys, urls)
            // 重置数据
            Object.assign(this.state, initState())
            Toast.hide()
          }

          continue
        }

        const key = `${ moment().format('YYYYMMDD') }/web${ new Date().getTime().toString() }_${ randStr(4) }${ getSuffix(files[i].file.name) }`

        // 压缩一遍,不然手机上传太卡太慢了
        const imageCompressor  = new ImageCompressor()

        const blob = await imageCompressor.compress(files[i].file)

        const reader = new FileReader()

        reader.readAsArrayBuffer(blob)

        reader.onload = async (e) => {

          Toast.loading(`上传第${ i + 1 }/${ files.length }张图片中...`, 0, null, true)

          const buffer = new Buffer(e.target.result)

          const res = await client.put(key, buffer)

          keys[i] = res.name
          urls[i] = res.url

          console.log(`${ i + 1 } 加载完成`)

          if (i + 1 === files.length) {
            console.log(keys)
            onSubmit(text, keys, urls)
            // 重置数据
            Object.assign(this.state, initState())
            Toast.hide()
          }
        }
      }

    } catch (err) {
      Toast.fail(err, 3, null, false)
    }
  }

  render () {
    const {
      visible,
      onClose
    } = this.props

    return (
      createPortal(
        <Animate transitionName = 'slide-left'>
          {
            visible ?
              <Page>
                <Header
                  icon = { <Icon type = 'back_android' /> }
                  onLeftClick = { onClose }
                  rightContent = {
                    !this.state.text.length && !this.state.files.length || _.isEqual(this.origin, _.omit(this.state, 'limit')) ?
                      <span style = { { color: '#A9A9A9' } }>完成</span> :
                      <span onClick = { this.submit }>完成</span>
                  }
                >
                  修改备注
                </Header>
                <Content grey>
                  <TextareaItem
                    value = { this.state.text }
                    onChange = { this.handleChange }
                    className = { style['textarea'] }
                    autoHeight = { true }
                    placeholder = '请输入备注信息'
                  />
                  <div className = { style['picker'] }>
                    <div className = { style['picker-header'] }>
                      添加图片(最多{ this.state.limit }张)
                    </div>
                    <ImagePicker
                      files = { this.state.files.map(v => v.key ? Object.assign({}, v, { url: v.url + '?x-oss-process=image/resize,h_200' }) : v) }
                      onChange = { this.handleImageChange }
                      onImageClick = { (index, fs) => console.log(index, fs) }
                      selectable = { this.state.files.length < this.state.limit }
                      multiple = { true }
                    />
                  </div>
                </Content>
              </Page> :
              null
          }
        </Animate>,
        this.el
      )
    )
  }
}