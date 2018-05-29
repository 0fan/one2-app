import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'

import echarts from 'echarts'
import { Header, Content } from '../../component/layout/index'
import Icon from '../../component/icon/index'

import style from './index.css'

export default class App extends Component {
  els = []
  charts = []

  componentDidMount () {
    this.els.forEach((v, i) => {
      this.charts[i] = echarts.init(v)

      this.charts[i].setOption({
        tooltip: {},
        grid: {
          left: 0,
          right: 0,
          bottom: '35',
        },
        xAxis: {
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          data: ['待售', '签约', '认购', '锁定', '销控']
        },
        yAxis: {
          show: false
        },
        series: [{
          label: {
            normal: {
              show: true,
              position: 'top',
              color: '#fff',
              padding: [2, 5],
              borderRadius: 4
            }
          },
          type: 'bar',
          data: [{
            value: 20,
            itemStyle: {
              color: '#e8f4ff'
            },
            label: {
              backgroundColor: '#1891FF',
            }
          }, {
            value: 10,
            itemStyle: {
              color: '#f5f5f5'
            },
            label: {
              backgroundColor: '#999',
            }
          }, {
            value: 10,
            itemStyle: {
              color: '#fffae5'
            },
            label: {
              backgroundColor: '#FFCD00',
            }
          }, {
            value: 10,
            itemStyle: {
              color: '#ffe5e5'
            },
            label: {
              backgroundColor: '#F44900',
            }
          }, {
            value: 10,
            itemStyle: {
              color: '#e5f3e5'
            },
            label: {
              backgroundColor: '#008100',
            }
          }]
        }]
      })
    })
  }

  render () {
    const url = this.props.match.url

    return (
      <Fragment>
        <Header
          hasBorder
          icon = { <Icon type = 'back_android' /> }
          onLeftClick = { () => this.props.history.go(-1) }
        >
          房源
        </Header>
        <Content>
          {
            new Array(5).fill(0).map((v, i) => (
              <Fragment key = { i }>
                <div className = { style.box }>
                  <div className = { style['box-header'] }>
                    <div className = { style['box-header-left'] }>{ i + 1 }栋</div>
                    <div className = { style['box-header-right'] }>
                      <Link to = { `${ url }/${ i + 1 }` }>查看明细 <Icon type = 'right' /></Link>
                    </div>
                  </div>
                  <div className = { style['box-body'] }>
                    <div className = { style['box-chart'] } ref = { el => this.els.push(el) }></div>
                  </div>
                </div>
                <Spacer />
              </Fragment>
            ))
          }
        </Content>
      </Fragment>
    )
  }
}

const Spacer = props => <div className = { style.spacer }></div>