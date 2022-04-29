<template>
<el-dialog title="编辑" :visible.sync="dialogVisible" :show-close="false" :close-on-click-modal="false" append-to-body :close-on-press-escape="false" :before-close="handleClose">
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="商品名称">
    <el-input v-model="ruleForm.name"></el-input>
  </el-form-item>
  <el-form-item label="商品价格">
    <el-input v-model="ruleForm.name"></el-input>
  </el-form-item>
  <el-form-item label="商品数量">
    <el-input v-model="ruleForm.name"></el-input>
  </el-form-item>
  <el-form-item label="预售开始时间">
    <el-col :span="11">
      <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
    </el-col>
    <el-col class="line" :span="2">-</el-col>
    <el-col :span="11">
      <el-time-picker placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
    </el-col>
  </el-form-item>
  <el-form-item label="预售结束时间">
    <el-col :span="11">
      <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
    </el-col>
    <el-col class="line" :span="2">-</el-col>
    <el-col :span="11">
      <el-time-picker placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
    </el-col>
  </el-form-item>
  <el-form-item label="商品类型">
    <el-radio-group v-model="ruleForm.resource">
      <el-radio label="数字藏品"></el-radio>
      <el-radio label="票付通商品"></el-radio>
      <el-radio label="活动商品"></el-radio>
    </el-radio-group>
  </el-form-item>
   <el-form-item label="商品图片">
          <el-upload
            ref="upload"
            action=""
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-change="UploadImage"
            :limit="1"
            :file-list="fileList"
            :auto-upload="false"
        >
          <i class="el-icon-plus"></i>
          <template #tip>
            <div style="font-size: 12px;color: #919191;">
              单次限制上传一张图片
            </div>
          </template>
        </el-upload>
      <el-dialog :visible.sync="dialogV">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
  </el-form-item>
  <el-form-item label="封面图片">
          <el-upload
            ref="uploads"
            action=""
            list-type="picture-card"
            :on-preview="handlePictureCardPreviews"
            :on-remove="handleRemoves"
            :on-change="UploadImages"
            :limit="1"
            :file-list="fileLists"
            :auto-upload="false"
        >
          <i class="el-icon-plus"></i>
          <template #tip>
            <div style="font-size: 12px;color: #919191;">
              单次限制上传一张图片
            </div>
          </template>
        </el-upload>
      <el-dialog :visible.sync="dialogVs">
        <img width="100%" :src="dialogImageUrls" alt="">
      </el-dialog>
  </el-form-item>
  <el-form-item label="商品描述">
    <el-input type="textarea" v-model="ruleForm.desc"></el-input>
  </el-form-item>
  <el-form-item style="text-align:center;">
    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
    <el-button @click="handleClose">取消</el-button>
  </el-form-item>
</el-form>
</el-dialog>
</template>
<script>
export default {
  name:'editShop',
  props:{
    showAddDialog: {
      type:Boolean,
      default:false
    }
  },
  data () {
    return {
      fileList:[],
      fileLists:[],
      disabled:false,
      dialogV:false,
      dialogImageUrl:'',
      dialogVs:false,
      dialogImageUrls:'',
      dialogVisible: false,
      ruleForm: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          date2: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
          type: [
            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          ],
          resource: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ]
        }
    }
  },
  mounted () {
  },
  methods:{
    //移除图片功能
    handleRemove(file, fileList) {
      console.log(file, fileList)

    },
    //预览图片功能
    handlePictureCardPreview(file) {
      console.log(file.url);
      this.dialogV = true
      this.dialogImageUrl = file.url

    },
    UploadImage(file,filelist) {
      //console.log(file);
      let fd = new FormData()
      fd.append('file', file.raw) //传给后台接收的名字 file
      // axios.post('/upload/image', fd, {headers: {'Content-Type': 'multipart/form-data'}}).then(response => {
      //   //上传成功后返回的数据,
      //   console.log("上传图片到:"+response.data);
      //   // 将图片地址给到表单.
      //   this.ruleForm.image=response.data
      // })

    },
    ////
    //移除图片功能
    handleRemoves(file, fileLists) {
      console.log(file, fileLists)

    },
    //预览图片功能
    handlePictureCardPreviews(file) {
      console.log(file.url);
      this.dialogVs = true
      this.dialogImageUrls = file.url

    },
    UploadImages(file,filelists) {
      //console.log(file);
      let fd = new FormData()
      fd.append('file', file.raw) //传给后台接收的名字 file
      // axios.post('/upload/image', fd, {headers: {'Content-Type': 'multipart/form-data'}}).then(response => {
      //   //上传成功后返回的数据,
      //   console.log("上传图片到:"+response.data);
      //   // 将图片地址给到表单.
      //   this.ruleForm.image=response.data
      // })

    },
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // alert('submit!');
            this.$emit('close')
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      handleClose () {
        this.$refs['ruleForm'].resetFields()
        this.dialogVisible = false
        this.$emit('close')
      }
  },
  watch :{
    showAddDialog (val) {
      if (val) {
        this.dialogVisible = true
      }
    }
  }
}
</script>
<style lang="scss">
  .el-button--primary{
    background: red;
    border-color: red;
  }
</style>
