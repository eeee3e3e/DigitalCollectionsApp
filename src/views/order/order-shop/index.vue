<template>
<div>
   <table-page :showSearch="showSearch" :expandSearch="expandSearch" @toggleExpand="toggleExpand">
     <!-- 查询条件 -->
     <template slot="search">
       <search @search="handleQuery" @resetQuery="resetQuery"></search>
     </template>
     <!-- 表格主体 -->
     <template slot="table">
       <m-table v-loading="loading"  hideRightMenu :data="data" :headers="tableHeaders"
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
   </div>
</template>
<script>
import search from './search'
export default {
  components:{search},
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
          ...val
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
        {label:'商品id',prop:'shmc'},
        {label:'手机号码',prop:'code'},
        {label:'订单编号',prop:'kc'},
        {label:'购买顺序',prop:'money'},
        {label:'创建时间',prop:'link'},
        {label:'订单状态',prop:'type'}
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
