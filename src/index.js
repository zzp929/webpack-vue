import Vue from 'vue'
import App from './app.vue'

import './assets/styles/base.css'
import './assets/images/1111.jpg'

const root = document.createElement('div')

document.body.appendChild(root)

new Vue({
    render: (h) => h(App)
}).$mount(root)