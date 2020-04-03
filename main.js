import Vue from 'vue'
import App from './App'
import VueI18n from 'vue-i18n'
import messages from './common/i18n/language.js';
import mixin from './common/mixins/mixins.js';
Vue.use(VueI18n) 
Vue.mixin(mixin)

Vue.config.productionTip = false;


const i18n = new VueI18n({  
  locale: 'zh-cn',  
  messages
})  

Vue.prototype._i18n = i18n  

import kpi from "./common/http/httpApi.js"; //请求接口kpi
Vue.prototype.$KPI = kpi; 
import request from "./common/http/httpRequest.js"; //请求方式
Vue.prototype.$request = request;
import catchs from "./common/http/cache.js"; //缓存
Vue.prototype.$catchs = catchs;

App.mpType = 'app'

const app = new Vue({
     i18n, 
    ...App
})
app.$mount()
