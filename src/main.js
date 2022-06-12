import Vue from 'vue'
import App from './App.vue'
import { messageFirst, messageSecond } from './module_3_home-messages'
import printMessage from './module_3_home-print'

Vue.config.productionTip = false

new Vue({
  render: (h) => h(App)
}).$mount('#app')

printMessage(messageFirst)
printMessage(messageSecond)
