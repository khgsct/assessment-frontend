import './assets/style.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { authentication } from '@/auth'

const app = createApp(App)

app.use(router)

app.use(authentication)

app.mount('#app')
