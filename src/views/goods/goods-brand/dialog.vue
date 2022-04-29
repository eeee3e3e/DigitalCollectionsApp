<template>
<el-dialog title="" :visible.sync="dialogVisible" :show-close="false" :close-on-click-modal="false" append-to-body :close-on-press-escape="false" :before-close="handleClose">
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="banner名称" prop="name">
    <el-input v-model="ruleForm.name"></el-input>
  </el-form-item>
  <el-form-item label="商品ID">
    <el-input v-model="ruleForm.name"></el-input>
  </el-form-item>
   <el-form-item label="banner图标">
          <el-upload
            ref="upload"
            action=""
            list-type="picture-card"
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
    handleClose () {
        this.$refs['ruleForm'].resetFields()
        this.dialogVisible = false
        this.$emit('close')
      }
  },
  watch :{
    showAddDialog (val) {
      console.log('33')
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
