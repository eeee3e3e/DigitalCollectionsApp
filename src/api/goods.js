// 统一请求路径前缀在libs/axios.js中修改
import { getRequest, postRequest, putRequest, deleteRequest,postUploadRequest} from '@/libs/axios';

// 获取售卖方式
export const GetSaleModeList = (params) => {
  return getRequest('/api/Dictionary/GetSaleModeList', params)
}
// 城市数藏一码多兑附件上传
export const CreateCommodityDetailsMultiple = (commodityID,params) => {
  return postUploadRequest(`/api/CommodityDetails/CreateCommodityDetailsMultiple?commodityID=${commodityID}`,params);
};
// 城市数藏一码yi兑附件上传
export const CreateCommodityDetailsSingle = (params) => {
  return postRequest(`/api/CommodityDetails/CreateCommodityDetailsSingle`,params);
};
// 获取商品类型
export const GetCommodityTypeListAll = (params) => {
  return getRequest('/api/Dictionary/GetCommodityTypeListAll', params)
}
// 清仓
export const SelloutCommodity = (params) => {
  return postRequest(`/api/Commodity/SelloutCommodity?id=${params}`)
}
// 城市数藏 绑定有赞链接
export const CommodityCreateUrl = (params) => {
  return postRequest('/api/Commodity/CommodityCreateUrl', params)
}
// 城市数藏 添加商品
export const addCommodity = (params) => {
  return postRequest('/api/Commodity/AddCommodity', params)
}
// 城市数藏  获取兑换列表
export const GetExchangesList = (queryParams) => {
  return getRequest(`/api/CommodityDetails/GetExchangesList?commodityId=${queryParams.commodityId}&isCCDID=${queryParams.isCCDID}&isExchanges=${queryParams.isExchanges}&pageIndex=${queryParams.pageIndex}&pageSize=${queryParams.pageSize}`);
};
// 城市数藏  商品列表获取
export const GetCommodityListBack = (queryParams) => {
  return getRequest(`/api/Commodity/GetCommodityListBack?name=${queryParams.name}&code=${queryParams.code}&status=${queryParams.status}&pageIndex=${queryParams.pageIndex}&pageSize=${queryParams.pageSize}`);
};
// 城市数藏一码一兑的兑换码列表
export const GetCommodityDetailsByTypeSingle = (queryParams) => {
  return getRequest(`/api/CommodityDetails/GetCommodityDetailsByTypeSingle?name=${queryParams.name}&comodityCode=${queryParams.comodityCode}&pageIndex=${queryParams.pageIndex}&pageSize=${queryParams.pageSize}`);
};
// 城市数藏一码多兑的兑换码列表
export const GetCommodityDetailsByTypeSingleD = (queryParams) => {
  return getRequest(`/api/CommodityDetails/GetCommodityDetailsByTypeMultiple?name=${queryParams.name}&comodityCode=${queryParams.comodityCode}&pageIndex=${queryParams.pageIndex}&pageSize=${queryParams.pageSize}&starTime=${queryParams.starTime}&endTime=${queryParams.endTime}`);
};
// 城市数藏 删除商品明细（验证码删除）
export const DeleteCommodityDetails = (ids) =>{
  return deleteRequest(`/api/CommodityDetails/DeleteCommodityDetails?id=${ids}`)
}
// 城市数藏 转赠列表
export const GetTurnCommodityLogBack = (queryParams) => {
  return getRequest(`/api/TurnCommodity/GetTurnCommodityLogBack?mobileNo=${queryParams.mobileNo}&userName=${queryParams.userName}&commodityName=${queryParams.commodityName}&isChained=${queryParams.isChained}&pageIndex=${queryParams.pageIndex}&pageSize=${queryParams.pageSize}`);
};
// 城市数藏 用户管理
export const GetUserList = (queryParams) => {
  return getRequest(`/api/UserInfo/GetUserList?mobileNo=${queryParams.mobileNo}&realName=${queryParams.realName}&nickName=${queryParams.nickName}&pageIndex=${queryParams.pageIndex}&pageSize=${queryParams.pageSize}`);
};
// 转赠手动上链
export const CommodityCirculationDDC = (params) => {
  return postRequest(`/api/TurnCommodity/CommodityCirculationDDC?ID=${params}`)
}
// 清除H5缓存
export const RemoveCaches = (params) => {
  return postRequest(`/api/Cache/RemoveCaches?keyword=${params}`)
}
// 商品下架
export const ManualChain = (params) => {
  return postRequest(`/api/UserCommodityExchanges/ManualChain/?commodityDetailsId=${params}`)
}
// 商品下架
export const CommodityOffLine = (params) => {
  return postRequest(`/api/Commodity/CommodityOffLine/?id=${params}`)
}
// 商品shang架
export const CommodityOnLine = (params) => {
  return postRequest(`/api/Commodity/CommodityOnLine/?id=${params}`)
}
//  添加
export const addBrand = (params) => {
    return postRequest('/goods/brand', params)
}
// 修改品牌设置
export const updateBrand = (params) => {
    return putRequest(`/goods/brand/${params.id}`, params)
}
// 禁用品牌
export const disableBrand = (id, params) => {
    return putRequest(`/goods/brand/disable/${id}`, params)
}
//根据分类id获取关联品牌
export const getCategoryBrandListData = (category_id, params) => {
    return getRequest(`/goods/categoryBrand/${category_id}`, params)
}
//保存获取关联品牌
export const saveCategoryBrand = (category_id, params) => {
    return postRequest(`/goods/categoryBrand/${category_id}`, params)
}
//保存获取关联规格
export const saveCategorySpec = (category_id, params) => {
    return postRequest(`/goods/categorySpec/${category_id}`, params)
}

