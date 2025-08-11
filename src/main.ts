import { createApp } from 'vue'
import { createPinia } from 'pinia'

// General Fonts
import 'vfonts/Lato.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
