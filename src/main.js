// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ViewUI from 'view-design'
// import 'view-design/dist/styles/iview.css'
import './styles/theme.less';
import tablePage from '@/views/components/tablePage/index.vue'
import MTable from '@/views/components/MTable/index.vue'
import pagination from '@/views/components/Pagination/index.vue'
import "core-js/stable"
// import "regenerator-runtime/runtime"
import App from './App'
import { router } from './router/index'
import store from './store'
import i18n from '@/locale'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import { getRequest, postRequest, putRequest, deleteRequest, importRequest, uploadFileRequest } from '@/libs/axios'
import { setStore, getStore, removeStore } from '@/libs/storage'
import util from '@/libs/util'

import * as filters from '@/utils/filters' // global filter
import {md5} from '@/utils/md5.js';
Vue.config.devtools = true;
Vue.config.productionTip = false
const PC_URL = BASE.PC_URL; // 跳转买家端地址 pc端
const WAP_URL = BASE.WAP_URL; // 跳转买家端地址 wap端
Vue.use(ElementUI)
Vue.component('tablePage',tablePage)
Vue.component('MTable',MTable)
Vue.component('pagination',pagination)
Vue.use(ViewUI, {
    i18n: (key, value) => i18n.t(key, value)
});





// 挂载全局使用的方法
Vue.prototype.getRequest = getRequest;
Vue.prototype.postRequest = postRequest;
Vue.prototype.putRequest = putRequest;
Vue.prototype.deleteRequest = deleteRequest;
Vue.prototype.importRequest = importRequest;
Vue.prototype.uploadFileRequest = uploadFileRequest;
Vue.prototype.setStore = setStore;
Vue.prototype.getStore = getStore;
Vue.prototype.removeStore = removeStore;
Vue.prototype.md5 = md5;

Array.prototype.remove = function(from, to) {
    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
};

Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    i18n,
    render: h => h(App),
    data: {
        currentPageName: ''
    },
    mounted() {
        // 初始化菜单
        util.initRouter(this);
        this.currentPageName = this.$route.name;
        // 显示打开的页面的列表
        this.$store.commit('setOpenedList');
        this.$store.commit('initCachePage');
    }
})
