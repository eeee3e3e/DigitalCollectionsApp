<template>
  <div class="m-table">
    <!-- 表格操作栏 -->
    <div class="table-menu">
      <div class="table-menu-left">
        <slot name="tableMenuLeft"></slot>
      </div>
      <div class="table-menu-right">
        <slot name="tableMenuRight"></slot>
      </div>
    </div>
    <!-- 表格 -->
      <el-table
      :ref="refTable"
      :data="data"
      :stripe ="true"
      fit
      border class="table-class" :height="height || autoComputeHeight" :row-key="rowKey" :selection-change="selectionChange">
      <!-- // 选择列 配置options.selection为true -->
        <el-table-column v-if="selection" header-align="center" align="center" type="selection" label="选择" fixed="left" width="55" :reserve-selection="true" />
        <!-- 序列号配置 -->
        <el-table-column v-if="showIndex" header-align="center" align="center" label="序号" type="index" :index="indexMethod"  width="55" :fixed="fixedIndex && 'left'" />
        <template v-for="tableColumn in headers">
          <el-table-column
          v-if="!rightDefaultChecked.includes(tableColumn.prop)"
          :key="tableColumn.prop"
          :prop="tableColumn.prop"
          :label="tableColumn.label"
          :fixed="tableColumn.fixed"
          :sortable ="tableColumn.sortable"
          :align="tableColumn.center || 'center'"
          :width="tableColumn.width || 'auto'"
          :show-overflow-tooltip ="tableColumn.tooltip?tableColumn.tooltip:true">
        <template slot-scope="scope">
          <slot v-if="tableColumn.slot" :name="tableColumn.prop" :row="scope.row" :index="scope.$index"></slot>
          <span v-else-if="tableColumn.prop !=='actions'">{{scope.row[tableColumn.prop]}}</span>
          <div v-else>
            <el-button v-for="actionBtn in scope.row.actions" :key="actionBtn.label" type="text" :disabled="actionBtn.disabled"
            @click="actionBtn.handleClickName ? handleClick(scope.row,actionBtn.handleClickName) : null">{{actionBtn.label}}</el-button>
          </div>
        </template>
        </el-table-column>
        </template>
      </el-table>
      <!-- 分页 -->
      <div :ref="refTable +'Pagination'" class="pagination-content">
        <pagination v-show="pagination.total" :total="pagination.total || 0" :page.sync="pageParams[pageKey]" :limit.sync="pageParams[limitKey]" @pagination="pageChange"></pagination>
      </div>
  </div>
</template>

<script>
export default {
  props:{
    refTable:{
      type:String,
      default:'mTable'
    },
    rowKey:{
      type:String,
      default:''
    },
    selection:{
      type:Boolean,
      default:false
    },
     refreshDom:{
      type:String | Number,
      default:''
    },
    headers:{
      type:Array,
      default: ()=>[]
    },
    data:{
      type:Array,
      default: ()=>[]
    },
    showIndex:{
      type:Boolean,
      default:true
    },
    fixedIndex:{
      type:Boolean,
      default:true
    },
    height:{
      type:String,
      default:''
    },
    pageKey:{
      type:String,
      default:'pageNum'
    },
    limitKey:{
      type:String,
      default:'pageSize'
    },
    clearSelection:{
      type:Boolean,
      default:false
    },
    pageParams:{
      type:Object,
      default: ()=>({
        pageNum:1,
        pageSize:10
      })
    },
    pagination:{
      type:Object,
      default: ()=>({})
    }
  },
  data () {
    return {
      autoComputeHeight:null,
      timer:null,
      drawerVisible:false,
      checkdSelection:[],
      checked:[],
      rightDefaultChecked:[]
    }
  },
  computed: {

  },
  mounted () {
    this.computeHeight()
    // this.$bus.$on('onHandleClick',this.onHandleClick)
    window.addEventListener('resize',this.computeHeight)
  },
  watch:{
    // 监听是否更改，如果更改重新计算高度
    refreshDom:{
      handler (newStr,oldStr) {
        if (newStr === oldStr) return
        this.computeHeight()
      }
    },
    clearSelection:{
      handler (newArr) {
        if (!newArr) return
        this.$refs[this.refTable].clearSelection()
      }
    },
    pagination:{
      handler() {
        this.computeHeight()
      },
      deep:true
    },
    data () {
      this.$nextTick(()=>{
        // this.$refs[this.refTable].bodywrapper.scrollTop = 0
      })
    }
  },
  filters:{
    formteValue (val,code,option) {
      if (code && option) {
        return option[code] && option[code][val] && option[code][val].dictName || '--'
      }
      return val || '--'
    }
  },
  destroyed () {
    window.removeEventListener('resize', this.computeHeight)
  },
  methods:{
    selectionChange () {
      this.$emit('selectionChange',val)
    },
    indexMethod (index) {
      const page = this.pageParams[this.pageKey]
      const limit = this.pageParams[this.limitKey]
      return (index +1) + (page-1) *limit
    },
    computeHeight () {
      if (this.refreshDom) {
        clearTimeout(this.timer)
        this.timer = setTimeout(()=>{
          const mTableOffsetTop = this.$refs[this.refTable].$el.getBoundingClientRect().top
          const mTableOffsetBottom = this.$refs[this.refTable + 'Pagination'].getBoundingClientRect().height
        this.autoComputeHeight = `calc(100vh - ${mTableOffsetTop + 60 + mTableOffsetBottom}px)`
        console.log('this.autoComputeHeight',this.autoComputeHeight)
        },100)
      }
    },
      handleClick (row,handleClickName) {
        this.$emit(handleClickName,row)
      },
    pageChange (page) {
      this.$emit(this.pagination.changeName || 'pageChange' , {
        [this.pageKey]:page.page,
        [this.limitKey]:page.limit
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .m-table {
    .table-menu_left {
      width:100%
    }
    .table-class {
      width:100%;
      margin-top: 8px;
      transition: height 0.1s;
    }
    .el-table__header-wrapper /deep/ .has-gutter .search-header {
      height:64px;
      span {
        display: block;
        height: 22px;
        line-height: 22px;
      }
      .el-input {
        padding:0;
      }
    }
    .el-table /deep/ .el-table__header {
      border-top:2px solid #d7000f;
      th {
        background-color: #f0f0f0;
        font-weight: bolder;
        color: rgb(96,98,102)
      }
    }
    .pagination-content {
      text--align:right;
      .pagination-container {
        padding:16px;
      }
    }
  }
  .table-menu {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .el-button--text {
    color: #d7000f !important;
  }
</style>
