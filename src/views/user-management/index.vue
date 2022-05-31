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
        <template slot="IsAdmin" slot-scope="scope">
           <div v-if="scope.row.IsAdmin === true">是</div>
           <div v-if="scope.row.IsAdmin === false">否</div>
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
import { GetUserList } from "@/api/goods.js";
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
    // 空头兑换
    handleCleanhand (row) {

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
          nickName:this.queryParams.nickName || '',
          realName:this.queryParams.realName || '',
          ...this.pageParams
        }
      this.loading = true
      GetUserList(queryParams).then(res=>{
        const {Data,TotalCount} =res
        this.data = Data.map(val=>({
          ...val,
          actions:[{label:'空头兑换',handleClickName:'handleCleanhand'}]
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
        {label:'用户ID',prop:'ID'},
        {label:'用户头像',prop:'UserHead' ,slot:true},
        {label:'真实姓名',prop:'RealName'},
        {label:'出生日期',prop:'BirthDate'},
        {label:'手机号',prop:'MobileNo'},
        {label:'昵称',prop:'NickName'},
        {label:'备注',prop:'Remark'},
        {label:'登录名',prop:'LoginName'},
        {label:'注册时间',prop:'RegisterTime'},
        {label:'性别',prop:'Gender'},
        {label:'是否为超级管理员',prop:'IsAdmin',slot:true},
        {label:'是否实名',prop:'IsIdentityVerify',slot:true},
        {label:'用户钱包地址',prop:'OpbChainClientAddress'},
        {label:'成功邀请人数',prop:'RecmmendationUserCount'},
        {label:'操作',prop:'actions',fixed:'right',width:150}
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
