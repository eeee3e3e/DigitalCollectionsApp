<template lang="">
  <el-row style="height:100%;">
    <el-col :span="4" :style="{height:this.autoHeight}">
      <el-card  ref="listNav" style="border:1px solid #ccc;width:100%;height:100%;overflow:scroll;padding: 0 16px 16px;margin-top:16px;box-sizing: border-box;">
        <ul>
                <li v-for="(value,index) in  Array.from({length:10})" ::key="index">{{index}}</li>
              </ul>
      </el-card>

    </el-col>
    <el-col :span="20">
       <table-page :showSearch="showSearch" :expandSearch="expandSearch" @toggleExpand="toggleExpand">
     <!-- 查询条件 -->
     <template slot="search">
       <search @search="handleQuery" @resetQuery="resetQuery"></search>
     </template>
     <!-- 表格主体 -->
     <template slot="table">
       <m-table v-loading="loading"  hideRightMenu :data="data" :headers="tableHeaders"
       :rowKey="+new Date() + ''"
       :pageKey="'pageIndex'"
       :limitKey="'pageSize'"
       :pageParams="pageParams"
       :pagination="pagination"
       :refreshDom="refreshDom">
         <template slot="tableMenuLeft">
         </template>
         <template slot="FrontImage" slot-scope="scope">
           <div class="imgbox">
              <img class="img" :src="`${url}${scope.row.FrontImage}`" @error="headError"  alt="">
           </div>
         </template>
         <template slot="Description" slot-scope="scope">
           <div style="width:150px;height:80px;" v-html="scope.row.Description"></div>
         </template>
         <template slot="AttachmentList" slot-scope="scope">
           <div style="width:80px;height:80px;overflow:hidden;">
              <img v-for="(item,index) in scope.row.AttachmentList" :key="index" @error="headError" :src="`${url}${item}`" alt="">
           </div>
         </template>
         <template slot="Status" slot-scope="scope">
            <el-tag v-if="scope.row.Status === 'online'"  type="success">正常</el-tag>
            <el-tag v-if="scope.row.Status === 'offline'" type="danger">下架</el-tag>
         </template>
         <template slot="SaleModeID" slot-scope="scope">
            <el-tag v-if="scope.row.SaleModeID === '1'"  type="success">预售</el-tag>
            <el-tag v-if="scope.row.SaleModeID === '2'" type="danger">盲盒</el-tag>
         </template>
       </m-table>
     </template>
   </table-page>
    </el-col>
  </el-row>
</template>
<script>
export default {
  data () {
    return {
      autoHeight:null,
      loading:false,
      refreshDom:+new Date(),
      pagination:{
        total:0
      },
      pageParams:{
        pageIndex:1,
        pageSize:10
      },
      queryParams:{},
      showSearch:true,
      expandSearch:true,
      data:[],
    }
  },
  mounted () {
     const mTableOffsetTop = this.$refs.listNav.$el.getBoundingClientRect().top
    this.autoHeight = `calc(100vh - ${mTableOffsetTop + 35}px)`
    console.log(this.autoHeight)
  },
  methods:{
     // 搜索按钮操作
    handleQuery (params) {

      this.queryParams = {...params}
      this.getList()

    },
    //  重置按钮操作
    resetQuery (params) {
      this.queryParams = {...params}
      // this.getList()
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
        {label:'商品名称',prop:'Name'},
        {label:'兑换码',prop:'Code'},
        {label:'商品编号',prop:'Price'},
        {label:'是否兑换',prop:'LimitNum'},
        {label:'兑换者名称',prop:'StockNum'},
        {label:'兑换者手机号',prop:'CreateDateTime'},
        {label:'是否上链',prop:'StartDateTime'},
        {label:'哈希值',prop:'EndDateTime'},
        {label:'ddcid',prop:'FrontImage',width:220,slot:true},
        {label:'操作',prop:'actions',fixed:'right',width:220},
      ]
    },
    // tableRowKeys () {
    //   return code
    // }
  }
}
</script>
<style lang="">

</style>
