/* 专门为rc-form写的配置 */

// 原子验证规则

// 汉字
export const onlyHanzi = (r, v, cb) => {
  if (!/^[\u4e00-\u9fa5]{0,}$/g.test(v)) {
    cb(new Error('只能输入汉字'))
  } else {
    cb()
  }
}

// 手机号码
export const mobile = (r, v, cb) => {
  if (!/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(v)) {
    cb(new Error('输入的手机号码格式错误'))
  } else {
    cb()
  }
}

// 组合验证规则

// 中文姓名
export const valid_name = [{
  required: true,
  message: '请输入姓名'
}, {
  min: 2,
  message: '姓名最少2个字符'
}, {
  max: 6,
  message: '姓名最多6个字符'
}, {
  validator: onlyHanzi
}]

// 手机号码
export const valid_mobile = [{
  required: true,
  message: '请输入手机号码'
}, {
  validator: mobile
}]