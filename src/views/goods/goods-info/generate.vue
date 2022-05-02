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
                </el-upload>
             </el-form-item>
             <!-- <el-form-item v-if="this.radio === '2'" label="生成数量" prop="CommodityID">
              <el-input v-model="ruleForm.CommodityID"></el-input>
            </el-form-item> -->
            <div style="width:100%;text-align:right;">
              <el-button style="margin-top:25px;" type="primary" @click="submitForm('ruleForm')">提交</el-button>
              <el-button type="primary" @click="handleClose">取消</el-button>
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
      fileList:[],
      radio:'1',
      dialogVisible:false,
      ruleForm:{
        fileList:[],
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
         this.ruleForm.fileList = []
          this.ruleForm.CommodityID = ''
        this.dialogVisible = false
        this.$emit('closes')
      },
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
           if (this.radio === '1') {
          this.ruleForm.fileList = []
          this.ruleForm.CommodityID = ''
           this.commodityID = ''
           this.fileList = []
          this.dialogVisible = false
      }
        if (this.radio === '2') {
          CreateCommodityDetailsSingle({commodityID:this.commodityID}).then(res=>{
            if (res.Data) {
              this.commodityID = ''
               this.ruleForm.CommodityID = ''
                this.dialogVisible = false
                const file = `${BASE.API_DEV.manager}${res.Data}`
               this.download('一码一兑',file)
            }
          })
        }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      UploadFile(file,filelist) {
      //console.log(file);
      let fd = new FormData()
      fd.append('files', file.raw)
      CreateCommodityDetailsMultiple(this.commodityID,fd).then(res=>{
        this.radio = '1'
      })

    },
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
