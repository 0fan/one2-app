// 返回常用的http状态码说明
export default function getHttpStatusText (status) {
  switch (status) {
    case 301:
      return '请求的地址已永久移动到新位置'
    case 401:
      return '用户没有权限（令牌、用户名、密码错误）'
    case 403:
      return '用户得到授权，但是访问是被禁止的'
    case 404:
      return '发出的请求针对的是不存在的记录，服务器没有进行操作'
    case 405:
      return '禁用请求中指定的方法'
    case 408:
      return '请求超时'
    case 410:
      return '请求的资源被永久删除，且不会再得到的'
    case 413:
      return '请求实体过大'
    case 414:
      return '请求的 URI 过长'
    case 415:
      return '不支持的媒体类型'
    case 500:
      return '服务器发生错误，请检查服务器'
    case 501:
      return '服务器不具备完成请求的功能'
    case 502:
      return '网关错误'
    case 503:
      return '服务不可用，服务器暂时过载或维护'
    case 504:
      return '网关超时'
    default:
      return ['连接失败']
  }
}