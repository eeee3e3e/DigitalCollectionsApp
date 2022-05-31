import { getCurrentPermissionList } from "@/api/index";
import lazyLoading from "./lazyLoading.js";

import Cookies from "js-cookie";

let util = {};

util.title = function(title) {
  title =  "城市数藏";
  window.document.title = title;
};
// 判断元素是否存在于数组中
util.oneOf = function(ele, targetArr) {
  if (targetArr.indexOf(ele) >= 0) {
    return true;
  } else {
    return false;
  }
};
// 打开新的页面
util.openNewPage = function(vm, name, argu, query) {
  if (!vm.$store) {
    return;
  }
  let pageOpenedList = vm.$store.state.app.pageOpenedList;
  let openedPageLen = pageOpenedList.length;
  let i = 0;
  let tagHasOpened = false;
  while (i < openedPageLen) {
    if (name == pageOpenedList[i].name) {
      // 页面已经打开
      vm.$store.commit("pageOpenedList", {
        index: i,
        argu: argu,
        query: query
      });
      tagHasOpened = true;
      break;
    }
    i++;
  }
  if (!tagHasOpened) {
    let tag = vm.$store.state.app.tagsList.filter(item => {
      if (item.children) {
        return name == item.children[0].name;
      } else {
        return name == item.name;
      }
    });
    tag = tag[0];
    if (tag) {
      tag = tag.children ? tag.children[0] : tag;
      if (argu) {
        tag.argu = argu;
      }
      if (query) {
        tag.query = query;
      }
      vm.$store.commit("increateTag", tag);
    }
  }
};

util.toDefaultPage = function(routers, name, route, next) {
  let len = routers.length;
  let i = 0;
  let notHandle = true;
  while (i < len) {
    if (
      routers[i].name == name &&
      routers[i].children &&
      routers[i].redirect == undefined
    ) {
      route.replace({
        name: routers[i].children[0].name
      });
      notHandle = false;
      next();
      break;
    }
    i++;
  }
  if (notHandle) {
    next();
  }
};

util.initRouter = function(vm) {
  // 初始化路由
  const constRoutes = [];
  const otherRoutes = [];

  // 404路由需要和动态路由一起加载
  const otherRouter = [
    {
      path: "/*",
      name: "error-404",
      meta: {
        title: "404-页面不存在"
      },
      frontRoute: "error-page/404"
    }
  ];
  // 判断用户是否登录
  // let userInfo = '超级管理员';
  // if (!userInfo) {
  //   // 未登录
  //   return;
  // }
  if (!vm.$store.state.app.added) {
    // 第一次加载 读取数据
    // 加载菜单
    // getCurrentPermissionList().then(res => {
      // if (!res.success) return false;
      // let menuData = res.result;
      // 当前mock菜单数据
      const menuDataMock = [
        {
          children:[{
            children:[{
              children: [],
              frontRoute: "goods/goods-info/index",
              id: "1367045529720061952",
              name: "managerGoods",
              parentId: "1367044376391319552",
              path: "managerGoods",
              title: "平台商品",
            },
            {
              children: [],
              createBy: "admin",
              createTime: "2022-04-19 15:39:21",
              deleteFlag: false,
              frontRoute: "exchange/single-code/index",
              id: "1516320530296131585",
              level: 2,
              name: "exchange",
              parentId: "1367044376391319552",
              path: "/exchange",
              permission: "",
              sortOrder: 3,
              title: "单码兑换",
            },{
              children: [],
              createBy: "admin",
              createTime: "2022-04-21 15:57:46",
              deleteFlag: false,
              frontRoute: "exchange/double-code/index",
              id: "1517049941312073729",
              level: 2,
              name: "/exchange/double",
              parentId: "1367044376391319552",
              path: "/exchange/double",
              permission: "",
              sortOrder: 4,
              title: "多码兑换",
              updateBy: "admin",
              updateTime: "2022-04-21 19:11:06"
            }],
            frontRoute: "Main",
            id: "1367044376391319552",
            name: "goodsManager",
            parentId: "1367039950368800768",
            path: "/",
            title: "商品管理"
          },{
            frontRoute: "Main",
            id: "1117044376391319552",
            name: "",
            parentId: "10",
            path: "/",
            title: "关联管理",
            children:[
              {
                frontRoute: "goods/goods-brand/index",
            id: "1114344376391319552",
            name: "goods-brand",
            parentId: "1117044376391319552",
            path: "/goods-brand",
            title: "Banner",
              }
            ]
          }],
          frontRoute: "null",
          id: "1367039950368800768",
          level: 0,
          name: "goods",
          parentId: "0",
          path: "null",
          sortOrder: 1,
          title: "商品"},
          {
          frontRoute: "null",
          level: 0,
          id: "1367039950367700768",
          name: "cash-management",
          parentId: "1",
          path: "null",
          title: "兑换",
          children:[{
            children: [{
              children: [],
              frontRoute: "management/cash",
              id: "1367045529331161952",
              name: "cash-management",
              level: 2,
              parentId: "13670455297211619552",
              path: 'cash-management',
              title: "兑换管理",
            }],
            frontRoute: 'Main',
            id: "13670455297211619552",
            name: "cash-management",
            level: 1,
            parentId: "1367039950367700768",
            path: '/',
            title: "兑换管理功能",
          }]
          },
          {
            frontRoute: "null",
            level: 0,
            id: "1367039950367700777",
            name: "examples-details",
            parentId: "1",
            path: "null",
            title: "转赠",
            children:[{
              children: [{
                children: [],
                frontRoute: "examples-details/index",
                id: "1367045529331161952",
                name: "examples-details",
                level: 2,
                parentId: "13670455297211619662",
                path: 'examples-details',
                title: "转赠列表",
              }],
              frontRoute: 'Main',
              id: "13670455297211619662",
              name: "examples-details",
              level: 1,
              parentId: "1367039950367700777",
              path: '/',
              title: "商品流转记录",
            }]
            },
            {
              frontRoute: "null",
              level: 0,
              id: "1367039950367700766",
              name: "user-management",
              parentId: "1",
              path: "null",
              title: "用户",
              children:[{
                children: [{
                  children: [],
                  frontRoute: "user-management/index",
                  id: "1367045529331161112",
                  name: "user-management",
                  level: 2,
                  parentId: "13670455297211619112",
                  path: 'user-management',
                  title: "用户列表",
                }],
                frontRoute: 'Main',
                id: "13670455297211619112",
                name: "user-management",
                level: 1,
                parentId: "1367039950367700766",
                path: '/',
                title: "用户管理改造",
              }]
              }
      ]
      let menuData = menuDataMock;
      console.log('menuData',menuData)
      // 格式化数据，设置 空children 为 null
      for (let i = 0; i < menuData.length; i++) {
        let t = menuData[i].children;
        for (let k = 0; k < t.length; k++) {
          let tt = t[k].children;
          for (let z = 0; z < tt.length; z++) {
            tt[z].children = null;
            // 给所有三级路由添加字段，显示一级菜单name，方便点击页签时的选中筛选
            tt[z].firstRouterName = menuData[i].name;
          }
        }
      }

      if (!menuData) {
        return;
      }
      util.initAllMenuData(constRoutes, menuData);
      util.initRouterNode(otherRoutes, otherRouter);
      // 添加所有主界面路由
      vm.$store.commit(
        "updateAppRouter",
        constRoutes.filter(item => item.children.length > 0)
      );
      // 添加全局路由
      vm.$store.commit("updateDefaultRouter", otherRoutes);
      // 添加菜单路由
      util.initMenuData(vm, menuData);
      // 缓存数据 修改加载标识
      window.localStorage.setItem("menuData", JSON.stringify(menuData));
      vm.$store.commit("setAdded", true);
    // });
  } else {
    // 读取缓存数据
    let data = window.localStorage.getItem("menuData");
    if (!data) {
      vm.$store.commit("setAdded", false);
      return;
    }
    let menuData = JSON.parse(data);
    // 添加菜单路由
    util.initMenuData(vm, menuData);
  }
};

