<template lang="">
  <el-dialog title="有赞链接" :visible.sync="dialogVisible" :show-close="false" :close-on-click-modal="false" append-to-body :close-on-press-escape="false" :before-close="handleClose">
    <el-form  label-width="120px" class="demo-ruleForm">
      <el-form-item label="链接">
         <el-input v-model="queryParams.YouzanUrl"></el-input>
      </el-form-item>
       <el-form-item style="text-align:center;">
    <el-button type="primary" @click="submit">提交</el-button>
    <el-button type="primary" @click="handleClose">取消</el-button>
  </el-form-item>
    </el-form>
    </el-dialog>
</template>
<script>
import { CommodityCreateUrl } from "@/api/goods.js";
export default {
  props:{
    showAddDialogss: {
      type:Boolean,
      default:false
    },
    params:{
      type:Object,
      default:{}
    }
  },
  data () {
    return {
      queryParams:{
        YouzanUrl:'',
        CommodityID:''
      },
      dialogVisible: false,
    }
  },
  methods:{
    submit () {
      CommodityCreateUrl(this.queryParams).then(res=>{
            this.$message({
            type: 'success',
            message: '配置链接成功'
          });
          this.dialogVisible = false
          this.$emit('closeLInk')
          })
    },
    handleClose () {
         this.queryParams.YouzanUrl = ''
         this.queryParams.CommodityID = ''
        this.dialogVisible = false
        this.$emit('closeLInk')
      }
  },
    watch :{
    showAddDialogss (val) {
      if (val) {
        console.log(this.params)
        this.dialogVisible = true
        this.queryParams.YouzanUrl = this.params.YouzanUrl ? this.params.YouzanUrl : ''
        this.queryParams.CommodityID = this.params.CommodityID
      }
    }

  }
}
</script>
<style lang="">

</style>
