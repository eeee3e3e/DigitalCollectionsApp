<template>
<div>
   <table-page :showSearch="showSearch" :expandSearch="expandSearch" @toggleExpand="toggleExpand">
     <!-- 查询条件 -->
     <template slot="search">
       <search @search="handleQuery" @resetQuery="resetQuery"></search>
     </template>
     <!-- 表格主体 -->
     <template slot="table">
       <m-table v-loading="loading" hideRightMenu :data="data" :headers="tableHeaders"
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
           <el-button @click="add">添加</el-button>
         </template>
       </m-table>
     </template>
   </table-page>
    <dialog-banner :showAddDialog="showAddDialog" @close="close"></dialog-banner>
   </div>
</template>
<script>
import search from './search'
import dialogBanner from './dialog'
export default {
  components:{search,dialogBanner},
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
          {shmc:'第一张图',code:'SZHB435345232',kc:'7'}
        ]
        this.data = dataCopy.map(val=>({
          ...val
        }))
        this.loading = false
      // })
    },
    down () {

    },
    edit () {

    },
    yjqc () {

    },
    add () {
      console.log('出发')
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
        {label:'banner名称',prop:'shmc'},
        {label:'banner图标',prop:'code'},
        {label:'状态',prop:'kc'},
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
