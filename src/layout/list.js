import React, { Component, Fragment } from 'react'

import { Header, Content } from '../component/layout/index'
import { ListView } from 'antd-mobile'

const { DataSource } = ListView

const data = Array(50).fill(0).map((v, i) => ({
  title: `title-${ i + 1 }`,
  des: '不是所有的兼职汪都需要风吹日晒'
}))

export default class App extends Component {
  constructor (props) {
    super(props)

    const dataSource = new DataSource({
      rowHasChanged: (r1, r2) => r1 !== r1
    })

    this.state = {
      dataSource: dataSource.cloneWithRows(data),
      isLoading: true
    }
  }

  handleEndReached = (e) => {
    console.log('aaa')
  }

  renderSeparator = (sectionId, rowId, adjacentRowHighlighted) => (
    <div
      key = { `${ sectionId }-${ rowId }` }
      style = { {
        height: '1px',
        background: '#ddd'
      } }
    />
  )

  render () {

    return (
      <Fragment>
        <Content>
          <ListView
            dataSource = { this.state.dataSource }

            renderRow = { (v) => <div style = { { lineHeight: '30px' } }>{ v.des }</div> }
            renderHeader = { () => <h1>header</h1> }
            renderFooter = { () => <h1>{ this.state.isLoading ? 'loading...' : 'loaded' }</h1> }
            renderSeparator = { this.renderSeparator }

            useBodyScroll = { true }
            initialListSize = { 3 }

            onEndReached = { this.handleEndReached }
            onEndReachedThreshold = { 1000 }
          />
        </Content>
      </Fragment>
    )
  }
}