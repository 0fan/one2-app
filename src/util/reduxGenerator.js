import _ from 'lodash'

// redux生成函数
export default function reduxGenerator (type, state = {}, reduxArr = []) {
  const ACTION_SUCCESS = `input_${ type }_success`
  const ACTION_ERROR = `input_${ type }_error`
  const ACTION_RESET = `reset_${ type }`

  const initState = {
    auth: false,
    msg: '',

    ...state
  }

  if (_.isPlainObject(reduxArr)) {
    reduxArr = [reduxArr]
  }

  reduxArr = reduxArr
    .concat({
      action: ACTION_SUCCESS,
      result: (state, payload) => ({
        ...state,
        ...payload,
        auth: true
      })
    })
    .concat({
      action: ACTION_ERROR,
      result: (state, msg) => ({
        ...state,
        msg,
        auth: false
      })
    })
    .concat({
      action: ACTION_RESET,
      result: () => initState
    })

  return [
    (state = initState, action) => {
      const { type, payload, msg } = action

      for (let i = 0, len = reduxArr.length; i < len; i++) {
        if (type === reduxArr[i].action) {
          return reduxArr[i].result(state, msg ? msg : payload)
        }
      }

      return state
    },
    (payload) => ({
      payload,
      type: ACTION_SUCCESS,
    }),
    (msg) => ({
      msg,
      type: ACTION_ERROR,
    }),
    () => ({
      type: ACTION_RESET,
    })
  ]
}