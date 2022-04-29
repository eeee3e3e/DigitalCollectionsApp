<template>
  <div class="table-page">
    <!-- 面包屑展示 -->
    <div class="breadcrumb-class"></div>
    <!-- 查询组件展示 -->
    <el-card class="search-card" v-if="showSearch">
      <div slot="header" class="card-title">
        <span class="expand-btn">
          <i v-if="expandSearch" class="el-icon-arrow-down" @click="toggleExpand"></i>
          <i v-else class="el-icon-arrow-up" @click="toggleExpand"></i>
        </span>
        <span>查询</span>
      </div>
      <div class="search-list" v-if="expandSearch">
        <!-- 查询表单插槽 -->
        <slot name="search"></slot>
      </div>
    </el-card>
    <!-- 表格组件展示 -->
    <el-card class="table-card">
      <!-- 表格组件插槽 -->
      <slot name="table"></slot>
    </el-card>
  </div>
</template>
<script>
export default {
  name:'tablePage',
  props:{
    // 面包屑
    breadcrumData:{
      type:Array,
      default:()=>[]
    },
    showSearch:{
      type:Boolean,
      default:false
    },
    expandSearch:{
      type:Boolean,
      default:true
    }
  },
  data () {
    return {

    }
  },
  created () {

  },
  methods:{
    toggleExpand () {
      this.$emit('toggleExpand')
    }
  }
}

</script >
<style lang="scss" scoped>
.table-page{
  background-color: #F0F0F0;
  padding: 0 16px 16px;
  .breadcrumb-class{
    padding: 8px 0;
  }
  .search-card{
    margin-bottom: 12px;
    /deep/ .el-card_body{
      padding: 0;
    }
    .card-title{
      font-weight: bold;
      font-size: 16px;
      vertical-align: middle;
      line-height: 16px;
      .expand-btn{
        margin-right: 8px;
        i{
          color:#D7000F;
          font-weight: bold;
          line-height: 16px;
          font-size: 16px;
        }
      }
    }
  }
  .search-list{
    padding: 0 16px;
    align-items: center;
  }
}
</style>
