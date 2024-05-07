//主路口，这里的引用都是全局引用，可以在每个vue里面使用
import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import elementIcon from "./plugins/icons"
// import axios from 'axios';
import router from './modules/router'
import store from './store/index'


//导入全局包以后记得挂载
const app = createApp(App)
app.use(ElementPlus)
app.use(router)
app.use(store)
app.use(elementIcon)

// app.config.globalProperties.$axios = axios;
app.mount('#app')

