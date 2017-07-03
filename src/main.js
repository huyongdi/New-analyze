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

axios.defaults.baseURL = 'https://analyze.grandbox.site/';
axios.defaults.headers = {'Authorization': localStorage.token};

Vue.prototype.dbUrl = 'https://biomeddb.grandbox.site/';
Vue.prototype.dbHtml = 'https://www.grandbox.site/biomeddb/';
Vue.prototype.anaHtml = 'https://www.grandbox.site/analyze/';
Vue.prototype.manHtml = 'https://www.grandbox.site/manage/';

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
        localStorage.token = '';
        this.$router.push({path: '/login' + this.$route.path})
      }
    }
  } else {
    alert(error.message);
  }
};

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
});

