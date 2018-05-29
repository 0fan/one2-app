const url = {
  server: 'http://10.0.11.237:8888/',
  // server: 'http://10.0.10.159:8888/',
  // server: 'http://10.0.10.12:8888/'
}

const api = {
  // 获取任务列表
  getTaskList: 'front/Customer/findCustomersByIsFollowUp.json',
  // 获取公告列表
  getNoticeList: 'front/Notice/getNoticeInfo.json',
  // 新增/修改公告信息
  editNotice: 'front/Notice/saveNotice.json',
  // 删除公告
  deleteNotice: 'front/Notice/deleteNotice.json',
  // 获取公告列表
  getNoticeDetail: 'front/Notice/findNoticeById.json',
  // 获取楼盘动态列表
  getEstateDynamicList: 'front/EstateDynamic/getEstateDynamicInfo.json',
  // 新增/修改楼盘动态信息
  editEstateDynamic: 'front/EstateDynamic/saveEstateDynamic.json',
  // 删除楼盘动态信息
  deleteEstateDynamic: 'front/EstateDynamic/deleteEstateDynamic.json',
  // 获取楼盘动态详情
  getEstateDynamic: 'front/EstateDynamic/findEstateDynamicOne.json',
  // 获取房源列表
  getHouseList: 'front/houses/findHouses.json',
  // 获取楼栋
  getHouseUnit: '/front/houses/findHouseBuildingUnit.json',
  // 获取户型
  getHouseType: '/front/houses/findHouseType.json',
  // 获取房源详情
  getHouseDetail: '/front/houses/findHouseDetails.json',
  // 获取存款证明业绩信息
  getDepositAchievement: 'front/IdentityCardImage/countRcjByCustomerPhones.json',
  // 获取存款证明排名详情
  getDepositRankDetail: 'front/IdentityCardImage/rankAllRcjByCustomer.json',
  // 获取认购/签约业绩信息
  getSubscribeOrSignAchievement: 'front/HourseOrder/findSureShppOrSignedByCustomerPhones.json',
  // 获取认购/签约排名详情
  getSubscribeOrSignRankDetail: 'front/HourseOrder/rankAllSureShppOrSignedByCustomer.json',
  // 获取客户详情
  getCustomerDetail: 'front/Customer/findCustomerDetailsById.json',
  // 获取当前用户信息
  getUserInfo: 'front/userInfo/getUserInfoAndUrls.json',
  // 添加客户
  addCustomer: 'front/Customer/saveOrUpdateCustomer.json',
  // 数据字典
  dictionary: 'front/SimpleCode/findByCodeCategoryId.json',
  // 获取城市字典
  getCityMap: 'front/SystemAddress/findAllAddress.json',
}

export {
  url,
  api
}