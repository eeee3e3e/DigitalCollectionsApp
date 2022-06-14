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
       :pageKey="'pageIndex'"
       :limitKey="'pageSize'"
       :pageParams="pageParams"
       :pagination="pagination"
       :refreshDom="refreshDom"
       @down="down"
       @edit="edit"
       @generate="generate"
       @save="save"
       @shelves="shelves"
       @interlinkage="interlinkage"
       @clearChange="clearChange"
       @uploadExcel="uploadExcel"
       @downloadExcel="downloadExcel"
       @upLoadExcelLockNumber="upLoadExcelLockNumber"
       >
         <template slot="tableMenuLeft">
           <el-button type="primary" size="small" @click="addShop">添加商品</el-button>
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
              <img  class="img" v-for="(item,index) in scope.row.AttachmentList" :key="index" @error="headError" :src="`${url}${item}`" alt="">
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
         <template slot="Sellout" slot-scope="scope">
            <el-tag v-if="scope.row.Sellout === 'sellout'"  type="success">已售罄</el-tag>
            <el-tag v-else></el-tag>
         </template>
       </m-table>
     </template>
   </table-page>
      <edit-shop :showAddDialog="showAddDialog" @close="close" :title="title"  @closes="closes" :content="content"></edit-shop>
      <generate :showAddDialogs="showAddDialogs" @close="close" @closes="closes" :commodityID="commodityID"></generate>
      <interlinkage :showAddDialogss="showAddDialogss"  @closeLInk="closeLInk" :params="params"></interlinkage>
      <uploadExcel :showAddDialogUp="showAddDialogUp" @closeUp="closeUp" @getExcelPath='getExcelPath' :commodityID="commodityID" labelText="空投上传"></uploadExcel>
      <uploadExcelLN :showAddDialogLN="showAddDialogLN" @closeUp="closeUp" @getExcelPath='getExcelPath' :commodityID="commodityID" lockNumber="lockNumber" labelText="锁号上传"></uploadExcelLN>
   </div>
