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
       :rowKey="tableRowKeys"
       :pageKey="'pageNumber'"
       :pageParams="pageParams"
       :pagination="pagination"
       :refreshDom="refreshDom"
       @disable_click="disable_click"
       @edit="edit"
       @del="del"
       @enable="enable">
         <template slot="tableMenuLeft">
           <el-button type="primary" size="small" @click="add">添加Banner</el-button>
         </template>
          <template slot="ImgUrl" slot-scope="scope">
           <div class="imgbox">
              <img class="img" :src="`${url}${scope.row.ImgUrl}`" alt="">
           </div>
         </template>
          <template slot="Status" slot-scope="scope">
            <el-tag v-if="scope.row.Status === 'enable'"  type="success">启用</el-tag>
            <el-tag v-if="scope.row.Status === 'disable'" type="danger">禁用</el-tag>
         </template>
         <template slot="LinkUrl" slot-scope="scope">
              <div @click="Link(scope.row.LinkUrl)">{{scope.row.LinkUrl}}</div>
         </template>
       </m-table>
     </template>
   </table-page>
    <dialog-banner :showAddDialog="showAddDialog" :title="title" @close="close" @closes="closes" :content="content"></dialog-banner>
   </div>
</template>
<script>
import { getAddBanner,DeleteBanner,DisableBanner,EnableBanner } from "@/api/index";
import search from './search'
import dialogBanner from './dialog'
export default {
  components:{search,dialogBanner},
  data () {
    return {
      title:'',
      content:{},
      showAddDialog:false,
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
      actionsE:[],
      actionsd:[],
      url:'',
    }
  },
  mounted () {
    this.url = BASE.API_DEV.managerImage
    this.getList()
  },
  methods: {
    Link (url) {
      window.open(`https://${url}`, '_blank');
    },
    close () {
      this.showAddDialog = false
      this.content = {}
      this.getList()
    },
    closes () {
      this.showAddDialog = false
      this.content = {}
    },
    // 获取数据
    getList () {
      this.loading = true
      const queryParams = {
        name:this.queryParams.name || '',
        ...this.pageParams
      }
      getAddBanner(queryParams).then(res=>{
        if (res.ReturnCode === '200') {
          const {Data,TotalCount} =res
        this.data = Data.map(val=>({
          ...val,
          actions: val.Status === 'enable' ? [
          {label:'编辑',handleClickName:'edit'},
          {label:'禁用',handleClickName:'disable_click'},
          {label:'删除',handleClickName:'del'},] :[
          {label:'编辑',handleClickName:'edit'},
          {label:'启用',handleClickName:'enable'},
          {label:'删除',handleClickName:'del'},]
        }))
        this.loading = false
        this.pagination.TotalCount = TotalCount
        }
      })
    },
    // 禁用
    disable_click (row) {
      DisableBanner(row.ID).then(res=>{
        if (res.ReturnCode === '200') {
            this.$message({
              message: '禁用成功',
              type: 'success'
        });
         this.getList()
        }
      })
    },
    //启用
    enable (row) {
      EnableBanner(row.ID).then(res=>{
          if (res.ReturnCode === '200') {
            this.$message({
              message: '启用成功',
              type: 'success'
        });
         this.getList()
        }
      })
    },
    edit (row) {
      this.title="编辑"
      this.content = row
      this.showAddDialog = true
    },
    del (row) {
      DeleteBanner(row.ID).then(res=>{
          this.getList()
      })
    },
    add () {
      this.title = "新增"
      this.showAddDialog = true
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
        {label:'Banner名称',prop:'Name'},
        {label:'Banner类别',prop:'Category'},
        {label:'跳转链接',prop:'LinkUrl',slot:true},
        {label:'图片地址',prop:'ImgUrl',slot:true},
        {label:'状态',prop:'Status',slot:true},
        {label:'创建人',prop:'CreateUserID'},
        {label:'操作',prop:'actions',fixed:'right',width:320},
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
	width: 220px;
	height: 100px;
	overflow: hidden;//img如果超出这个div会隐藏超出部分
	display: flex;//flex布局
	align-items: center;//让img放在div的中间，居中
 }
.img{
  width:auto;
        width: 100%;
        object-fit:cover;
}
 /deep/ .el-button--primary{
  background-color:red;
    border-color: red;
}
</style>
