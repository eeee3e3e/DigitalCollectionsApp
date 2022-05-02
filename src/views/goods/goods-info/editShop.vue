<template>
<el-dialog :title="title" :visible.sync="dialogVisible" :show-close="false" :close-on-click-modal="false" append-to-body :close-on-press-escape="false" :before-close="handleClose">
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
    <el-form-item v-if="title === '新增'" label="商品类型" prop="CommodityTypeID">
     <el-select  :disabled="this.title === '查看商品详情'" style="width:100%" v-model="ruleForm.CommodityTypeID" placeholder="请选择">
    <el-option
      v-for="item in optionsCommodityTypeID"
      :key="item.ID"
      :label="item.Name"
      :value="item.ID">
    </el-option>
  </el-select>
  </el-form-item>
  <el-form-item v-if="title === '新增'" label="售卖方式" prop="SaleModeID">
    <el-select  :disabled="this.title === '查看商品详情'" style="width:100%" v-model="ruleForm.SaleModeID" placeholder="请选择">
    <el-option
      v-for="item in optionsSaleModeID"
      :key="item.ID"
      :label="item.Name"
      :value="item.ID">
    </el-option>
  </el-select>
  </el-form-item>
  <el-form-item label="商品名称" prop="Name">
    <el-input  :disabled="this.title === '查看商品详情'" v-model="ruleForm.Name"></el-input>
  </el-form-item>
  <el-form-item label="商品价格" prop="Price">
    <el-input  :disabled="this.title === '查看商品详情'" v-model="ruleForm.Price"></el-input>
  </el-form-item>
  <el-form-item label="限量" prop="LimitNum">
    <el-input  :disabled="this.title === '查看商品详情'" v-model="ruleForm.LimitNum"></el-input>
  </el-form-item>
   <el-form-item label="系列" prop="SerialType">
    <el-input  :disabled="this.title === '查看商品详情'" v-model="ruleForm.SerialType"></el-input>
  </el-form-item>
  <el-form-item label="品牌方名称" prop="BrandName">
    <el-input  :disabled="this.title === '查看商品详情'" v-model="ruleForm.BrandName"></el-input>
  </el-form-item>
   <el-form-item label="创作方姓名" prop="AuthorName">
    <el-input  :disabled="this.title === '查看商品详情'" v-model="ruleForm.AuthorName"></el-input>
  </el-form-item>
    <el-form-item label="发行方名称" prop="ReleaseUserName">
    <el-input  :disabled="this.title === '查看商品详情'" v-model="ruleForm.ReleaseUserName"></el-input>
  </el-form-item>
   <el-form-item label="购买须知" prop="PurchaseNote">
    <el-input  :disabled="this.title === '查看商品详情'" v-model="ruleForm.PurchaseNote"></el-input>
  </el-form-item>
  <el-form-item label="商品库存" v-if="this.title === '查看商品详情'">
    <el-input  :disabled="this.title === '查看商品详情'" v-model="ruleForm.StockNum"></el-input>
  </el-form-item>
  <el-form-item label="售卖开始时间" prop="StartDateTime">
    <Date-picker  :disabled="this.title === '查看商品详情'" type="datetime" format="yyyy-MM-dd HH:mm:ss" @on-change="teststart" :value="ruleForm.StartDateTime"  placeholder="选择日期和时间" style="width: 200px"></Date-picker>
  </el-form-item>
  <el-form-item label="售卖结束时间" prop="EndDateTime">
     <Date-picker  :disabled="this.title === '查看商品详情'" type="datetime" format="yyyy-MM-dd HH:mm:ss" @on-change="testend" :value="ruleForm.EndDateTime" placeholder="选择日期和时间" style="width: 200px"></Date-picker>
  </el-form-item>
  <el-form-item label="封面" prop="FrontImage">
    <el-upload
     :disabled="this.title === '查看商品详情'"
            ref="uploads"
            action=""
            list-type="picture-card"
            :on-preview="handlePictureCardPreviewf"
            :on-remove="handleRemovef"
            :on-change="UploadImagef"
            :file-list="FrontImage"
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
      <el-dialog :visible.sync="dialogV" append-to-body>
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
  </el-form-item>
   <el-form-item label="商品图片" prop="AttachmentList">
          <el-upload
           :disabled="this.title === '查看商品详情'"
            ref="upload"
            action=""
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-change="UploadImage"
            :file-list="AttachmentList"
            :auto-upload="false"
        >
          <i class="el-icon-plus"></i>
          <template #tip>
            <div style="font-size: 12px;color: #919191;">
              单次限制上传一张图片
            </div>
          </template>
        </el-upload>
      <el-dialog :visible.sync="dialogVs" append-to-body>
        <img width="100%" :src="dialogImageUrls" alt="">
      </el-dialog>
  </el-form-item>
  <el-form-item label="描述信息" prop="Description">
    <el-input  :disabled="this.title === '查看商品详情'" type="textarea" v-model="ruleForm.Description"></el-input>
  </el-form-item>
  <el-form-item style="text-align:center;">
    <el-button type="primary"  :disabled="this.title === '查看商品详情'" @click="submitForm('ruleForm')">提交</el-button>
    <el-button type="primary" @click="handleClose">取消</el-button>
  </el-form-item>
