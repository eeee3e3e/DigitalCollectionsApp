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
       @pageChange="pageChange"
       @edit="edit">
         <template slot="tableMenuLeft">
         </template>
         <template slot="IsUsed" slot-scope="scope">
           <div v-if="scope.row.IsUsed === true">已兑换</div>
           <div v-if="scope.row.IsUsed === false">未兑换</div>
         </template>
         <template slot="Category" slot-scope="scope">
           <div v-if="scope.row.Category === 'single'">一码一兑</div>
           <div v-if="scope.row.Category === 'multiple'">一码多兑</div>
         </template>
       </m-table>
     </template>
   </table-page>
</template>
<script>
import { GetCommodityDetailsByTypeSingleD,DeleteCommodityDetails } from "@/api/goods.js";
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
    pageChange (v) {
      this.pageParams.pageIndex = v.pageIndex
      this.pageParams.pageSize = v.pageSize
      this.getList()
    },
    // 获取数据
    getList () {
      const queryParams = {
          comodityCode:this.queryParams.comodityCode || '',
          ...this.pageParams
        }
      this.loading = true
      GetCommodityDetailsByTypeSingleD(queryParams).then(res=>{
        const {Data,TotalCount} =res
        this.data = Data.map(val=>({
          ...val,
          actions:[{label:'删除',handleClickName:'edit'}]
        })).filter((item)=>{
          return  item.Category === 'multiple'
        })
        this.pagination.TotalCount = Number(TotalCount)
        this.loading = false
    })
    },
    edit (row) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          DeleteCommodityDetails(row.ID).then(res=>{
         if (res.ReturnCode === '200') {
            this.$message({
              message: '一码多兑的兑换码列表删除成功',
              type: 'success'
        });
         this.getList()
        } else {
          this.$message({
              message: '一码多兑的兑换码列表删除失败',
              type: 'error'
        });
        }
      })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    },
    // 搜索按钮操作
    handleQuery (params) {
      this.queryParams = {...params}
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
        {label:'商品名称',prop:'CommodityName'},
        {label:'商品编号',prop:'CommodityCode'},
        {label:'兑换码',prop:'CommodityDetailsCode'},
        {label:'类别',prop:'Category',slot:true},
        {label:'创建时间',prop:'CreateTime'},
        {label:'是否兑换',prop:'IsUsed',slot:true},
        {label:'操作',prop:'actions',fixed:'right',width:120},
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
