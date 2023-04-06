import { createApp } from 'vue'
import App from './App.vue'

import router from '@/router/index'
import { createPinia } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persist'
import '@/utils/rem'

// 通用样式
import '@/assets/style/index.css'

// 字体
import '@/assets/style/font.css'

const pinia = createPinia()
pinia.use(piniaPluginPersist) // pinia持久化插件

const app = createApp(App)
app.use(router).use(pinia).mount('#app')
