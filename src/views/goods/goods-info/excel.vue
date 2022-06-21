<template>
  <el-dialog title="上传Excel" :visible.sync="dialogVisible" :show-close="false" :close-on-click-modal="false" append-to-body :close-on-press-escape="false" :before-close="handleClose" width="300px">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">

      <el-form-item :label="labelText" prop="fileList">
        <el-upload ref="upload" action="" :on-change="uploadExcel" :file-list="fileList" :auto-upload="false" accept=".xlsx, .xls">
        <el-button size="small" type="primary" id='upload' ref='uploadBtn'>点击上传Excel</el-button>
        </el-upload>
      </el-form-item>

      <div style="width:100%;text-align:right;margin-top:35px">
        <el-button size="small" type="primary" @click="handleClose">关闭</el-button>
      </div>

    </el-form>
  </el-dialog>
</template>
<script>
import { UploadCommodityAirDropExcel, UploadCommodityLockNumbers } from "@/api/goods.js";
export default {
  name:'excel',
  props:{
    showAddDialogUp: {
      type:Boolean,
      default:false
    },
    showAddDialogLN: {
      type:Boolean,
      default:false
    },
    commodityID: {
      type:String,
      default:''
    },
    lockNumber: {
      type:String,
      default:''
    },
    labelText: {
      type:String,
      default:''
    },
  },
  data () {
    return {
      fileList:[],
      dialogVisible:false,
      ruleForm:{
        fileList:'',
        CommodityID:''
      },
      rules: {
          fileList: [
            { required: true, message: '请上传附件', trigger: 'blur' }
          ],
          // CommodityID: [
          //   { required: true, message: '请输入生成数量', trigger: 'blur' }
          // ]
        }
    }
  },
  mounted() {
    // debugger
    console.log(this.labelText)
  },
  methods:{

    uploadExcel(file,filelist) {

      console.log(file,filelist)
      let fd = new FormData()
      fd.append('files', file.raw)
      console.log(file,filelist)

      // alert(this.lockNumber);
    //       debugger
    // console.log(this.labelText)
    // console.log(this.lockNumber)
      if(this.lockNumber == "lockNumber" ){
        // this.labelText = '锁号上传'

        UploadCommodityLockNumbers(this.commodityID,fd).then(res=>{
          if (res.ReturnCode === '200') {
            const file = `${BASE.API_DEV.managerImage}${res.Data}`
            this.$message({
              message: '上传成功',
              type: 'success'
            })
            this.$emit('getExcelPath', {'file': file, commodityID: this.commodityID})
            this.download('锁号下载', file)
            this.handleClose()
          } else {
            this.$message({
              message: res.ReturnMessage,
            })
          }
        }).catch( res => {} )

      } else {
        // this.labelText = '空投上传'
        UploadCommodityAirDropExcel(this.commodityID,fd).then(res=>{
          // debugger
          if (res.ReturnCode === '200') {
            const file = `${BASE.API_DEV.managerImage}${res.Data}`
            this.$message({
              message: '上传成功',
              type: 'success'
            })
            this.$emit('getExcelPath', {'file': file, commodityID: this.commodityID})
            this.download('空投下载', file)
            this.handleClose()
          } else {
            this.$message({
              message: res.ReturnMessage,
            })
          }
        }).catch( res => {} )

      }

    },

    download(filename, link) {
      let DownloadLink = document.createElement('a');
      DownloadLink.style = 'display: none'; // 创建一个隐藏的a标签
      DownloadLink.download = filename;
      DownloadLink.href = link;
      document.body.appendChild(DownloadLink);
      DownloadLink.click(); // 触发a标签的click事件
      document.body.removeChild(DownloadLink);
    },

    handleClose () {
      this.ruleForm.fileList = ''
      this.ruleForm.CommodityID = ''
      this.dialogVisible = false
      this.$emit('closeUp')
    },

  },
  destroyed () {
    document.createElement('a').remove()
  },
  watch :{
    showAddDialogUp (val) {
      if (val) {
        this.dialogVisible = true
      }
    },
    showAddDialogLN (val) {
      if (val) {
        this.dialogVisible = true
      }
    }

  }
}
</script>
<style lang="less" scoped>
</style>
