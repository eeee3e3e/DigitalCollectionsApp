import {getRequest,postUploadRequest} from '@/libs/axios'


export const GetCommodityListFront = (params) => {
  return getRequest('/api/Commodity/GetCommodityListFront',params)
}

/**
 * 获取报名用户
 */ 
export const GetSignUpUsers = (params) => {
  return getRequest('/api/Commodity/GetSignUpUsers',params)
}
/**
 * 下载报名用户
 */
 export const DownloadSignUpUsers = (params) => {
  return getRequest('/api/Commodity/DownloadSignUpUsers',params,'blob')
}
/**
 * 上传Excel
 */
 export const UploadSignUpUsers = (commodityID,params) => {
  return postUploadRequest(`/api/Commodity/UploadSignUpUsers?CommodityId=${commodityID}`,params)
}