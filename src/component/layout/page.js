import React, { Component, Fragment } from 'react'
import cs from 'classnames'

export default class Header extends Component {
  render () {
    const {
      children,
      className,
      hasBorder = false,
      ...rest
    } = this.props

    return (
      <div className = { cs('page', className) } { ...rest }>
        { children }
      </div>
    )
  }
}