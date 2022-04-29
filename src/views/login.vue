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
    Footer,
    verify
  },
  data() {
    return {
      loading: false, // 加载状态
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
    afterLogin(res) {
      // 登录成功后处理
      let accessToken = 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyQ29udGV4dCI6IntcInVzZXJuYW1lXCI6XCJhZG1pblwiLFwibmlja05hbWVcIjpcIui2hee6p-euoeeQhuWRmFwiLFwiZmFjZVwiOlwiaHR0cHM6Ly9saWxpc2hvcC1vc3Mub3NzLWNuLWJlaWppbmcuYWxpeXVuY3MuY29tL2RkZGQ2MGUxZTY5ZjQ1MjdhYzEzZGE1MzM2NWI2YzM4LnBuZ1wiLFwiaWRcIjpcIjEzMzczMDYxMTAyNzc0NzYzNTJcIixcImxvbmdUZXJtXCI6ZmFsc2UsXCJyb2xlXCI6XCJNQU5BR0VSXCIsXCJpc1N1cGVyXCI6dHJ1ZX0iLCJzdWIiOiJhZG1pbiIsImV4cCI6MTY1NDcxNDQyOX0.t5EURld9dxUR4A-9Yv2Z7TIi42UIjchn2OYDumIiELw';
      let refreshToken = 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyQ29udGV4dCI6IntcInVzZXJuYW1lXCI6XCJhZG1pblwiLFwibmlja05hbWVcIjpcIui2hee6p-euoeeQhuWRmFwiLFwiZmFjZVwiOlwiaHR0cHM6Ly9saWxpc2hvcC1vc3Mub3NzLWNuLWJlaWppbmcuYWxpeXVuY3MuY29tL2RkZGQ2MGUxZTY5ZjQ1MjdhYzEzZGE1MzM2NWI2YzM4LnBuZ1wiLFwiaWRcIjpcIjEzMzczMDYxMTAyNzc0NzYzNTJcIixcImxvbmdUZXJtXCI6ZmFsc2UsXCJyb2xlXCI6XCJNQU5BR0VSXCIsXCJpc1N1cGVyXCI6dHJ1ZX0iLCJzdWIiOiJhZG1pbiIsImV4cCI6MTY1NDcxNDQyOX0.t5EURld9dxUR4A-9Yv2Z7TIi42UIjchn2OYDumIiELw';
      this.setStore("accessToken", accessToken);
      this.setStore("refreshToken", refreshToken);
      // 获取用户信息
      userInfo().then((res) => {
        if (res.success) {
          // 加载菜单
          Cookies.set("userInfoManager", JSON.stringify(res.result));
          this.$store.commit("setAvatarPath", res.result.avatar);
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
           let accessToken = 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyQ29udGV4dCI6IntcInVzZXJuYW1lXCI6XCJhZG1pblwiLFwibmlja05hbWVcIjpcIui2hee6p-euoeeQhuWRmFwiLFwiZmFjZVwiOlwiaHR0cHM6Ly9saWxpc2hvcC1vc3Mub3NzLWNuLWJlaWppbmcuYWxpeXVuY3MuY29tL2RkZGQ2MGUxZTY5ZjQ1MjdhYzEzZGE1MzM2NWI2YzM4LnBuZ1wiLFwiaWRcIjpcIjEzMzczMDYxMTAyNzc0NzYzNTJcIixcImxvbmdUZXJtXCI6ZmFsc2UsXCJyb2xlXCI6XCJNQU5BR0VSXCIsXCJpc1N1cGVyXCI6dHJ1ZX0iLCJzdWIiOiJhZG1pbiIsImV4cCI6MTY1NDcxNDQyOX0.t5EURld9dxUR4A-9Yv2Z7TIi42UIjchn2OYDumIiELw';
      let refreshToken = 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyQ29udGV4dCI6IntcInVzZXJuYW1lXCI6XCJhZG1pblwiLFwibmlja05hbWVcIjpcIui2hee6p-euoeeQhuWRmFwiLFwiZmFjZVwiOlwiaHR0cHM6Ly9saWxpc2hvcC1vc3Mub3NzLWNuLWJlaWppbmcuYWxpeXVuY3MuY29tL2RkZGQ2MGUxZTY5ZjQ1MjdhYzEzZGE1MzM2NWI2YzM4LnBuZ1wiLFwiaWRcIjpcIjEzMzczMDYxMTAyNzc0NzYzNTJcIixcImxvbmdUZXJtXCI6ZmFsc2UsXCJyb2xlXCI6XCJNQU5BR0VSXCIsXCJpc1N1cGVyXCI6dHJ1ZX0iLCJzdWIiOiJhZG1pbiIsImV4cCI6MTY1NDcxNDQyOX0.t5EURld9dxUR4A-9Yv2Z7TIi42UIjchn2OYDumIiELw';
      this.setStore("accessToken", accessToken);
      this.setStore("refreshToken", refreshToken);
      Cookies.set("userInfoManager", JSON.stringify(1234567));
          // this.$refs.verify.init();
          util.initRouter(this);
          this.$router.push({
            name: "home_index"
          })
        }
      });
    },
    verifyChange(con) {
      // 拼图验证码回显
      if (!con.status) return;

      this.loading = true;

      let fd = new FormData();
      fd.append('username',this.form.username)
      fd.append('password',this.md5(this.form.password))
      login(fd)
        .then((res) => {
          if (res && res.success) {
            this.afterLogin(res);
          } else {
            this.loading = false;
          }
        })
        .catch(() => {
          this.loading = false;
        });
      this.$refs.verify.show = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  height: 100%;
  // background: url("../assets/background.png") no-repeat;
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
