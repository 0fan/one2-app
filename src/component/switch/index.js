import React, { Component, Fragment } from 'react'

import style from './index.css'

const Switch = props => (
  <div className = { style['switch'] }>
    {
      props.data.map((v, i) => (
        <div
          key = { i }
          onClick = { e => { props.onChange && props.onChange(i, e) } }
          className = { props.activeIndex === i ? style['switch-item-active'] : style['switch-item'] }
        >
          {
            !v.text ?
              <div className = { style['switch-item-title-only'] }>{ v.title }</div> :
              <Fragment>
                <div className = { style['switch-item-title'] }>{ v.title }</div>
                <div className = { style['switch-item-text'] }>{ v.text }</div>
              </Fragment>
          }
        </div>
      ))
    }
  </div>
)

Switch.defaultProps = {
  activeIndex: 0
}

export default Switch