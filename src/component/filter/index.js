import React, { Component, Fragment } from 'react'
import cs from 'classnames'
import _ from 'lodash'
import PropTypes from 'prop-types'

import Modal from './modal'

import style from './index.css'

class Filter extends Component {
  state = {
    activeIndex: null
  }

  handleFilterClick = (i, e) => {
    if (this.state.activeIndex === i) {
      this.setState({ activeIndex: null })
    } else {
      this.setState({ activeIndex: i })
    }
  }

  handleItemClick = (e) => {
    this.setState({
      activeIndex: null
    })
    this.props.onItemClick && this.props.onItemClick()
  }

  render () {
    const getFilterClass = () => (
      this.state.activeIndex !== null ?
        style['filter-active'] :
        style['filter']
    )

    const getItemClass = i => (
      this.state.activeIndex === i ?
        style['filter-item-active'] :
        style['filter-item']
    )

    return (
      <Fragment>
        <div className = { getFilterClass() }>
          <div onClick = { e => { this.handleFilterClick(0, e) } } className = { getItemClass(0) }>楼栋</div>
          <div onClick = { e => { this.handleFilterClick(1, e) } } className = { getItemClass(1) }>楼层</div>
          <div onClick = { e => { this.handleFilterClick(2, e) } } className = { getItemClass(2) }>户型</div>
          <div onClick = { e => { this.handleFilterClick(3, e) } } className = { getItemClass(3) }>筛选</div>
        </div>
        <Modal
          onItemClick = { e => { this.handleItemClick(e) } }
          visible = { this.state.activeIndex !== null }
          activeIndex = { this.state.activeIndex }
          onMaskClick = { e => { this.setState({ activeIndex: null }) } }
        />
      </Fragment>
    )
  }
}

export default Filter