import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from "@/router";
import store from "@/store";
import axios from "axios";
import api from './utils/api'
import 'element-ui/lib/theme-chalk/index.css';
import 'babel-polyfill'
import {Button, Container, Header, Aside, Main, Footer,Menu,Submenu,MenuItem,Tag,Input,Select,Option,DatePicker,Link,Table,TableColumn,Pagination,Form,FormItem,RadioGroup,Radio,Row,Col,Message,MessageBox,Upload} from 'element-ui';
Vue.use(Button)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Footer)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(Tag)
Vue.use(Input)
Vue.use(Option)
Vue.use(Select)
Vue.use(DatePicker)
Vue.use(Link)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Pagination)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(RadioGroup)
Vue.use(Radio)
Vue.use(Row)
Vue.use(Col)
Vue.use(Upload)

Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$message = Message;
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.api = api

// axios.defaults.baseURL = '/api'

Vue.use(router)

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: function (h) { return h(App) },
}).$mount('#app')
