<template>
  <el-row style="height:100%;">
    <el-col :span="4" :style="{height:this.autoHeight}">
      <el-card ref="listNav" style="border:1px solid #ccc;width:100%;height:100%;overflow:scroll;padding: 0 16px 16px;margin-top:16px;box-sizing: border-box;">
        <ul class="ul">
          <li v-for="(item,index) in Navdata"
            :key="index"
            :class="{ 'active':item.ID==current}"
            @click="addactive(item)">{{item.Name}}
          </li>
        </ul>
      </el-card>
      <div style="text-align:center">
        <el-pagination
          small
          layout="prev, pager, next"
          :page-size="pageParamsNav.pageSize"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange">
        </el-pagination>
      </div>
    </el-col>
    <el-col :span="20">
      <table-page style="width:100%;" :showSearch="showSearch" :expandSearch="expandSearch" @toggleExpand="toggleExpand">
        <template slot="search">
          <el-form :model="formLabelAlign" class="search-form" :inline="true">
            <el-form-item label="手机号查询">
              <el-input v-model="formLabelAlign.mobile"></el-input>
            </el-form-item>
            <el-form-item label="名字查询">
              <el-input v-model="formLabelAlign.name" type="text"></el-input>
            </el-form-item>
            <el-form-item label="是否中签">
              <el-select v-model="formLabelAlign.win" placeholder="请选择活动区域">
                <el-option label="全部" :value="0"></el-option>
                <el-option label="中签" :value="1"></el-option>
                <el-option label="未中签" :value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="btn-display-inline">
              <el-button type="primary" size="small" icon="el-icon-search" @click="handleSearchBtn">查询</el-button>
              <el-upload :file-list="fileList" :auto-upload="false" :show-file-list="false" accept=".xlsx, .xls" ref="upload" action="" :on-change="handleUploadExcel" type="primary"  class="upload-demo btn-inline">
                <el-button size="small" type="primary" icon="el-icon-upload2" :loading="uploadLoading">上传Excel</el-button>
              </el-upload>
              <el-button type="primary" size="small" icon="el-icon-download" @click="handleDownload">下载</el-button>
            </el-form-item>
          </el-form>
        </template>
        <template slot="table">
          <m-table
            v-loading="loading"
            hideRightMenu
            :data="data"

            :rowKey="+new Date() + ''"
            :pageKey="'pageIndex'"
            :limitKey="'pageSize'"
            :pageParams="pageParams"
            :pagination="pagination"
            :refreshDom="refreshDom"

            :headers="tableHeaders"
            @pageChange="pageChange">
            <template slot="Win" slot-scope="scope">
              {{scope.row.Win?'中签':'未中签'}}
            </template>
          </m-table>
        </template>
      </table-page>
    </el-col>
  </el-row>
</template>

<script>
import {GetSignUpUsers,DownloadSignUpUsers,UploadSignUpUsers} from '@/api/drawlots.js'
import { GetCommodityListBack } from "@/api/goods.js";
import FileSaver from 'file-saver'
export default {
  data() {
    return {
      autoHeight:null,
      Navdata: [],
      current: '',
      total: 0,
      pageParamsNav:{
        pageIndex:1,
        pageSize:30
      },
      showSearch:true,
      expandSearch:true,
      refreshDom:+new Date(),
      formLabelAlign:{
        mobile:'',
        name:'',
        win:0
      },
      refreshDom:+new Date(),
      pagination:{
        TotalCount:0
      },
      pageParams: {
        pageIndex: 1,
        pageSize: 10
      },
      loading:false,
      data:[],
      fileList: [],
      uploadLoading: false
    }
  },
  computed:{
    tableHeaders() {
      return [
        {label:'报名人',prop:'Name'},
        {label:'手机号',prop:'Mobile'},
        {label:'是否中签',prop:'Win',slot:true}
      ]
    }
  },
  methods: {
    getNavList(GetSignUpUsers){
      GetCommodityListBack({
        pageIndex:this.pageParamsNav.pageIndex,
        pageSize:this.pageParamsNav.pageSize,
        name: '',
        code: '',
        status: ''
      })
      .then((res)=>{
        if(res.ReturnCode==200){
          this.Navdata = res.Data
          this.total = res.TotalCount
          if (GetSignUpUsers&&this.total) {
            this.current = res.Data.length > 0 ? res.Data[0].ID : ''
            this.GetSignUpUsers()
          }
        }
      })
      .catch((error)=>{
        console.log(error);
      })
    },
    pageChange (v) {
      this.pageParams.pageIndex = v.pageIndex
      this.pageParams.pageSize = v.pageSize
      this.GetSignUpUsers()
    },
    GetSignUpUsers(params={}){
      this.loading = true
      params = {
        commodityId: this.current,
        pageIndex: this.pageParams.pageIndex,
        pageSize: this.pageParams.pageSize,
        name: this.formLabelAlign.name || undefined,
        mobile: this.formLabelAlign.mobile || undefined,
        win: [undefined,true,false][this.formLabelAlign.win||0],
        ...params
      }
      GetSignUpUsers(params)
      .then((res)=>{
        if(res.ReturnCode==200){
          this.data = []
          res.Data.map((item)=>{
            this.data.push(item)
          })
          this.pagination.TotalCount = res.TotalCount || 0
        }
      })
      .catch((error)=>{
        console.log(error);
      })
      .finally(()=>{
        this.loading = false
      })
    },
    addactive(item){
      this.current=item.ID
      this.GetSignUpUsers()
    },
    handleSizeChange (val) {
      this.pageParamsNav.pageSize =val
      this.getNavList()
    },
    handleCurrentChange(val) {
      this.pageParamsNav.pageIndex =val
      this.getNavList()
    },
    toggleExpand() {
      this.expandSearch = !this.expandSearch
      this.refreshDom = new Date() + ''
    },
    handleSearchBtn() {
      this.GetSignUpUsers()
    },
    handleUploadExcel(file,filelist) {
      let fd = new FormData()
      fd.append('CommodityId', this.current)
      fd.append('files', file.raw)
      this.uploadLoading=true
      UploadSignUpUsers(this.current,fd).then(res=>{
        if (res.ReturnCode === '200') {
          this.$message({
            message: '上传成功',
            type: 'success'
          })
          this.pageChange({pageIndex:1,pageSize:10})
        }
      }).finally(()=>{
        this.uploadLoading=false
        this.fileList=[]
      })
    },
    handleDownload() {
      DownloadSignUpUsers({
        commodityId: this.current
      }).then(res=>FileSaver.saveAs(new Blob([res.data]),res.headers.filename)).catch(()=>{})
    }
  },
  created () {
    this.getNavList(true)
  },
  mounted() {
    const mTableOffsetTop = this.$refs.listNav.$el.getBoundingClientRect().top
    this.autoHeight = `calc(100vh - ${mTableOffsetTop + 35 + 27}px)`
  }
}
</script>

<style lang="less" scoped>
.active {
  color:red;
}
.ul {
  li{
    cursor: pointer;
    font-size:14px;
    font-weight: 500;
    line-height: 36px;
    text-align:left;
  }
}
.search-form {
  padding: 8px 0 0 8px;
}
.el-button--primary{
  background: red;
  border-color: red;;
}
.btn-inline{
  display: inline-block;
  padding-left: 15px;
  padding-right: 15px;
}
// /deep/.btn-display-inline .el-form-item__content{
//   display: inline-block;
// }
</style>
