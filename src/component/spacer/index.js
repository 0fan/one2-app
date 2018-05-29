import React from 'react'

const Spacer = props => <div style = { { height: props.height, background: '#F3F4F8' } }></div>

Spacer.defaultProps = {
  height: '0.2667rem'
}

export default Spacer