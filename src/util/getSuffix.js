export default function getSuffix (v = '') {
  const res = /\.[^.]+/.exec(v)

  return res ? res[0] : ''
}