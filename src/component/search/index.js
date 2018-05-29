import React, { Component, Fragment } from 'react'

import Icon from '../icon/index'

import style from './index.css'

export default class Search extends Component {
  static defaultProps = {
    value: '',
    onChange: f => f,
    onSubmit: f => f,
    onSearchClick: f => f,
    onClear: f => f,
    onLoad: f => f,
    fake: true,
    placeholder: '搜索'
  }

  handleInput = e => {
    this.props.onChange(e.target.value)
  }

  handleKeyDown = e => {
    if (e.keyCode === 13) {
      this.props.onSubmit(this.state.val)
    }
  }

  render () {
    const {
      fake,
      onSearchClick,
      placeholder,
      onSubmit,
      onChange,
      onClear,
      onLoad,
      value,
      ...others
    } = this.props

    return (
      <div className = { style.search } { ...others } >
        <Icon type = 'search' />
        <div className = { style['search-body'] }>
          {
            fake ?
              <div className = { style['search-fake'] } onClick = { onSearchClick }>{ placeholder }</div> :
              <Fragment>
                <input
                  value = { value }
                  className = { style['search-input'] }
                  onChange = { this.handleInput }
                  onKeyDown = { this.handleKeyDown }
                  type = 'text'
                  autoComplete = 'off'
                  placeholder = { placeholder }
                  ref = { el => onLoad(el) }
                />
                {
                  value.length ?
                    <Icon type = 'close' className = { style.clear } onClick = { onClear } /> :
                    null
                }
              </Fragment>
          }
        </div>
      </div>
    )
  }
}