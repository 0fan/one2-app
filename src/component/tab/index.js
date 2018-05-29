import React, { Component, Fragment, Children, cloneElement } from 'react'
import cs from 'classnames'
import _ from 'lodash'
import moment from 'moment'

import style from './index.css'

export default class Tab extends Component {
  static defaultProps = {
    activeIndex: 0,
    onChange: f => f
  }

  render () {
    const {
      tab,
      activeIndex,
      children,
      onChange,
      type
    } = this.props

    const filteredChildren = Children.toArray(children)

    return (
      <Fragment>
        <div className = { cs(style.tab, { [style[`tab-${ type }`]]: type }) }>
          {
            tab.map((v, i) => (
              <div
                onClick = { e => { onChange(i, e) } }
                className = {
                  cs(style['tab-item'], {
                    [style['tab-item-active']]: i === activeIndex
                  })
                }
                key = { i }
              >
                { v.title }
              </div>
            ))
          }
        </div>
        {
          Children.map(filteredChildren, (child, index) => {
            if (!child) {
              return null
            }

            if (index !== activeIndex) {
              return null
            }

            const childProps = { ...child.props }

            return cloneElement(child, childProps)
          })
        }
      </Fragment>
    )
  }
}