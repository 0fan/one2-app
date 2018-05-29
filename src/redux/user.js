import { reduxGenerator } from '../util/index'

let [user, inputUserSuccess, inputUserError, resetUser] = reduxGenerator('user', {
  name: 'linfan'
})

export default user
export {
  inputUserSuccess,
  inputUserError,
  resetUser
}