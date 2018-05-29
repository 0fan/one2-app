export function getHashParameters () {
  try {
    let arr = (location.hash || '').split('?')[1].split('&')
    let params = {}
    for (let i = 0; i < arr.length; i++) {
      let data = arr[i].split('=')
      if (data.length === 2) {
        params[data[0]] = data[1]
      }
    }
    return params
  } catch (e) {
    return {}
  }
}
export default function getHashParameter (key) {
  let params = getHashParameters()
  return params[key]
}