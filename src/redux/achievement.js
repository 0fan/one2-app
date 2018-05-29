import { reduxGenerator } from '../util/index'

let [notice, inputAchievementSuccess, inputAchievementError, resetAchievement] = reduxGenerator('Achievement', {
  data: [],
  date: new Date(),
  // 当前选中的tab
  initialPage: 1
})

export default notice
export {
  inputAchievementSuccess,
  inputAchievementError,
  resetAchievement
}