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
    <el-input  :disabled="this.title === '查看商品详情' || this.title === '编辑' " v-model="ruleForm.LimitNum"></el-input>
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

  <el-form-item label="报名开始时间" prop="SignUpStartTime">
    <Date-picker  :disabled="this.title === '查看商品详情'" type="datetime" format="yyyy-MM-dd HH:mm:ss" @on-change="signUpStart" :value="ruleForm.SignUpStartTime"  placeholder="选择日期和时间" style="width: 200px"></Date-picker>
  </el-form-item>
  <el-form-item label="报名结束时间" prop="SignUpEndTime">
     <Date-picker  :disabled="this.title === '查看商品详情'" type="datetime" format="yyyy-MM-dd HH:mm:ss" @on-change="signUpEnd" :value="ruleForm.SignUpEndTime" placeholder="选择日期和时间" style="width: 200px"></Date-picker>
  </el-form-item>

  <el-form-item label="售卖开始时间" prop="StartDateTime">
    <Date-picker  :disabled="this.title === '查看商品详情'" type="datetime" format="yyyy-MM-dd HH:mm:ss" @on-change="teststart" :value="ruleForm.StartDateTime"  placeholder="选择日期和时间" style="width: 200px"></Date-picker>
  </el-form-item>
  <el-form-item label="售卖结束时间" prop="EndDateTime">
     <Date-picker  :disabled="this.title === '查看商品详情'" type="datetime" format="yyyy-MM-dd HH:mm:ss" @on-change="testend" :value="ruleForm.EndDateTime" placeholder="选择日期和时间" style="width: 200px"></Date-picker>
  </el-form-item>
  <el-form-item label="活动开始时间" prop="ActivityStartTime">
     <Date-picker  :disabled="this.title === '查看商品详情'" type="datetime" format="yyyy-MM-dd HH:mm:ss" @on-change="activityTime" :value="ruleForm.ActivityStartTime" placeholder="选择活动开始时间" style="width: 200px"></Date-picker>
  </el-form-item>

   <el-form-item label="冷却周期(小时)" prop="CirculationCoolingPeriod">
    <el-input  :disabled="this.title === '查看商品详情'" v-model="ruleForm.CirculationCoolingPeriod"></el-input>
  </el-form-item>
  <el-form-item label="封面" >
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
  <div style="color:red;padding-bottom:10px;">*注(单个藏品中的【商品图片、 商品文件】只允许二选一,否则将出错 )</div>
  <!-- <div style="color:red;padding-bottom:10px;"></div> -->
   <el-form-item label="商品图片" >
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
            :limit="1"
        >
          <i class="el-icon-plus"></i>
          <template #tip>
            <div style="font-size: 12px;color: #919191;">
              单次限制上传一张图片且封面只能上传一张
            </div>
          </template>
        </el-upload>
      <el-dialog :visible.sync="dialogVs" append-to-body>
        <img width="100%" :src="dialogImageUrls" alt="">
      </el-dialog>
  </el-form-item>
  <el-form-item label="商品文件" prop="">
          <el-upload
                ref="upload"
                action=""
                :on-change="UploadFile"
                :on-remove="Removelist"
                :auto-upload="false"
                :file-list="glbList"
                :limit="1"
                >
                <el-button size="small" type="primary">点击上传</el-button>
                <span style="pading-left:5px;">&nbsp;&nbsp;*上传后立即生效</span>
                </el-upload>
  </el-form-item>
    <!-- <el-form-item label="发行方图片" prop="fhfList">
          <el-upload
           :disabled="this.title === '查看商品详情'"
            ref="uploadfhf"
            action=""
            list-type="picture-card"
            :on-preview="handlePictureCardPreviewfhf"
            :on-remove="handleRemovefhf"
            :on-change="UploadImagefhf"
            :file-list="fhfList"
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
      <el-dialog :visible.sync="dialogVsfhf" append-to-body>
        <img width="100%" :src="dialogImageUrlsfhf" alt="">
      </el-dialog>
  </el-form-item> -->
  <el-form-item label="描述信息" prop="Description">
  <div class="quill-editor">
    <!-- 图片上传组件辅助，组件内添加v-show=“false”属性，把该组件隐藏起来。-->
    <el-upload v-show="false" class="avatar-uploaders" action name="img" :show-file-list="false" :before-upload="editor_change">
    </el-upload>
    <!--富文本编辑器组件-->
    <quill-editor v-model="ruleForm.Description" :disabled="this.title === '查看商品详情'"   :options="editorOption"  ref="QuillEditor"></quill-editor>
  </div>
  </el-form-item>
  <el-form-item style="text-align:center;">
    <el-button v-if="this.title !== '查看商品详情'" type="primary"   @click="submitForm('ruleForm')">提交</el-button>
    <el-button type="primary" @click="handleClose">取消</el-button>
  </el-form-item>
