<template>
  <div class="login">
    <Row @keydown.enter.native="submitLogin" class="flex">
      <Col style="width: 368px">
      <Header />
      <Row style="flex-direction: column;">

        <Form ref="usernameLoginForm" :model="form" :rules="rules" class="form">
          <FormItem prop="username">
            <Input v-model="form.username" prefix="ios-contact" size="large" clearable placeholder="请输入用户名" autocomplete="off" />
          </FormItem>
          <FormItem prop="password">
            <Input type="password" v-model="form.password" prefix="ios-lock" size="large" password placeholder="请输入密码" autocomplete="off" />
          </FormItem>
        </Form>

        <Row>
          <Button class="login-btn" type="primary" size="large" :loading="loading" @click="submitLogin" long>
            <span v-if="!loading">{{ $t("login") }}</span>
            <span v-else>{{ $t("logining") }}</span>
          </Button>
        </Row>
      </Row>
      <!-- 拼图验证码 -->
      <!-- <verify ref="verify" class="verify-con" verifyType="LOGIN" @change="verifyChange"></verify> -->
      <Footer />
      </Col>
      <!-- <LangSwitch /> -->
    </Row>
  </div>
</template>

<script>
import { login, userInfo } from "@/api/index";
import Cookies from "js-cookie";
import Header from "@/views/main-components/header";
import Footer from "@/views/main-components/footer";
import LangSwitch from "@/views/main-components/lang-switch";
import util from "@/libs/util.js";
import verify from "@/views/my-components/verify";

export default {
  components: {
    LangSwitch,
    Header,
    Footers:Footer,
    verify
  },
  data() {
    return {
      userId:'',
      loading: false, // 加载状态
      loginStatus:'',
      form: {
        // 表单数据
        username: "",
        password: "",
        mobile: "",
        code: "",
      },
      rules: {
        // 验证规则
        username: [
          {
            required: true,
            message: "账号不能为空",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    afterLogin(userId) {
      // 登录成功后处理
      // 获取用户信息
      userInfo(userId).then((res) => {
        console.log('用户信息',res)
        if (res.Data) {
          // 加载菜单
          Cookies.set("userInfoManager", JSON.stringify(res.Data));
          // this.$store.commit("setAvatarPath", res.result.avatar);
          // util.initRouter(this);
          this.$router.push({
            name: "home_index",
          });
        } else {
          this.loading = false;
        }
      });
    },
    submitLogin() {
      // 登录操作
      this.$refs.usernameLoginForm.validate((valid) => {
        if (valid) {
          this.verifyChange()
        }
      });
    },
    verifyChange(con) {
      this.loading = true
      const paraams={
            LoginName:this.form.username,
            Password:this.md5(this.form.password)
          }
          login(paraams).then(res=>{
            if (res.ReturnCode === '200') {
              this.$message({
                type:'success',
                message:'登录成功'
              })
              const {Ticket,ID} = res.Data
            this.userId = ID
            let accessToken = Ticket
            this.setStore("accessToken", accessToken);
          this.afterLogin(this.userId)
            } else {
              this.loading = false
              this.$message({
                type:'error',
                message:'请输入正确的账号密码'
              })
              return false
            }
          })
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  height: 100%;
  background: url("../assets/background.png") no-repeat;
  background-color: #f0f2f5;
  display: flex;
  background-size: cover;
  align-items: center;
  justify-content: center;


  .verify-con {
    position: absolute;
    top: 150px;
    z-index: 10;
    left: 20px;
  }
  .form {
    padding-top: 1vh;

  }

  .login-btn {
    background: linear-gradient(135deg, $theme_color 0%, $warning_color 100%);
    height: 40px;
    cursor: pointer;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    color: #fff;
    width: 100%;
    text-align: center;
    transition: 0.35s;
  }
  .login-btn:hover {
    opacity: .9;
    border-radius: 10px;
  }

}
.flex {
  justify-content: center;
}
</style>
