import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import cs from 'classnames'
import { Switch, Route } from 'react-router-dom'

export default class   WorkBench extends Component {

  render () {
    const { url } = this.props.match

    return (
      <Switch>
        <Route path = { `${ url }/` } component = { require('../container/index').default } exact />
        <Route path = { `${ url }/lead_index` } component = { require('../container/lead_index/index').default } exact />
        <Route path = { `${ url }/member_index` } component = { require('../container/member_index/index').default } exact />
        <Route path = { `${ url }/task` } component = { require('../container/task/index').default } exact />
        <Route path = { `${ url }/task/:id` } component = { require('../container/task/detail').default } exact />
        <Route path = { `${ url }/task/:id/add-remark` } component = { require('../container/task/add-remark').default } />
        <Route path = { `${ url }/task/:id/deposit` } component = { require('../container/task/deposit').default } />
        <Route path = { `${ url }/task/:id/subscribe` } component = { require('../container/task/subscribe').default } />
        <Route path = { `${ url }/housing` } component = { require('../container/housing/index').default } exact />
        <Route path = { `${ url }/housing/:id/detail` } component = { require('../container/housing/detail').default } />
        <Route path = { `${ url }/housing_console` } component = { require('../container/housing_console/index').default } exact />
        <Route path = { `${ url }/housing_console/:building` } component = { require('../container/housing_console/building').default } exact />
        <Route path = { `${ url }/housing_console/:building/:id` } component = { require('../container/housing_console/detail').default } />
        <Route path = { `${ url }/achievement` } component = { require('../container/achievement/index').default } exact />
        <Route path = { `${ url }/achievement/rank` } component = { require('../container/achievement/rank').default } />
        <Route path = { `${ url }/notice` } component = { require('../container/notice/index').default } exact />
        <Route path = { `${ url }/notice/add` } component = { require('../container/notice/add').default } exact />
        <Route path = { `${ url }/notice/:id` } component = { require('../container/notice/detail').default } />
        <Route path = { `${ url }/housing_dynamic` } component = { require('../container/housing_dynamic/index').default } exact />
        <Route path = { `${ url }/housing_dynamic/add` } component = { require('../container/housing_dynamic/add').default } />
        <Route path = { `${ url }/mortgage_calculator` } component = { require('../container/mortgage_calculator/index').default } />
        <Route path = { `${ url }/customer_management` } component = { require('../container/customer_management/index').default } exact />
        <Route path = { `${ url }/customer_management/customer` } component = { require('../container/customer_management/customer').default } />
        <Route path = { `${ url }/statistics` } component = { require('../container/statistics/index').default } exact />
        <Route path = { `${ url }/statistics/subscription` } component = { require('../container/statistics/subscription').default } />
        <Route path = { `${ url }/statistics/contract` } component = { require('../container/statistics/contract').default } />
        <Route path = { `${ url }/statistics/certificate` } component = { require('../container/statistics/certificate').default } />
        <Route path = { `${ url }/report` } component = { require('../container/report/index').default } />
      </Switch>
    )
  }
}