// 添加所有顶部导航栏下的菜单路由
util.initAllMenuData = function(constRoutes, data) {
  let allMenuData = [];
  data.forEach(e => {
    if (e.level == 0) {
      e.children.forEach(item => {
        allMenuData.push(item);
      });
    }
  });
  util.initRouterNode(constRoutes, allMenuData);
};

// 生成菜单格式数据
util.initMenuData = function(vm, data) {
  const menuRoutes = [];
  let menuData = data;
  // 顶部菜单
  let navList = [];
  menuData.forEach(e => {
    let nav = {
      name: e.name,
      title: e.title
    };
    navList.push(nav);
  });
  if (navList.length < 1) {
    return;
  }
  // 存入vuex
  vm.$store.commit("setNavList", navList);
  let currNav = window.localStorage.getItem("currNav");
  if (currNav) {
    // 读取缓存title
    for (var item of navList) {
      if (item.name == currNav) {
        vm.$store.commit("setCurrNavTitle", item.title);
        break;
      }
    }
  } else {
    // 默认第一个
    currNav = navList[0].name;
    vm.$store.commit("setCurrNavTitle", navList[0].title);
  }
  vm.$store.commit("setCurrNav", currNav);
  for (let item of menuData) {
    if (item.name == currNav) {
      // 过滤
      menuData = item.children;
      break;
    }
  }
  util.initRouterNode(menuRoutes, menuData);
  // 刷新界面菜单
  vm.$store.commit(
    "updateMenulist",
    menuRoutes.filter(item => item.children.length > 0)
  );

  let tagsList = [];
  vm.$store.state.app.routers.map(item => {
    if (item.children.length <= 1) {
      tagsList.push(item.children[0]);
    } else {
      tagsList.push(...item.children);
    }
  });
  vm.$store.commit("setTagsList", tagsList);
};

// 生成路由节点
util.initRouterNode = function(routers, data) {
  // data为所有子菜单数据
  for (let item of data) {
    let menu = Object.assign({}, item);

    menu.component = lazyLoading(menu.frontRoute);

    if (item.children && item.children.length > 0) {
      menu.children = [];
      util.initRouterNode(menu.children, item.children);
    }

    let meta = {};
    // 给页面添加标题、父级菜单name（方便左侧菜单选中）
    meta.title = menu.title ? menu.title + " - 运营后台" : null;
    meta.firstRouterName = item.firstRouterName;
    menu.meta = meta;

    routers.push(menu);
  }
};

export default util;
