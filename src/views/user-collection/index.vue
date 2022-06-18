<template>
   <table-page :showSearch="showSearch" :expandSearch="expandSearch" @toggleExpand="toggleExpand">
     <!-- 查询条件 -->
     <template slot="search">
       <search @search="handleQuery" @resetQuery="resetQuery"></search>
     </template>
     <!-- 表格主体 -->
     <template slot="table">
       <m-table v-loading="loading"  hideRightMenu :data="data" :headers="tableHeaders"
       :rowKey="tableRowKeys"
       :pageParams="pageParams"
       :pagination="pagination"
       :refreshDom="refreshDom"
       @pageChange="pageChange">
        <template slot="CommodityStatus" slot-scope="scope">
           <div v-if="scope.row.CommodityStatus === 'chaining'">上链中</div>
            <div v-if="scope.row.CommodityStatus === 'chained'">已经上链</div>
             <div v-if="scope.row.CommodityStatus === 'allow-give'">允许赠送</div>
         </template>
         <template slot="FrontImage" slot-scope="scope">
           <div class="imgbox">
              <img class="img" :src="`${url}${scope.row.FrontImage}`" @error="headError"  alt="">
           </div>
         </template>
         <template slot="AttachmentList" slot-scope="scope">
           <div style="width:80px;height:80px;overflow:hidden;">
              <img  class="img" v-for="(item,index) in scope.row.AttachmentList" :key="index" @error="headError" :src="`${url}${item}`" alt="">
           </div>
         </template>
          <template slot="IsIdentityVerify" slot-scope="scope">
           <div v-if="scope.row.IsIdentityVerify === true">是</div>
           <div v-if="scope.row.IsIdentityVerify === false">否</div>
         </template>
          <template slot="UserHead" slot-scope="scope">
           <div class="imgbox">
              <img class="img" :src="`${url}${scope.row.UserHead}`" @error="headError"  alt="">
           </div>
         </template>
       </m-table>
     </template>
   </table-page>
</template>
<script>
import { GetMyCommodityDetailsList } from "@/api/goods.js";
import search from './search'
export default {
  components:{search},
  data () {
    return {
      loading:false,
      refreshDom:+new Date(),
      pagination:{
        TotalCount:0
      },
      pageParams:{
        pageIndex:1,
        pageSize:10
      },
      queryParams:{},
      showSearch:true,
      expandSearch:true,
      data:[],
      url:''
    }
  },
  mounted () {
    this.getList()
    this.url = BASE.API_DEV.manager
  },
  methods: {
     headError(e) {
        e.target.src = require("@/assets/404.png");
      },
    pageChange (v) {
      this.pageParams.pageIndex = v.pageIndex
      this.pageParams.pageSize = v.pageSize
      this.getList()
    },
    // 获取数据
    getList () {
      const queryParams = {
          userId:this.queryParams.userId || '',
          ...this.pageParams
        }
      this.loading = true
      GetMyCommodityDetailsList(queryParams).then(res=>{
        const {Data,TotalCount} =res
        this.data = Data.map(val=>({
          ...val
        }))
        this.pagination.TotalCount =TotalCount
        this.loading = false
    })
    },
    // 搜索按钮操作
    handleQuery (params) {
      this.queryParams = {...params}
       this.getList()
    },
    //  重置按钮操作
    resetQuery (params) {
      this.queryParams = {...params}
      this.getList()
    },
    toggleSearch () {
      this.showSearch = !this.showSearch
    },
    toggleExpand () {
      this.expandSearch = !this.expandSearch
      this.refreshDom = new Date() + ''
    },
  },
  computed: {
    tableHeaders () {
      return [
        {label:'商品id',prop:'CommodityID'},
        {label:'商品名称',prop:'CommodityName'},
        {label:'商品编号',prop:'CommodityCode'},
        {label:'所有者真实姓名',prop:'RealName'},
        {label:'所有者昵称',prop:'NickName'},
        {label:'所有者手机号码',prop:'MobileNo'},
        {label:'封面',prop:'FrontImage',slot:true},
        {label:'藏品',prop:'AttachmentList',slot:true},
        {label:'类别',prop:'CommodityTypeID'},
        {label:'发行人名称',prop:'ReleaseUserName'},
        {label:'作者名称',prop:'AuthorName'},
        {label:'品牌方名称',prop:'BrandName'},
        {label:'注册时间',prop:'RegisterTime'},
        {label:'序号',prop:'CommodityNo'},
        {label:'商品哈希值',prop:'HashCode'},
        {label:'兑换时间（生成时间）',prop:'CommodityExchangesDateTime'},
        {label:'状态',prop:'CommodityStatus',slot:true},
        {label:'转赠冷却期到期时间',prop:'CirculationCoolingDate'}
      ]
    },
    tableRowKeys () {
      return 'ID'
    }
  }
}
</script>
<style lang="scss" scoped>
.imgbox{
   background: #FFFFFF;
	width: 100px;
	height: 50px;
	overflow: hidden;//img如果超出这个div会隐藏超出部分
	display: flex;//flex布局
	align-items: center;//让img放在div的中间，居中
 }
.img{
  width:auto;
        width:100%;
        object-fit:cover;
}
</style>
