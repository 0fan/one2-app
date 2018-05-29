import React, { Component } from 'react'
import _ from 'lodash'
import cs from 'classnames'

export default props => {
  const {
    type,
    className = '',
    library = 'tb',
    ...otherProps
  } = props

  const classString = cs('icon', `iconfont-${ library }`, className, {
    [`icon-${ type }`]: type
  })

  return <i { ...otherProps } className = { classString }></i>
}