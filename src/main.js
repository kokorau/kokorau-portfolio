// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import firebase from 'firebase'
import App from './App'
import router from './router'

Vue.config.productionTip = false

firebase.initializeApp({
  apiKey: 'AIzaSyAcWCEFr0_gjA2V9g5qx_nbXllZ_ySshTE',
  authDomain: 'heartland2-3a83d.firebaseapp.com',
  databaseURL: 'https://heartland2-3a83d.firebaseio.com',
  projectId: 'heartland2-3a83d',
  storageBucket: 'heartland2-3a83d.appspot.com',
  messagingSenderId: '470022895909'
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
