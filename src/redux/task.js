import { reduxGenerator } from '../util/index'

let [task, inputTaskSuccess, inputTaskError, resetTask] = reduxGenerator('task', {
  data: []
})

export default task
export {
  inputTaskSuccess,
  inputTaskError,
  resetTask
}