//获取所有可用品牌
export const getBrandListData = (params) => {
    return getRequest('/goods/brand/all', params)
}
// 获取所有可用规格
export const getSpecificationList = (params) => {
    return getRequest('/goods/spec/all', params)
}

//获取分类列表数据
export const getCategoryTree = () => {
  return getRequest(`/goods/category/allChildren`)
}


//  添加或修改规格设置
export const updateSpec = (id,params) => {
    return putRequest(`/goods/spec/${id}`, params)
}

//  上架商品
export const upGoods = (id, params) => {
    return putRequest(`/goods/goods/${id}/up`, params)
  }
  //  下架商品
  export const lowGoods = (id, params) => {
    return putRequest(`/goods/goods/${id}/under`, params)
  }

//  获取商品分页列表
export const getGoodsListData = (params) => {
    return getRequest('/goods/goods/list', params)
}
//  获取待审核商品分页列表
export const getAuthGoodsListData = (params) => {
    return getRequest('/goods/goods/auth/list', params)
}
//  审核商品
export const authGoods = (id, params) => {
    return putRequest(`/goods/goods/${id}/auth`, params)
}

//查询分类绑定参数信息
export const getCategoryParamsListData = (id, params) => {
    return getRequest(`/goods/categoryParameters/${id}`, params)
}

//查询商品绑定参数信息
export const getCategoryParamsByGoodsId = (goodsId, categoryId) => {
    return getRequest(`/goods/parameters/${goodsId}/${categoryId}`)
}
//保存参数
export const insertGoodsParams = (params) => {
    return postRequest('/goods/parameters', params)
}
//更新参数
export const updateGoodsParams = (params) => {
    return putRequest('/goods/parameters', params)
}
//删除参数
export const deleteParams = (id, params) => {
    return deleteRequest(`/goods/parameters/${id}`, params)
}
//保存参数组
export const insertParamsGroup = (params) => {
    return postRequest('/goods/categoryParameters', params)
}
//更新参数组
export const updateParamsGroup = (params) => {
    return putRequest('/goods/categoryParameters', params)
}
//删除参数组
export const deleteParamsGroup = (id, params) => {
    return deleteRequest(`/goods/categoryParameters/${id}`, params)
}

//保存获取关联规格
export const getGoodsSpecInfo = (category_id, params) => {
    return getRequest(`/goods/categorySpec/goods/${category_id}`, params)
}


//获取sku列表
export const getSkuPage = (params) => {
  return getRequest(`/goodsSku/getByPage`, params)
}


//查看商品详情
export const getGoodsDetail = (id) => {
  return getRequest(`/goods/goods/get/${id}`)
}


// 获取统计列表,排行前一百的数据
export const goodsStatistics = (params) => {
    return getRequest(`/statistics/goods`, params)
}



