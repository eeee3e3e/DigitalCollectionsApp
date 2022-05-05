<template>
  <el-form class="search-form" :inline="true">
    <el-form-item label="是否兑换" label-width="180px">
     <el-select v-model="queryParams.isExchanges" placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
    </el-form-item>
   <el-form-item label="是否上链" label-width="180px">
      <el-select v-model="queryParams.isCCDID" placeholder="请选择">
    <el-option
      v-for="item in options1"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" size="small" icon="el-icon-search" @click="handleQuery">查询</el-button>
      <!-- <el-button type="primary" size="small" icon="el-icon-delete" @click="resetQuery">重置</el-button> -->
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  name:'search',
  data () {
    return {
      value:'',
      queryParams:{
        isExchanges:'',
        isCCDID:''
      },
      options: [{
          value: 'true',
          label: '是'
        }, {
          value: 'false',
          label: '否'
        }],
       options1: [{
          value: 'true',
          label: '是'
        }, {
          value: 'false',
          label: '否'
        }],
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
<style lang="scss" >
/deep/ .el-select-dropdown__item.selected {
  color: red;
  font-weight: 700;
}
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
