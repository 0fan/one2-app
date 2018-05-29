import React, { Component, Fragment } from 'react'
import cs from 'classnames'
import _ from 'lodash'
import PropTypes from 'prop-types'

import { NavBar } from 'antd-mobile'

export default class Header extends Component {
  render () {
    const {
      children,
      className,
      mode = 'light',
      hasBorder = false,
      ...rest
    } = this.props

    return (
      <div className = { cs('header', { 'has-border': hasBorder }, className) }>
        <NavBar
          mode = { mode }
          { ...rest }
        >
          { children }
        </NavBar>
      </div>
    )
  }
}