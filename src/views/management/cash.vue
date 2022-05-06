<template lang="">
  <el-row style="height:100%;">
    <el-col :span="4" :style="{height:this.autoHeight}">
      <el-card  ref="listNav" style="border:1px solid #ccc;width:100%;height:100%;overflow:scroll;padding: 0 16px 16px;margin-top:16px;box-sizing: border-box;">
        <ul class="ul">
                <li  v-for="(item,index) in  Navdata" ::key="index"
                :class="{ 'active':item.ID==current}"
                 @click="addactive(item)">{{item.Name}}</li>
              </ul>
      </el-card>
      <div style="text-align:center">
         <el-pagination small layout="prev, pager, next" :total="total" @size-change="sizeChange" @current-change="handleCurrentChange"></el-pagination>
      </div>
    </el-col>
    <el-col :span="20">
       <table-page style="width:100%;" :showSearch="showSearch" :expandSearch="expandSearch" @toggleExpand="toggleExpand">
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
       :refreshDom="refreshDom"
       @manual="manual">
         <template slot="tableMenuLeft">
         </template>
         <template slot="redectDDCID" slot-scope="scope">
            <span v-if="scope.row.redectDDCID === '' || scope.row.redectDDCID === null"  type="success">否</span>
            <span v-else >是</span>
         </template>
         <template slot="OwnerUserID" slot-scope="scope">
            <span v-if="scope.row.OwnerUserID === '' || scope.row.OwnerUserID === null "  type="success">否</span>
            <span v-else >是</span>
         </template>
       </m-table>
     </template>
   </table-page>
    </el-col>
  </el-row>
</template>
<script>
import search from './search'
import { GetCommodityListBack,GetExchangesList,ManualChain } from "@/api/goods.js";
export default {
    components:{search},
  data () {
    return {
      current: '',
      autoHeight:null,
      loading:false,
      refreshDom:+new Date(),
      pagination:{
        TotalCount:0
      },
      pageParams:{
        pageIndex:1,
        pageSize:10
      },
      pageParamsNav:{
        pageIndex:1,
        pageSize:30
      },
      queryParams:{},
      query:{
        commodityId:'',
        isCCDID:undefined,
        isExchanges:undefined
      },
      showSearch:true,
      expandSearch:true,
      data:[],
      Navdata:[],
      total:0,
    }
  },
  mounted () {
     const mTableOffsetTop = this.$refs.listNav.$el.getBoundingClientRect().top
    this.autoHeight = `calc(100vh - ${mTableOffsetTop + 35 + 27}px)`
    this.getNavList() // 获取导航栏
  },
  methods:{
    sizeChange (e) {
      this.pageParamsNav.pageSize =e
      this.getList()

    },
    handleCurrentChange(val) {
            this.pageParamsNav.pageIndex =e
            this.getList()
          },
    // 动态添加类
    addactive (item) {
      this.current = item.ID
      this.query.commodityId = item.ID
      this.getList()
    },
     // 获取NAV
    getNavList () {
        const queryParams_s = {
          name:this.queryParams.name || '',
          code:this.queryParams.code || '',
          status:this.queryParams.status || '',
          ...this.pageParamsNav
        }
        GetCommodityListBack(queryParams_s).then(res=>{
          this.Navdata = res.Data
          this.current = res.Data.length > 0 ? res.Data[0].ID : ''
          this.query.commodityId = res.Data.length > 0 ? res.Data[0].ID : ''
          this.total = res.TotalCount
          this.getList()
        })
    },
    // 获取数据
    getList () {
      this.loading = true
        const queryParams = {
          commodityId:this.query.commodityId,
          isCCDID:this.query.isCCDID || '',
          isExchanges:this.query.isExchanges || '',
          ...this.pageParams
        }
        GetExchangesList(queryParams).then(res=>{
          const cloneData = res.Data
          cloneData.map(c=>{
             this.$set(c,'redectDDCID',c.DDCID)
             this.$set(c,'RealName',c.OwnerUserInfo.RealName)
             this.$set(c,'MobileNo',c.OwnerUserInfo.MobileNo)
          })
          this.data = cloneData.map(val=>({
          ...val,
          actions: [
          {label:'手动上链',handleClickName:'manual'}]
        }))
        this.pagination.TotalCount =  res.TotalCount
          this.loading = false
        })
    },
    manual (row) {
         this.$confirm('此操作将上链成功, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          ManualChain(row.CommodityDetailsID).then(res=>{
            if (res.ReturnCode === '200') {
              this.$message({
            type: 'success',
            message: '上链成功!'
          });
            } else {
              this.$message({
            type: 'error',
            message: res.ReturnMessage
          });
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消上链'
          });
        })
    },
     // 搜索按钮操作
    handleQuery (params) {
      this.query = {
        commodityId:this.query.commodityId,
        ...this.pageParams,
        ...params,
        }
      this.getList()

    },
    //  重置按钮操作
    resetQuery (params) {
      this.query = {...params}
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
        {label:'商品名称',prop:'CommodityName'},
        {label:'兑换码',prop:'CommodityDetailsCode'},
        {label:'商品编号',prop:'CommodityNo'},
        {label:'是否兑换',prop:'OwnerUserID',slot:true},
        {label:'兑换者名称',prop:'RealName'},
        {label:'兑换者手机号',prop:'MobileNo'},
        {label:'是否上链',prop:'redectDDCID',slot:true},
        {label:'哈希值',prop:'HashCode'},
        {label:'ddcid',prop:'DDCID'},
        {label:'操作',prop:'actions',fixed:'right',width:220},
      ]
    },
    // tableRowKeys () {
    //   return code
    // }
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
</style>
