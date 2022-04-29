<template>
<div>
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
       @down="down"
       @edit="edit"
       @editLink="editLink"
       @yjqc="yjqc"
       @lock="lock"
       @sc="sc">
         <template slot="tableMenuLeft">
         </template>
       </m-table>
     </template>
   </table-page>
      <edit-shop :showAddDialog="showAddDialog" @close="close"></edit-shop>
   </div>
</template>
<script>
import search from './search'
import editShop from './editShop'
export default {
  components:{search,editShop},
  data () {
    return {
      showAddDialog:false,
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
    close () {
      this.showAddDialog = false
    },
    // 获取数据
    getList () {
      // this.loading = true
      // getList().then(res=>{
        // const {items} =res
        // this.data = items.map(val=>({
        //   ...val
        // }))
        const dataCopy = [
          {shmc:'数字货币',code:'SZHB435345232',kc:'7',money:'1000000',link:'www.baidu.com',type:''}
        ]
        this.data = dataCopy.map(val=>({
          ...val,
          actions:[{label:'下架',handleClickName:'down'},
          {label:'一键清仓',handleClickName:'yjqc'},
          {label:'编辑',handleClickName:'edit'},
          {label:'查看',handleClickName:'lock'},
          {label:'生成',handleClickName:'sc'},
          {label:'链接编辑',handleClickName:'editLink'}]
        }))
        this.loading = false
      // })
    },
    down () {

    },
    yjqc () {

    },
    edit () {
      this.showAddDialog = true
    },
    lock () {
      this.$router.push({
        name: "goods-detail",
        query: { },
      })
    },
    sc () {

    },
    editLink () {

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
        {label:'库存',prop:'kc'},
        {label:'价格',prop:'money'},
        {label:'价格链接',prop:'link'},
        {label:'商品类型',prop:'type'},
        {label:'操作',prop:'actions',fixed:'right',width:320},
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
