// base64字符串转文件流
export default function dataURItoBlob (dataURI, header) {
  if (header) {
    dataURI = header + dataURI
  }

  let byteString = atob(dataURI.split(',')[1]),
      mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0],
      ab = new window.ArrayBuffer(byteString.length),
      ia = new window.Uint8Array(ab)

  for (let i = 0, len = byteString.length; i < len; i++) {
    ia[i] = byteString.charCodeAt(i)
  }

  return new Blob([ab], { type: mimeString })
}