</template>
<script>
import search from './search'
import editShop from './editShop'
import generate from './generate'
import interlinkage from './interlinkage'
import uploadExcel from './excel'
import uploadExcelLN from './excel'
import { GetCommodityListBack,CommodityOffLine,CommodityOnLine,CommodityCreateUrl,SelloutCommodity,DownloadCommodityAirDropRecord } from "@/api/goods.js";
import { MessageBox } from 'element-ui'
export default {
  components:{search,editShop,generate,interlinkage, uploadExcel, uploadExcelLN},
  data () {
    return {
      params:{
        CommodityID:'',
        YouzanUrl:''
      },
      commodityID:'',
      content:{},
      title:'',
      showAddDialogss:false,
      showAddDialog:false,
      showAddDialogs:false,
      showAddDialogUp: false,
      showAddDialogLN: false,
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
      url:''
    }
  },
  mounted () {
    this.getList()
    console.log('BASE.API_DEV.managerImage',BASE.API_DEV.managerImage)
    this.url = BASE.API_DEV.managerImage
  },
  methods: {
    clearChange (row) {
      this.$confirm('此操作将永久清仓, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          SelloutCommodity(row.ID).then(res=>{
           if (res.ReturnCode === '200') {
              this.$message({
                message: '清仓成功',
                type: 'success'
          });
           this.getList()
          } else {
            this.$message({
                message: '清仓失败',
                type: 'error'
          });
          }
        })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消清仓'
            });
          });
      },
     headError(e) {
        e.target.src = require("@/assets/404.png");
      },
    addShop () {
      this.title = '新增'
      this.content = {}
      this.showAddDialog = true
    },
    close () {
      this.showAddDialog = false
      this.showAddDialogs = false
      this.getList()
    },
    closes () {
      this.commodityID = ''
      this.showAddDialog = false
      this.showAddDialogs = false
    },
    closeLInk () {
      this.params.CommodityID = ''
       this.params.YouzanUrl = ''
      this.showAddDialogss = false
       this.getList()
    },
    closeUp () {
      this.params.CommodityID = ''
      this.showAddDialogUp = false
      this.showAddDialogLN = false
      this.getList()
    },
    // 获取数据
    getList () {
      this.loading = true
        const queryParams = {
          name:this.queryParams.name || '',
          code:this.queryParams.code || '',
          status:this.queryParams.status || '',
          ...this.pageParams
        }
        console.log(queryParams)
        GetCommodityListBack(queryParams).then(res=>{
          this.data = res.Data.map(val=>({
          ...val,
          actions: val.Status === 'online' ? 
            [
              {label:'下架',handleClickName:'down'},
              {label:'编辑',handleClickName:'edit'},
              {label:'查看',handleClickName:'save'},
              {label:'生成',handleClickName:'generate'},
              {label:'链接',handleClickName:'interlinkage'},
              {label:'清仓',handleClickName:'clearChange'},
              {label:'上传',handleClickName:'uploadExcel'},
              {label:'下载',handleClickName:'downloadExcel'},
              {label:'锁号',handleClickName:'upLoadExcelLockNumber'},
            ] :
            [
              {label:'上架',handleClickName:'shelves'},
              {label:'编辑',handleClickName:'edit'},
              {label:'查看',handleClickName:'save'},
              {label:'生成',handleClickName:'generate'},
              {label:'链接',handleClickName:'interlinkage'},
              {label:'清仓',handleClickName:'clearChange'},
              {label:'上传',handleClickName:'uploadExcel'},
              {label:'下载',handleClickName:'downLoadExcel'},
              {label:'锁号',handleClickName:'upLoadExcelLockNumber'},
            ]
        }))
          this.loading = false
        })
    },
    interlinkage (row) {
       this.params.CommodityID = row.ID
       this.params.YouzanUrl = row.YouzanUrl ? row.YouzanUrl : ''
       this.showAddDialogss = true
    },
    // 上架
    shelves (row) {
      CommodityOnLine(row.ID).then(res=>{
        if (res.ReturnCode === '200') {
            this.$message({
              message: '此商品上架成功',
              type: 'success'
        });
         this.getList()
        }
      })
    },
    //生成
    generate (row) {
      this.commodityID = row.ID
      this.showAddDialogs = true
    },
    // 查看
    save (row) {
      this.content = row
      this.title = '查看商品详情'
      this.showAddDialog = true
    },
    // 下架
    down (row) {
      CommodityOffLine(row.ID).then(res=>{
          if (res.ReturnCode === '200') {
            this.$message({
              message: '此商品下架成功',
              type: 'success'
        });
         this.getList()
        }
      })
    },
    edit (row) {
      this.content = row
      this.title = '编辑'
      this.showAddDialog = true
    },
    lock () {
      this.$router.push({
        name: "goods-detail",
        query: { },
      })
    },
    
    uploadExcel(row) {
      // debugger
      // alert(this.$refs.uploadBtn)
      this.commodityID = row.ID
      this.showAddDialogUp = true
    },

    upLoadExcelLockNumber(row) {
      // debugger
      this.commodityID = row.ID
      this.showAddDialogLN = true
    },

    getExcelPath(params){
      this.excelPath = params.path
      // this.excelPaths.push(params.commodityID)
      // alert(this.excelPath)
    },

    downloadExcel(row){
      // debugger
      DownloadCommodityAirDropRecord(row.ID, {commodityID: row.ID}).then( res => {
        // debugger
        if (res.ReturnCode === '200') {
          const file = `${BASE.API_DEV.manager}${res.Data}`
          this.download(file)
        } else {
          this.$message({
            message: res.ReturnMessage,
            type: 'error'
          });
        }
      })
    },

    download  (link) {
      let DownloadLink = document.createElement('a');
      DownloadLink.style = 'display: none'; // 创建一个隐藏的a标签
      DownloadLink.download = 'Excel下载';
      DownloadLink.href = link;
      document.body.appendChild(DownloadLink);
      DownloadLink.click(); // 触发a标签的click事件
      document.body.removeChild(DownloadLink);
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
        {label:'商品名称',prop:'Name'},
        {label:'商品编号',prop:'Code'},
        {label:'价格',prop:'Price'},
        {label:'限量',prop:'LimitNum'},
        {label:'库存',prop:'StockNum'},
        {label:'创建时间',prop:'CreateDateTime'},
        {label:'售卖开始时间',prop:'StartDateTime'},
        {label:'预售结束时间',prop:'EndDateTime'},
        {label:'封面',prop:'FrontImage',width:220,slot:true},
        {label:'描述信息',prop:'Description',slot:true,width:220},
        {label:'购买须知',prop:'PurchaseNote'},
        {label:'售卖方式',prop:'SaleModeID',slot:true},
        {label:'状态',prop:'Status',slot:true},
        {label:'售罄状态',prop:'Sellout',slot:true},
        {label:'有赞链接',prop:'YouzanUrl'},
        {label:'发行方名称',prop:'ReleaseUserName'},
        {label:'创作方姓名',prop:'AuthorName'},
        {label:'品牌方名称',prop:'BrandName'},
        {label:'系列',prop:'SerialType'},
        {label:'商品图片',prop:'AttachmentList',slot:true},
        {label:'操作',prop:'actions',fixed:'right',width:360},
      ]
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
        width:100%;
        object-fit:cover;
}
 /deep/ .el-radio__input.is-checked+.el-radio__label {
    color: red !important;
}
 /deep/ .el-radio__input.is-checked .el-radio__inner {
    border-color: red !important;
    background: red !important;
}
</style>
