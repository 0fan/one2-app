import React from 'react'
import cs from 'classnames'
import style from './index.css'

const Box = props => (
  <div className = { cs(style['color-box'], { [style[`color-box-${ props.type }`]]: props.type }) }>
    {
      props.header ?
        <div className = { style['color-box-header'] }>{ props.header }</div> :
        null
    }
    <div className = { style['color-box-body'] }>
      {
        props.data.map((v, i) => (
          <div className = { style['color-box-inline'] } key = { i }>
            <div className = { style['color-box-inline-title'] }>{ v.title }</div>：
            <div className = { style['color-box-inline-text'] }>{ v.text }</div>
          </div>
        ))
      }
    </div>
  </div>
)

Box.defaultProps = {
  data: []
}

export default Box