// 统一请求路径前缀在libs/axios.js中修改
import {getRequest, postRequest, putRequest} from '@/libs/axios';


// 审核结算单

export const examine = (id) => {
  return putRequest(`/order/bill/examine/${id}`)
}
// 审核结算单

export const pay = (id) => {
  return putRequest(`/order/bill/pay/${id}`)
}

//获取所有商家
export const getShopList = () => {
  return getRequest(`/store/store/all`)
}

//根据id获取店铺信息
export const getShopByMemberId = (id) => {
  return getRequest(`/store/store/${id}/member`)
}
