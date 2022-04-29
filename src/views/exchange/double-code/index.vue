<template>
   <table-page :showSearch="showSearch" :expandSearch="expandSearch" @toggleExpand="toggleExpand">
     <!-- 查询条件 -->
     <template slot="search">
       <search @search="handleQuery" @resetQuery="resetQuery"></search>
     </template>
     <!-- 表格主体 -->
     <template slot="table">
       <m-table v-loading="loading" selection hideRightMenu :data="data" :headers="tableHeaders"
       :rowKey="+new Date() + ''"
       :pageKey="'pageNumber'"
       :pageParams="pageParams"
       :pagination="pagination"
       :refreshDom="refreshDom"
       @edit="edit">
         <template slot="tableMenuLeft">
         </template>
       </m-table>
     </template>
   </table-page>
</template>
<script>
import search from './search'
export default {
  components:{search},
  data () {
    return {
      loading:false,
      refreshDom:+new Date(),
      pagination:{
        total:0
      },
      pageParams:{
        pageNumber:1,
        pageSize:10
      },
      showSearch:true,
      expandSearch:true,
      data:[]
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    // 获取数据
    getList () {
      // this.loading = true
      // getList().then(res=>{
        // const {items} =res
        // this.data = items.map(val=>({
        //   ...val
        // }))
        const dataCopy = [
          {shmc:'数字货币',code:'SZHB435345232',scbh:'23453463',time:'2022-04-26',isExchange:'是'}
        ]
        this.data = dataCopy.map(val=>({
          ...val,
          actions:[{label:'删除',handleClickName:'edit'}]
        }))
        this.loading = false
      // })
    },
    edit () {

    },
    // 搜索按钮操作
    handleQuery () {

    },
    //  重置按钮操作
    resetQuery () {
      this.searchParams = {}
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
        {label:'商品名称',prop:'shmc'},
        {label:'商品编号',prop:'code'},
        {label:'生成码编号',prop:'scbh'},
        {label:'创建时间',prop:'time'},
        {label:'是否兑换',prop:'isExchange'},
        {label:'操作',prop:'actions',fixed:'right',width:120},
      ]
    },
    // tableRowKeys () {
    //   return code
    // }
  }
}
</script>
<style lang="scss">

</style>
