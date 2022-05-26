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
       @handleCleanhand="handleCleanhand"
       @pageChange="pageChange">
        <template slot="Status" slot-scope="scope">
           <div v-if="scope.row.Status === 'chained'">已经上链</div>
           <div v-if="scope.row.Status === 'chaining'">上链中</div>
         </template>
       </m-table>
     </template>
   </table-page>
</template>
<script>
import { GetTurnCommodityLogBack,CommodityCirculationDDC } from "@/api/goods.js";
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
      data:[]
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    // 手工转赠上链
    handleCleanhand (row) {
      this.$confirm('此操作将手工转赠上链成功, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          CommodityCirculationDDC(row.ID).then(res=>{
            if (res.ReturnCode === '200') {
              this.$message({
            type: 'success',
            message: '手工转赠上链成功!'
          });
            } else {
              this.$message({
            type: 'error',
            message: res.ReturnMessage
          });
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消上链'
          });
        })
    },
    pageChange (v) {
      this.pageParams.pageIndex = v.pageIndex
      this.pageParams.pageSize = v.pageSize
      this.getList()
    },
    // 获取数据
    getList () {
      const queryParams = {
          mobileNo:this.queryParams.mobileNo || '',
          userName:this.queryParams.userName || '',
          commodityName:this.queryParams.commodityName || '',
          isChained:this.queryParams.isChained || '',
          ...this.pageParams
        }
      this.loading = true
      GetTurnCommodityLogBack(queryParams).then(res=>{
        const {Data,TotalCount} =res
        this.data = Data.map(val=>({
          ...val,
          actions:[{label:'手工转赠上链',handleClickName:'handleCleanhand'}]
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
        {label:'商品ID',prop:'CommodityID'},
        {label:'商品编号',prop:'CommodityNo'},
        {label:'商品名称',prop:'CommodityName'},
        {label:'转赠人姓名',prop:'OutUserInfoRealName'},
        {label:'转赠人手机号',prop:'OutUserInfoMobileNo'},
        {label:'转赠人的钱包地址',prop:'OutUserInfoOpbChainClientAddress',width:140},
        {label:'被转增人姓名',prop:'InUserInfoRealName'},
        {label:'被转赠人手机号',prop:'InUserInfoMobileNo'},
        {label:'被转赠人的钱包地址',prop:'InUserInfoOpbChainClientAddress',width:155},
        {label:'转赠时间',prop:'CirculationDateTime'},
        {label:'是否上链',prop:'Status',slot:true},
        {label:'操作',prop:'actions',fixed:'right',width:150}
      ]
    },
    tableRowKeys () {
      return 'ID'
    }
  }
}
</script>
<style lang="scss">

</style>
