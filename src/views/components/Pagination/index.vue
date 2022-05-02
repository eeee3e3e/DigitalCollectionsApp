<template lang="">
  <div :class="{'hidden':hidden}" class="pagination-container">
    <el-pagination :background ="background"
    :current-page.sync="currentPage"
    :page-size.sync="pageSize"
    :layout="layout"
    :page-sizes="pageSizes"
    :total="total"
    v-bind="$attrs"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange">

    </el-pagination>
  </div>
</template>
<script>
export default {
  name:'Pagination',
  props:{
    total:{
      require:true,
      type:Number
    },
    page:{
      type:Number,
      default:1
    },
    limit:{
      type:Number,
      default:20
    },
    pageSizes:{
      type:Array,
      default () {
        return [10,20,30,50]
      }
    },
    layout: {
      type:String,
      default:'total,sizes,prev,pager,next,jumper'
    },
    background:{
      type:Boolean,
      default:true
    },
    autoScroll:{
      type:Boolean,
      default:true
    },
    hidden:{
      type:Boolean,
      default:false
    }
  },
  mounted (){
    console.log('total',this.total)
  },
  computed:{
    currentPage:{
      get () {
        return this.page
      },
      set (val) {
        this.$emit('update:page',val)
      }
    },
    pageSize:{
       get () {
        return this.limit
      },
      set (val) {
        this.$emit('update:limit',val)
      }
    }
  },
  methods:{
    // scrollTo (to,duration,callback) {
    //   const start = postion()
    //   const chnage = to - start
    //   const increment = 20
    //   let currentTime = 0
    //   duration = (typeof (duration) === 'undefined') ? 500 : duration
    //   var animateScroll = function () {
    //     currentTime += increment
    //     move(val)
    //       if (currentTime < duration) {
    //         requestAnimationFrame(animateScroll)
    //       }else{
    //         if (callback && typeof (callback) === 'function') {
    //           callback()
    //         }
    //     }
    //   }
    //   animateScroll()
    // },
    handleSizeChange (val) {
      this.$emit('pagination',{page:this.currentPage,limit:val})
      // if (this.autoScroll) {
      //   this.scrollTo(0,800)
      // }
    },
    handleCurrentChange (val) {
      this.$emit('pagination',{page:val,limit:this.pageSize})
      // if (this.autoScroll) {
      //   this.scrollTo(0,800)
      // }
    }
  }
}
</script>
<style scoped lang="less">
  .pagination-container {
    background:#FFF;
    padding:32px 16px
  }
  .pagination-container.hidden {
    display: none;
  }
 /deep/ .el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: red !important;
    color: #FFF;
}
/deep/ .el-pagination{
  text-align:right;
}
</style>
