import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import Request from './utils/Request'
import message from './utils/Message'
import '@/assets/icon/iconfont.css'
import Table from '@/components/Table.vue'
import Cover from '@/components/Cover.vue'
import Dialog from '@/components/Dialog.vue'
import CoverUpload from '@/components/CoverUpload.vue'

const app = createApp(App)
app.use(router)
app.use(ElementPlus)
app.component('Table', Table)
app.component('Cover', Cover)
app.component('Dialog', Dialog)
app.component('CoverUpload', CoverUpload)
app.config.globalProperties.Request = Request
app.config.globalProperties.message = message
app.config.globalProperties.globalInfo = {
  imageUrl: '/api/file/getImage/'
}
app.mount('#app')
