<template>
  <el-dialog title="生成" :visible.sync="dialogVisible" :show-close="false" :close-on-click-modal="false" append-to-body :close-on-press-escape="false" :before-close="handleClose">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
       <el-form-item style="text-align:center;">
           <el-form-item label="生成方式">
              <el-radio v-model="radio" label="1" @change="radio_change">一码多兑</el-radio>
              <el-radio v-model="radio" label="2" @change="radio_change">一码一兑</el-radio>
            </el-form-item>
             <el-form-item v-if="this.radio === '1'" label="上传附件" prop="fileList">
                <el-upload
                ref="upload"
                action=""
                :on-change="UploadFile"
                :file-list="fileList"
                :auto-upload="false"
                >
                <el-button size="small" type="primary">点击上传</el-button>
                <span style="pading-left:5px;">&nbsp;&nbsp;*上传后立即生效</span>
                </el-upload>
             </el-form-item>
             <!-- <el-form-item v-if="this.radio === '2'" label="生成数量" prop="CommodityID">
              <el-input v-model="ruleForm.CommodityID"></el-input>
            </el-form-item> -->
            <div style="width:100%;text-align:right;margin-top:35px">
              <el-button v-if="radio=== '2'"  :disabled="updateStatus" type="primary" @click="submitForm('ruleForm')">提交</el-button>
              <el-button type="primary" @click="handleClose">关闭</el-button>
            </div>
  </el-form-item>
    </el-form>
    </el-dialog>
</template>
<script>
import { CreateCommodityDetailsMultiple,CreateCommodityDetailsSingle } from "@/api/goods.js";
export default {
  name:'generate',
  props:{
    showAddDialogs: {
      type:Boolean,
      default:false
    },
    commodityID: {
      type:String,
      default:''
    },
  },
  data () {
    return {
      updateStatus:false,
      fileList:[],
      radio:'1',
      dialogVisible:false,
      ruleForm:{
        fileList:'',
        CommodityID:''
      },
      rules: {
          fileList: [
            { required: true, message: '请上传附件', trigger: 'blur' }
          ],
          CommodityID: [
            { required: true, message: '请输入生成数量', trigger: 'blur' }
          ]
        }
    }
  },
  methods:{
        download  (filename, link) {
        let DownloadLink = document.createElement('a');
          DownloadLink.style = 'display: none'; // 创建一个隐藏的a标签
          DownloadLink.download = '一码一兑';
          DownloadLink.href = link;
          document.body.appendChild(DownloadLink);
          DownloadLink.click(); // 触发a标签的click事件
          document.body.removeChild(DownloadLink);
      },
    radio_change (v) {
    },
       handleClose () {
         this.ruleForm.fileList = ''
          this.ruleForm.CommodityID = ''
        this.dialogVisible = false
        this.$emit('closes')
      },
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
        if (this.radio === '2') {
          this.updateStatus = true
          CreateCommodityDetailsSingle({commodityID:this.commodityID}).then(res=>{
            if (res.ReturnCode === '200') {
               this.ruleForm.CommodityID = ''
                this.dialogVisible = false
                this.updateStatus = false
                const file = `${BASE.API_DEV.managerImage}${res.Data}`
               this.download('一码一兑',file)
                this.$emit('closes')
            } else {
              this.radio === '1'
                this.$message({
              message: res.ReturnMessage,
              type: 'error'
        });
                this.ruleForm.CommodityID = ''
                this.dialogVisible = false
              this.$emit('closes')
            }
          }).finally(() => {
             this.updateStatus = true
          })
        }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      UploadFile(file,filelist) {
      let fd = new FormData()
      fd.append('files', file.raw)
      CreateCommodityDetailsMultiple(this.commodityID,fd).then(res=>{
        if (res.ReturnCode === '200') {
          this.radio = '1'
        this.ruleForm.fileList= res.Data
          this.$message({
                message: '一码多兑成功',
                type: 'success'
          });
          const file = `${BASE.API_DEV.managerImage}${res.Data}`
          this.download('一码多兑',file)
          // this.$router.push('/exchange/double')
        }else {
          this.ruleForm.fileList = ''
              this.radio === '1'
          this.fileList = []
            this.dialogVisible = false
          this.$emit('closes')
          this.$message({
              message: res.ReturnMessage,
              type: 'error'
        });
        }
      }).catch(res=>{

      })

    },
  },
  destroyed () {
    document.createElement('a').remove()
  },
  watch :{
    showAddDialogs (val) {
      if (val) {
        this.dialogVisible = true
      }
    }

  }
}
</script>
<style lang="less" scoped>
 /deep/ .el-radio__input.is-checked+.el-radio__label {
    color: red !important;
}
 /deep/ .el-radio__input.is-checked .el-radio__inner {
    border-color: red !important;
    background: red !important;
}
</style>
