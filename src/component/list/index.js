import React, { Component, Fragment } from 'react'
import _ from 'lodash'

import Spacer from '../spacer/index'

import style from './index.css'

const List = props => (
  <Fragment>
    <div className = { style.list }>
      {
        props.data.map((v, i) => (
          <div className = { style.item } key = { i }>
            {
              typeof v === 'string' || v.$$typeof ?
                <div className = { style.text }>{ v }</div> :
                null
            }
            {
              _.isPlainObject(v) ?
                <Fragment>
                  <div className = { style.title }>{ v.title }</div>
                  <div className = { style.text }>{ v.text }</div>
                </Fragment> :
                null
            }
          </div>
        ))
      }
    </div>
    <Spacer />
  </Fragment>
)

List.defaultProps = {
  data: []
}

export default List