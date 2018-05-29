import React, { Component, Fragment } from 'react'
import cs from 'classnames'
import _ from 'lodash'
import PropTypes from 'prop-types'

export default class Header extends Component {
  render () {
    const {
      children,
      className,
      grey,
      hasToolbar,
      ...rest
    } = this.props

    return (
      <div className = { cs('content', { 'content-grey': grey, 'content-hasToolbar': hasToolbar }, className) } { ...rest }>
        { children }
      </div>
    )
  }
}