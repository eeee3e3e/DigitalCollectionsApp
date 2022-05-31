<template>
  <el-form class="search-form" :inline="true">
     <el-form-item label="手机号码" label-width="220px">
      <el-input style="width:220px" size="small" v-model="queryParams.mobileNo" placeholder="请输入手机号码"></el-input>
    </el-form-item>
    <el-form-item label="昵称" label-width="220px">
      <el-input style="width:220px" size="small" v-model="queryParams.nickName" placeholder="请输入昵称"></el-input>
    </el-form-item>
     <el-form-item label="真实姓名" label-width="220px">
      <el-input style="width:220px" size="small" v-model="queryParams.realName" placeholder="请输入真实姓名"></el-input>
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
        mobileNo:'',
        realName:'',
        nickName:''
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
