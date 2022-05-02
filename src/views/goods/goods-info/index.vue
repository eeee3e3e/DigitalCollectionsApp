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
       @shelves="shelves">
         <template slot="tableMenuLeft">
           <el-button type="primary" size="small" @click="addShop">添加商品</el-button>
         </template>
         <template slot="FrontImage" slot-scope="scope">
           <div class="imgbox">
              <img class="img" :src="`http://82.156.240.41:9008/${scope.row.FrontImage}`" alt="">
           </div>
         </template>
         <template slot="AttachmentList" slot-scope="scope">
           <div style="width:80px;height:80px" v-for="(item,index) in scope.row.AttachmentList" :key="index">
              <img :src="`http://82.156.240.41:9008/${item}`" alt="">
           </div>
         </template>
         <template slot="Status" slot-scope="scope">
           <div v-if="scope.row.Status === 'online'">正常</div>
           <div v-if="scope.row.Status === 'offline'">下架</div>
         </template>
       </m-table>
     </template>
   </table-page>
      <edit-shop :showAddDialog="showAddDialog" @close="close" :title="title" :content="content"></edit-shop>
      <generate :showAddDialogs="showAddDialogs" @close="close" :commodityID="commodityID"></generate>
   </div>
</template>
<script>
import search from './search'
import editShop from './editShop'
import generate from './generate'
import { GetCommodityListBack,CommodityOffLine,CommodityOnLine } from "@/api/goods.js";
export default {
  components:{search,editShop,generate},
  data () {
    return {
      commodityID:'',
      content:{},
      title:'',
      showAddDialog:false,
      showAddDialogs:false,
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
    this.getList()
  },
  methods: {
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
    // 获取数据
    getList () {
      // this.loading = true
      // getList().then(res=>{
        // const {items} =res
        // this.data = items.map(val=>({
        //   ...val
        // }))
        // const dataCopy = [
        //   {shmc:'数字货币',code:'SZHB435345232',kc:'7',money:'1000000',link:'www.baidu.com',type:''}
        // ]
        const queryParams = {
          name:this.queryParams.name || '',
          code:this.queryParams.code || '',
          status:this.queryParams.code || '',
          ...this.pageParams
        }
        console.log(queryParams)
        GetCommodityListBack(queryParams).then(res=>{
          this.data = res.Data.map(val=>({
          ...val,
          actions: val.Status === 'online' ? [{label:'下架',handleClickName:'down'},
          {label:'编辑',handleClickName:'edit'},
          {label:'查看',handleClickName:'save'},
          {label:'生成',handleClickName:'generate'},] :[{label:'上架',handleClickName:'shelves'},
          {label:'编辑',handleClickName:'edit'},
          {label:'查看',handleClickName:'save'},
          {label:'生成',handleClickName:'generate'},]
        }))
          this.loading = false
        })

        // this.loading = false
      // })
    },
    // 上架
    shelves (row) {
      CommodityOnLine(row.ID).then(res=>{
         this.getList()
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
          this.getList()
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
        {label:'封面',prop:'FrontImage',slot:true},
        {label:'描述信息',prop:'Description'},
        {label:'购买须知',prop:'PurchaseNote'},
        {label:'售卖方式',prop:'SaleModeID'},
        {label:'状态',prop:'Status',slot:true},
        {label:'有赞链接',prop:'YouzanUrl'},
        {label:'发行方名称',prop:'ReleaseUserName'},
        {label:'创作方姓名',prop:'AuthorName'},
        {label:'品牌方名称',prop:'BrandName'},
        {label:'系列',prop:'SerialType'},
        {label:'商品图片',prop:'AttachmentList',slot:true},
        {label:'操作',prop:'actions',fixed:'right',width:220},
      ]
    },
    // tableRowKeys () {
    //   return code
    // }
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
