import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ToastPlugin from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-bootstrap.css'
import 'vue-toast-notification/dist/theme-sugar.css'

import './assets/main.css'

const app = createApp(App)

// this.$toast.error(message)
// this.$toast.warning(message)
// this.$toast.info(message)
// this.$toast.default(message)

app.use(router)
app.use(ToastPlugin, {
  position: 'top-right'
})

app.mount('#app')
