import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router';
import iView from 'iview';
import 'iview/dist/styles/iview.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import routes from './router.js';
import store from './vuex/index'


// 这是node.js的command写法
// 两种写法都太高级了，浏览器解析不了，所以会报错
// const $ = require('jquery')

//将css文件导入main里面，但是webpack默认只支持js文件的打包编译，
// 所以我们需要在配置文件中加入loader配置来读取css文件
import '@static/css/index.css'

import popUp from '@/components/popUp/index'
Vue.prototype.$newPopup = popUp;
//崔雄伟
//Vue.prototype.HOST = 'http://10.120.47.59:8080'
//贵亮
//Vue.prototype.HOST = 'http://10.120.46.104:80'
//Vue.prototype.HOST = 'http://10.124.51.184:8080'
//鹏程
//Vue.prototype.HOST = 'http://10.124.48.113:8080'
//Vue.prototype.HOST = 'http://192.168.1.4:8080'

//打包
Vue.prototype.HOST = 'http://127.0.0.1:8888'

import NewTree from '@/components/newTree/tree.vue'
let components = {
    NewTree
}
Object.keys(components).map((key) => {
    Vue.component(components[key].name, components[key]);
});

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(iView);
Vue.use(ElementUI);

const router = new VueRouter({ routes })
router.beforeEach((to, from, next) => {
    if (to.path == '/login') {
        sessionStorage.removeItem('adminname');
    }
    let user = sessionStorage.getItem('adminname');
    // let user = JSON.parse(sessionStorage.getItem('adminname'));
    if (!user && to.path != '/login') {
        next({ path: '/login' })
    } else if (!!user && to.path == '/'){
        next({ path: '/page1' })
    } else {
        next()
    }
})
window.$app = new Vue({
    el: '#app',
    store:store,
    router: router,
    render: h => h(App)
})
window.$store = store;
window.$channel = new Vue();
