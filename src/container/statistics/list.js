import React, { Fragment } from 'react'

import style from './index.css'

const List = props => {
  return (
    <table className = { style.list }>
      <tbody>
        {
          props.data.map((v, i) => (
            <Fragment key = { i }>
              {
                v.before ?
                  <tr className = { style['list-item'] } onClick = { e => { props.onItemClick(v, i, e) } }>
                    <td className = { style['list-item-span'] } colSpan = { props.column.length } style = { { minHeight: 'auto', padding: 0 } }>{ v.before }</td>
                  </tr> :
                  null
              }
              <tr className = { style['list-item'] } onClick = { e => { props.onItemClick(v, i, e) } }>
                {
                  props.column.map((_v, _i) => (
                    <td className = { style['list-item-span'] } key = { `${ i }-${ _i }` }>
                      {
                        _v.format ?
                          _v.format(v[_v.field], i, v) :
                          v[_v.field]
                      }
                    </td>
                  ))
                }
              </tr>
            </Fragment>
          ))
        }
      </tbody>
    </table>
  )
}

List.defaultProps = {
  data: [],
  column: [],
  onItemClick: f => f
}

export default List