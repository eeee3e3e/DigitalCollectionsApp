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
       </m-table>
     </template>
   </table-page>
</template>
<script>
import { GetCommodityDetailsByTypeSingle,DeleteCommodityDetails } from "@/api/goods.js";
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
    handleCleanhand () {

    },
    pageChange (v) {
      this.pageParams.pageIndex = v.pageIndex
      this.pageParams.pageSize = v.pageSize
      this.getList()
    },
    // 获取数据
    getList () {
      const queryParams = {
          // comodityCode:this.queryParams.comodityCode || '',
          // name:this.queryParams.name || '',
          // ...this.pageParams
        }
      this.loading = true
    //   GetCommodityDetailsByTypeSingle(queryParams).then(res=>{
    //     const {Data,TotalCount} =res
    //     this.data = Data.map(val=>({
    //       ...val,
    //       actions:[{label:'手工转赠上链',handleClickName:'handleCleanhand'}]
    //     })).filter((item)=>{
    //       return  item.Category === 'single'
    //     })
    //     this.pagination.TotalCount =TotalCount
        this.loading = false
    // })
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
        {label:'商品ID',prop:'a'},
        {label:'商品编号',prop:'x'},
        {label:'商品名称',prop:'c'},
        {label:'转赠人姓名',prop:'v'},
        {label:'转赠人手机号',prop:'b'},
        {label:'转赠人的钱包地址',prop:'n'},
        {label:'被转增人姓名',prop:'m'},
        {label:'被转赠人手机号',prop:'s'},
        {label:'被转赠人的钱包地址',prop:'d'},
        {label:'转赠时间',prop:'f'},
        {label:'转赠上链时间',prop:'g'},
        {label:'是否上链',prop:'h'},
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
