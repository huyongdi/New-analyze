// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import '../node_modules/bootstrap/dist/js/bootstrap.min.js'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/font-awesome/css/font-awesome.min.css'
Vue.prototype.$axios = axios;
Vue.config.productionTip = false;

Vue.prototype.loginAxios = axios.create({
  baseURL: 'https://analyze.grandbox.site/',
});
Vue.prototype.myAxios = axios.create({
  baseURL: 'https://analyze.grandbox.site/',
  headers:{'Authorization': localStorage.token}
});

/*请求地址*/
Vue.prototype.dbUrl = 'https://biomeddb.grandbox.site/';

/*页面地址*/
Vue.prototype.dbHtml = '/biomeddb/';
Vue.prototype.anaHtml = '/analyze/';
Vue.prototype.manHtml = '/manage/';

/*自定义全局函数*/
Vue.prototype.catchFun = function (error) {
  if (error.response) {
    let alertContent = '';
    if (error.response.data.detail) {
      if(typeof error.response.data.detail === 'string'){
        alertContent = error.response.data.detail
      }else{
        const arr =[];
        $.each(error.response.data.detail, function (i, value) {
          arr.push(i+' : '+value)
        });
        alertContent = arr.join(' ; ')
      }
    } else {
      if(typeof error.response.data === 'object'){
        const arr =[];
        $.each(error.response.data, function (i, value) {
          arr.push(i+' : '+value)
        });
        alertContent = arr.join(' ; ')
      }else{
        alertContent = error.response.data
      }
    }
    alert(error.response.status + ' : ' + alertContent);
    if (error.response.status === 401) {
      if (this.$route.name !== 'login') {
        // localStorage.token = '';
        this.$router.push({path: '/login?next=' + this.$route.path})
      }
    }
  } else {
    alert(error.message);
  }
};
Vue.prototype.strToArr = function (str) {
  str = $.trim(str).replace(/，/g,','); //英文逗号替换为中文
  str = str.replace(/<\/?.+?>/g, ","); //回车替换成逗号
  str = str.replace(/[\r\n]/g, ",");//回车替换成逗号
  let arr = str.split(',');
  let arr1 = [];
  $.each(arr,function (i,data) {
    if(data){
      arr1.push(data);
    }
  });
  return arr1
};

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
});

