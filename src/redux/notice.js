import { reduxGenerator } from '../util/index'

let [notice, inputNoticeSuccess, inputNoticeError, resetNotice] = reduxGenerator('notice', {
  data: []
})

export default notice
export {
  inputNoticeSuccess,
  inputNoticeError,
  resetNotice
}