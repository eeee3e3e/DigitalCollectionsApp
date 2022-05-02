<template>
<el-dialog :title="title" :visible.sync="dialogVisible" :show-close="false" :close-on-click-modal="false" append-to-body :close-on-press-escape="false" :before-close="handleClose">
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="banner名称" prop="Name">
    <el-input v-model="ruleForm.Name"></el-input>
  </el-form-item>
  <el-form-item label="Banner类别">
    <el-radio v-model="ruleForm.Category" label="首页" >首页</el-radio>
    <el-radio v-model="ruleForm.Category" label="会员中心" >会员中心</el-radio>
  </el-form-item>
  <el-form-item label="Linkurl" prop="LinkUrl">
    <el-input v-model="ruleForm.LinkUrl"></el-input>
  </el-form-item>
   <el-form-item label="上传图片" prop="ImgUrl">
     <el-upload
            ref="uploads"
            action=""
            list-type="picture-card"
            :on-preview="handlePictureCardPreviewf"
            :on-remove="handleRemovef"
            :on-change="UploadImagef"
            :file-list="ImgUrl"
            :auto-upload="false"
            :limit="1"
        >
          <i class="el-icon-plus"></i>
          <template #tip>
            <div style="font-size: 12px;color: #919191;">
              单次限制上传一张图片且封面只能上传一张
            </div>
          </template>
        </el-upload>
  </el-form-item>
  <el-form-item style="text-align:center;">
    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
    <el-button type="primary" @click="handleClose">取消</el-button>
  </el-form-item>
</el-form>
</el-dialog>
</template>
<script>
import { uploadCity,AddBanner } from "@/api/index";
export default {
  name:'editShop',
  props:{
    showAddDialog: {
      type:Boolean,
      default:false
    },
     content:{
      type:Object,
      default:{}
    },
     title:{
      type:String,
      default:''
    }
  },
  data () {
    return {
      ImgUrl:[],
      Category:'',
       optionsCommodityTypeID:[],
      optionsSaleModeID:[],
      AttachmentList:[],
          FrontImage:[{url:''}],
      fileLists:[],
      disabled:false,
      dialogV:false,
      dialogImageUrl:'',
      dialogVs:false,
      dialogImageUrls:'',
      dialogVisible: false,
      fileList:[],
      disabled:false,
      dialogV:false,
      dialogImageUrl:'',
      ruleForm: {
        ID:'',
          Name: '',
          Category: '',
          LinkUrl: '',
          ImgUrl: ''
        },
        rules: {
          Name: [
            { required: true, message: '请输入banner名称', trigger: 'blur' }
          ],
          Category: [
            { required: true, message: '请选择banner类别', trigger: 'change' }
          ],
          LinkUrl: [
            { required: true, message: '请输入LinkUrl', trigger: 'blur'}
          ],
          ImgUrl: [
            { required: true, message: '请上传图片', trigger: 'blur' }
          ]
        }
    }
  },
  mounted () {
  },
  methods:{
       ////       封面
    //移除图片功能
    handleRemovef(file, fileList) {
    this.ImgUrl= []
      this.ruleForm.ImgUrl = ''
    },
    //预览图片功能
    handlePictureCardPreviewf(file) {
      this.dialogV = true
      this.dialogImageUrl = file.url

    },
    UploadImagef(file,filelist) {
      //console.log(file);
      let fd = new FormData()
      fd.append('files', file.raw)
      uploadCity(file.name,fd).then(res=>{
        this.ruleForm.ImgUrl = res.Data
      })

    },
    handleClose () {
      this.ImgUrl = []
      this.ID = '',
           this.ruleForm.Name = '',
          this.ruleForm.Category = '',
          this.ruleForm.LinkUrl = '',
          this.ruleForm.ImgUrl = ''
          this.dialogVisible = true
        this.$refs['ruleForm'].resetFields()
        this.dialogVisible = false
        this.$emit('close')
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            AddBanner(this.ruleForm).then(res=>{
              this.dialogVisible = false
               this.$emit('close')
              this.ImgUrl = []
              this.ID = '',
           this.ruleForm.Name = '',
          this.ruleForm.Category = '',
          this.ruleForm.LinkUrl = '',
          this.ruleForm.ImgUrl = ''
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
  },
  watch :{
    showAddDialog (val) {
      if (val) {
        if (this.title === '编辑') {
          this.ruleForm = {...this.content}
          this.ImgUrl = []
          console.log('this.content.ImgUrl',this.content.ImgUrl)
          if (this.content.ImgUrl !== '' && this.content.ImgUrl !== 'string') {
            this.ImgUrl = [{url:''}]
             this.ImgUrl[0].url = `http://82.156.240.41:9008/${this.content.ImgUrl}`
          } else {
            this.ImgUrl = []
          }
          this.dialogVisible = true
        } else {
          this.ID = ''
          this.ImgUrl = []
           this.ruleForm.Name = '',
          this.ruleForm.Category = '',
          this.ruleForm.LinkUrl = '',
          this.ruleForm.ImgUrl = ''
          this.dialogVisible = true
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .el-button--primary{
    background: red;
    border-color: red;
  }
   /deep/ .el-radio__input.is-checked+.el-radio__label {
    color: red !important;
}
 /deep/ .el-radio__input.is-checked .el-radio__inner {
    border-color: red !important;
    background: red !important;
}
</style>
