<template>
  <el-form class="search-form" :inline="true">
    <el-form-item label="商品名称" label-width="180px">
      <el-input style="width:220px" size="small" v-model="queryParams.name"  placeholder="请输入商品名称"></el-input>
    </el-form-item>
    <el-form-item label="生成码编号" label-width="180px">
      <el-input style="width:220px" size="small" v-model="queryParams.comodityCode"  placeholder="请输入编号"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" size="small" icon="el-icon-search" @click="handleQuery">查询</el-button>
      <el-button type="primary" size="small" icon="el-icon-delete" @click="resetQuery">重置</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  name:'search',
  data () {
    return {
      queryParams:{
         comodityCode:'',
         name:''
      }
    }
  },
  mounted () {

  },
  methods:{
    // 查询操作
    handleQuery () {
      this.$emit('search',this.queryParams)
    },
     resetQuery () {
       for (let i in this.queryParams) {
         this.queryParams[i] = ''
       }
      this.$emit('resetQuery',this.queryParams)
    }
  }
}
</script>
<style lang="scss" scoped>
    .el-form-inline .el-form-item {
      vertical-align: middle;
    }
    .search-form {
      padding: 8px 0 0 8px;
    }
    .el-button--primary{
      background: red;
      border-color: red;;
    }
</style>
