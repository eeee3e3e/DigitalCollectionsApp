import Main from "@/views/Main.vue";

const config = require('@/config/index')
// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
  path: "/login",
  name: "login",
  meta: {
    title: `登录 - ${config.title}运营后台`
  },
  component: () => import("@/views/login.vue")
};

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
  path: "/",
  name: "otherRouter",
  redirect: "/home",
  component: Main,
  children: [
    {
      path: "home",
      title: '首页',
      name: "home_index",
      component: () => import("@/views/home/home.vue")
    },
    {
      path: "personal-center",
      title: "个人中心",
      name: "personal-center",
      meta: { title: "个人中心" },
      component: () => import("@/views/personal-center/personal-center.vue")
    },
    {
      path: "change-password",
      title: "修改密码",
      name: "change_password",
      component: () => import("@/views/change-password/change-password.vue")
    },
    {
      path: "goods-detail",
      title: "商品详情",
      name: "goods-detail",
      component: () => import("@/views/goods/goods-info/goodsDetail.vue")
    }]
};

export const page404 = {
  path: "/*",
  name: "error-404",
  meta: {
    title: "404-页面不存在"
  },
  component: () => import("@/views/error-page/404.vue")
};

export const page403 = {
  path: "/403",
  meta: {
    title: "403-权限不足"
  },
  name: "error-403",
  component: () => import("@/views/error-page/403.vue")
};

export const page500 = {
  path: "/500",
  meta: {
    title: "500-服务端错误"
  },
  name: "error-500",
  component: () => import("@/views/error-page/500.vue")
};

// 所有上面定义的路由都要写在下面的routers里
console.log(otherRouter)
export const routers = [loginRouter, otherRouter, page500, page403];
