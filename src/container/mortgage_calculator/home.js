import React, { Component, Fragment } from 'react'
import cs from 'classnames'
import { Link } from 'react-router-dom'

import style from './home.css'

export default class App extends Component {
  render () {
    const url = this.props.match.url

    return (
      <div className = { style.content }>
        <Item
          type = 'normal'
          link = { `${ url }/normal` }
          title = '通用计算'
          sub = '商业贷款 / 公积金贷款独立计算'
        />
        <Item
          type = 'combine'
          link = { `${ url }/combine` }
          title = '组合计算'
          sub = '商业贷款 / 公积金贷款组合计算'
        />
      </div>
    )
  }
}

const Item = props => (
  <Link className = { cs(style.link, style[`link-${ props.type }`]) } to = { props.link }>
    <h2>{ props.title }</h2>
    <div className = { style.sub }>{ props.sub }</div>
  </Link>
)