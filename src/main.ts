import { createApp } from 'vue'
import App from './App.vue'
import pinia from './pinia'
import router from './router'
import './style.css'
import 'virtual:uno.css'

const app = createApp(App)
app.use(router).use(pinia).mount('#app')