</el-form>
</el-dialog>
</template>
<script>
// uploadCity
import { uploadCity } from "@/api/index";
import { addCommodity,GetSaleModeList,GetCommodityTypeListAll } from "@/api/goods.js";
export default {
  name:'editShop',
  props:{
    showAddDialog: {
      type:Boolean,
      default:false
    },
    title:{
      type:String,
      default:''
    },
    content:{
      type:Object,
      default:{}
    }
  },
  data () {
    return {
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
      ruleForm: {
          ID:'',
          StockNum:'',
          SaleModeID:'',
          CommodityTypeID:'',
          FrontImage:'',
          Name: '',
          Price: '',
          LimitNum: '',
          Price: '',
          Description: '',
          AttachmentList: [],
          PurchaseNote: '',
          ReleaseUserName: '',
          AuthorName:'',
          BrandName:'',
          SerialType:'',
          StartDateTime:'',
          EndDateTime:''

        },
        rules: {
           SaleModeID: [
            { required: true, message: '请选择售卖方式', trigger: 'blur' }
          ],
           CommodityTypeID: [
            { required: true, message: '请选择商品类型', trigger: 'blur' }
          ],
          Name: [
            { required: true, message: '请输入商品名称', trigger: 'blur' }
          ],
          Price: [
            { required: true, message: '请输入商品价格', trigger: 'blur' }
          ],
          LimitNum: [
            { required: true, message: '请输入限量', trigger: 'blur' }
          ],
          Price: [
            { required: true, message: '请输入商品价格', trigger: 'blur' }
          ],
          Description: [
            { required: true, message: '请输入描述信息', trigger: 'blur' }
          ],
          PurchaseNote: [
            { required: true, message: '请输入购买须知', trigger: 'blur' }
          ],
           ReleaseUserName: [
            { required: true, message: '请输入发行方名称', trigger: 'blur' }
          ],
           AuthorName: [
            { required: true, message: '请输入创作方姓名', trigger: 'blur' }
          ],
          BrandName: [
            { required: true, message: '请输入品牌方名称', trigger: 'blur' }
          ],
          SerialType: [
            { required: true, message: '请输入系列', trigger: 'blur' }
          ],
          AttachmentList: [
            { required: true, message: '请上传商品图片', trigger: 'blur' }
          ],
          FrontImage:[
            { required: true, message: '请上传封面', trigger: 'blur' }
          ],
          StartDateTime: [
            {  required: true, message: '请选择日期', trigger: 'blur' }
          ],
          EndDateTime: [
            {  required: true, message: '请选择日期', trigger: 'blur' }
          ]
        }
    }
  },
  mounted () {
    this.GetSaleModeList()
    this.GetCommodityTypeListAll()
  },
  methods:{
    GetSaleModeList () {
      GetSaleModeList().then(res=>{
        this.optionsSaleModeID = res.Data
      })
    },
    GetCommodityTypeListAll () {
      GetCommodityTypeListAll().then(res=>{
        this.optionsCommodityTypeID = res.Data
      })
    },
    teststart (v) {
      this.ruleForm.StartDateTime = v
    },
    testend (v) {
      this.ruleForm.EndDateTime = v
    },
    ////       图片
    //移除图片功能
    handleRemove(file, fileList) {
       const cueRemoveString = '/'+ file.url.split('//')[2]
      this.ruleForm.AttachmentList.map((val,i)=>{
        if (val === cueRemoveString) {
          this.ruleForm.AttachmentList.splice(i,1)
        }
      })
    },
    //预览图片功能
    handlePictureCardPreview(file) {
      this.dialogVs = true
      this.dialogImageUrls = file.url

    },
    UploadImage(file,filelist) {
      let fd = new FormData()
      fd.append('files', file.raw)
      uploadCity(file.name,fd).then(res=>{

        this.ruleForm.AttachmentList.push(res.Data)

      })

    },
       ////       封面
    //移除图片功能
    handleRemovef(file, fileList) {
    this.FrontImage= []
      this.ruleForm.FrontImage = ''
    },
    //预览图片功能
    handlePictureCardPreviewf(file) {
      this.dialogV = true
      this.dialogImageUrl = file.url

    },
    UploadImagef(file,filelist) {
      let fd = new FormData()
      fd.append('files', file.raw)
      uploadCity(file.name,fd).then(res=>{
        this.ruleForm.FrontImage = res.Data
      })

    },
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            addCommodity(this.ruleForm).then(res=>{
              this.dialogVisible = false
               this.$emit('close')

            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      handleClose () {
        // this.$refs['ruleForm'].resetFields()
         this.FrontImage = []
          this.AttachmentList = []
          for (let i in  this.ruleForm) {
            if (i !== 'AttachmentList') {
              this.ruleForm[i] = ''
              this.ruleForm.AttachmentList = []
            }
          }
        this.dialogVisible = false
        this.$emit('closes')
      }
  },
  watch :{
    showAddDialog (val) {
      if (val) {
        if (this.title === '编辑' || this.title === '查看商品详情') {
          this.ruleForm = {...this.content}
          this.AttachmentList = []
          if (this.content.FrontImage !=='') {
            this.FrontImage = [{url:''}]
             this.FrontImage[0].url = `${BASE.API_DEV.manager}${this.content.FrontImage}`
          } else {
            this.FrontImage = []
          }
         const AttachmentList_conversion = this.ruleForm.AttachmentList.map(item=>{
           let urlImage = {url:`${BASE.API_DEV.manager}${item}`}
           this.AttachmentList.push(urlImage)
         })
          // console
          this.dialogVisible = true
        } else {

          this.FrontImage = []
          this.AttachmentList = []
          for (let i in  this.ruleForm) {
            if (i !== 'AttachmentList') {
              this.ruleForm[i] = ''
              this.ruleForm.AttachmentList = []
            }
          }
          this.dialogVisible = true
        }
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
   /deep/ .el-button--primary.is-disabled, .el-button--primary.is-disabled:active, .el-button--primary.is-disabled:focus, .el-button--primary.is-disabled:hover {
    color: #FFF;
    background-color: red !important;
    border-color: red !important;
}
</style>