</el-form>
</el-dialog>
</template>
<script>
    import $ from 'jquery'
// uploadCity
import { quillEditor } from 'vue-quill-editor'
import quill from 'quill'
import { Quill} from 'vue-quill-editor'
  import {container, ImageExtend, QuillWatch} from 'quill-image-extend-module'

  Quill.register('modules/ImageExtend', ImageExtend)
import { uploadCity } from "@/api/index";
import { addCommodity,GetSaleModeList,GetCommodityTypeListAll } from "@/api/goods.js";
export default {
  name:'editShop',
  components: {
    quillEditor
  },
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
      glbList:[],
       videoFlag: false,
      //是否显示进度条
      videoUploadPercent: "",
      //进度条的进度，
      isShowUploadVideo: false,
      //显示上传按钮
      videoForm: {
        showVideoPath: "",  //回显的变量
      },
      url:'',
      Linkurl:'',
      editorOption:{
        placeholder: '请在这里输入',
        modules:{
            toolbar:{
              container:[
              ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
               ['blockquote', 'code-block'],
               ['image']
            ],
            history: {
            delay: 1000,
            maxStack: 50,
            userOnly: false
          },
            handlers: {
              'image': function (value) {
                if (value) {
                  console.log('value',value)
                  // 调用element的图片上传组件
                  document.querySelector('.avatar-uploaders input').click()
                } else {
                  this.quill.format('image', false)
                }
              }
            },
            }
        }
    },
      optionsCommodityTypeID:[],
      optionsSaleModeID:[],
      AttachmentList:[],
      fhfList:[],
          FrontImage:[{url:''}],
      fileLists:[],
      disabled:false,
      dialogV:false,
      dialogImageUrl:'',
      dialogVs:false,
      dialogImageUrls:'',
      dialogImageUrlsfhf:'',
      dialogVsfhf:false,
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
          fhfList:[],
          PurchaseNote: '',
          ReleaseUserName: '',
          AuthorName:'',
          BrandName:'',
          SerialType:'',
          StartDateTime:'',
          EndDateTime:'',
          CirculationCoolingPeriod:undefined,

          SignUpStartTime: '',
          SignUpEndTime: '',
          ActivityStartTime: ''
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
          CirculationCoolingPeriod: [
            { required: true, message: '请输入冷却周期，单位小时', trigger: 'blur' }
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
          ],
          ActivityStartTime: [
            {  required: true, message: '请选择活动开始时间', trigger: 'blur' }
          ]
          // 报名字段非必填。报名日期有值时，H5端即为 报名抽签 藏品
          // SignUpStartTime: [
          //   {  required: true, message: '请报名开始日期', trigger: 'blur' }
          // ],
          // SignUpEndTime: [
          //   {  required: true, message: '请选报名结束择日期', trigger: 'blur' }
          // ]
        }
    }
  },
  mounted () {
    this.GetSaleModeList()
    this.GetCommodityTypeListAll()
    this.Linkurl = BASE.API_DEV.managerImage
  },
  computed: {
	       editor() {
	            return this.$refs.myQuillEditor.quill;
	        },
	    },
  methods:{
    // 上传glb文件
    UploadFile(file,filelist) {
      let fd = new FormData()
      fd.append('files', file.raw)
      uploadCity(file.name,fd).then(res=>{
        console.log(res)
        this.ruleForm.AttachmentList.push(res.Data)
      }).catch(res=>{
        this.ruleForm.AttachmentList = []
      })

    },
    Removelist () {

    },
    beforeUploadVideo(file) {
      console.log(file)
      var fileSize = file.size / 1024 / 1024 < 50;   //控制大小  修改50的值即可
      if (!fileSize) {
        this.$message.error("视频大小不能超过50MB");
        return false;
      } else {
        let fd = new FormData()
      fd.append('files', file)
      uploadCity(file.name,fd).then(res=>{
        console.log(res)
        this.ruleForm.AttachmentList.push(res.Data)
        this.videoForm.showVideoPath = `${BASE.API_DEV.managerImage}${res.Data}`
      })
      }
      this.isShowUploadVideo = false;
    },
    //进度条
    uploadVideoProcess(event, file, fileList) {    //注意在data中添加对应的变量名
      this.videoFlag = true;
      this.videoUploadPercent = file.percentage.toFixed(0) * 1;
    },
    //上传成功回调
    handleVideoSuccess(file, fileList) {
      this.isShowUploadVideo = true;
      this.videoFlag = false;
      this.videoUploadPercent = 0;

    },
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
    signUpStart(v) {
      this.ruleForm.SignUpStartTime = v
    },
    signUpEnd(v) {
      this.ruleForm.SignUpEndTime = v
    },
    teststart (v) {
      this.ruleForm.StartDateTime = v
    },
    testend (v) {
      this.ruleForm.EndDateTime = v
    },
    activityTime(v) {
      this.ruleForm.ActivityStartTime = v
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
    handleVideo () {
          this.ruleForm.AttachmentList = []
          this.videoForm.showVideoPath = ''
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
    // 发行方预览图片功能
    handlePictureCardPreviewfhf(file) {
      this.dialogVsfhf = true
      this.dialogImageUrlsfhf = file.url

    },
      //发行方移除图片功能
    handleRemovefhf(file, fileList) {
      this.fhfList= []
      this.ruleForm.fhfList = ''
    },
    UploadImagefhf(file,filelist) {
      let fd = new FormData()
      fd.append('files', file.raw)
      uploadCity(file.name,fd).then(res=>{

        this.ruleForm.fhfList.push(res.Data)

      })

    },
    // 富文本上传图片
    editor_change (file) {
        let fd = new FormData()
      fd.append('files', file)
      uploadCity(file.name,fd).then(res=>{
          const url = res.Data
          let quill = this.$refs.QuillEditor.quill
      // 如果上传成功
      if (url) {
        let length = quill.getSelection().index;
        // 插入图片，res为服务器返回的图片链接地址
        quill.insertEmbed(length, 'image', `${this.Linkurl}${url}`)
        // 调整光标到最后
        quill.setSelection(length + 1)
      } else {
        // 提示信息，需引入Message
        this.$message.error('图片插入失败！')
      }
      })
    },
    // 失去焦点
    onEditorBlur (editor) { },
    // 获得焦点
    onEditorFocus (editor) { },
    // 开始
    onEditorReady (editor) { },
    // 值发生变化
    onEditorChange (editor) {
      this.ruleForm.Description = editor.html
    },
    beforeUpload (file) { },
    uploadSuccess (res) {
      // 获取富文本组件实例

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
      console.log(1111)
        this.$refs[formName].validate((valid) => {
          if (valid) {
            addCommodity(this.ruleForm).then(res=>{
              this.dialogVisible = false
               this.$emit('close')
               this.glbList= []

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
          this.fhfList= []
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
             this.FrontImage[0].url = `${BASE.API_DEV.managerImage}${this.content.FrontImage}`
          } else {
            this.FrontImage = []
          }
          if (this.content.FrontImage !=='') {
            this.fhfList = [{url:''}]
             this.fhfList[0].url = `${BASE.API_DEV.managerImage}${this.content.FrontImage}`
          } else {
            this.fhfList = []
          }
          if (this.content.Description !=='') {
            console.log('this.content.Description',this.content.Description)
            //  this.ruleForm.Description = `${BASE.API_DEV.manager}${this.content.Description}`
          } else {
            this.FrontImage = []
          }
          this.ruleForm.AttachmentList.map(item=>{
           let urlImage = {url:`${BASE.API_DEV.managerImage}${item}`}
           if (item.split('.')[item.split('.').length-1] === 'glb') {
            this.glbList =[{name:'GLB文件',url:''}],
              this.glbList[0].url = `${BASE.API_DEV.managerImage}${item}`
           } else {
              this.AttachmentList.push(urlImage)
           }

         })

          // console
          this.dialogVisible = true
        } else {
          this.glbList= []
          this.FrontImage = []
          this.AttachmentList = []
          this.fhfList = []
          this.videoForm.showVideoPath = ''
          for (let i in  this.ruleForm) {
            if (i !== 'AttachmentList') {
              this.ruleForm[i] = ''
              this.ruleForm.AttachmentList = []
              this.fhfList = []
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
.avatar-uploader-icon {
  border: 1px dashed #d9d9d9 !important;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9 !important;
  border-radius: 6px !important;
  position: relative !important;
  overflow: hidden !important;
}
.avatar-uploader .el-upload:hover {
  border: 1px dashed #d9d9d9 !important;
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 300px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 300px;
  height: 178px;
  display: block;
}
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
