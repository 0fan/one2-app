// 随机生成字符串
export default function randomStr (len = 32, chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz1234567890') {
  if (len <= 0) {
    return ''
  }

  let maxPos = chars.length
  let pwd = ''
  let i = 0

  while (i < len) {
    pwd += chars.charAt(Math.floor(Math.random() * maxPos))

    i += 1
  }

  return pwd
}
