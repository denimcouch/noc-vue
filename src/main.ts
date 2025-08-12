import { createApp } from 'vue'
import { createPinia } from 'pinia'

// General Fonts
import 'vfonts/Lato.css'

// Naive UI
import { create, NConfigProvider } from 'naive-ui'

import App from '@/App.vue'
import router from '@/router'

const naive = create({
  components: [NConfigProvider],
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(naive)

app.mount('#app')
