import { combineReducers } from 'redux'

import user from './user'
import task from './task'
import notice from './notice'
import calculator from './calculator'
import achievement from './achievement'

export default combineReducers({
  task,
  user,
  notice,
  calculator,
  achievement
})